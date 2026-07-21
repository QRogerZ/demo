(function () {
  "use strict";

  const STORAGE_KEY = "questflow.gift-subscriptions.v2";
  const DAY = 24 * 60 * 60 * 1000;
  const MAX_GIFT_QUANTITY = 10;
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const nowIso = () => new Date().toISOString();
  const addDays = (date, days) => new Date(new Date(date).getTime() + days * DAY).toISOString();
  const id = (prefix) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;

  const PRICES = {
    monthly: {
      pro: { displayPrice: "$19.99/mo", amountCents: 1999, productId: "questflow_pro_monthly" },
      max: { displayPrice: "$99.99/mo", amountCents: 9999, productId: "questflow_max_monthly" }
    },
    annual: {
      pro: { displayPrice: "$14.00/mo", monthlyEquivalentCents: 1400, productId: "questflow_pro_annual" },
      max: { displayPrice: "$70.00/mo", monthlyEquivalentCents: 7000, productId: "questflow_max_annual" }
    }
  };

  const GIFT_PRODUCTS = {
    day30: {
      key: "day30", label: "30-day card", durationDays: 30,
      prices: { pro: PRICES.monthly.pro.amountCents, max: PRICES.monthly.max.amountCents }
    },
    day365: {
      key: "day365", label: "365-day card", durationDays: 365,
      prices: {
        pro: PRICES.annual.pro.monthlyEquivalentCents * 12,
        max: PRICES.annual.max.monthlyEquivalentCents * 12
      }
    }
  };

  function formatMoney(cents) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(cents / 100);
  }

  function giftProduct(plan, cardType) {
    const product = GIFT_PRODUCTS[cardType];
    if (!product || !product.prices[plan]) throw new Error("Unsupported gift card");
    const unitPriceCents = product.prices[plan];
    return { ...product, plan, unitPriceCents, displayPrice: formatMoney(unitPriceCents) };
  }

  function makeCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = new Uint8Array(12);
    if (window.crypto?.getRandomValues) window.crypto.getRandomValues(bytes);
    else bytes.forEach((_, index) => { bytes[index] = Math.floor(Math.random() * 255); });
    const raw = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
    return raw.match(/.{1,4}/g).join("-");
  }

  function normalizeCode(value) {
    return String(value || "").toUpperCase().replace(/[\s-]+/g, "").replace(/[^A-Z0-9]/g, "");
  }

  function defaultState() {
    const created = nowIso();
    const entitlementId = id("ent");
    return {
      version: 2,
      account: { id: "demo_recipient", name: "Roger Zhou" },
      giftOrders: [],
      giftOrderItems: [],
      giftAssets: [],
      redemptionCodes: [],
      entitlements: [{
        id: entitlementId,
        plan: "pro",
        billingCycle: "monthly",
        durationDays: 30,
        remainingDays: 12,
        source: "direct_subscription",
        sourceReferenceId: "demo_subscription",
        status: "active",
        acquiredAt: addDays(created, -18),
        startedAt: addDays(created, -18),
        pausedAt: null,
        endedAt: null,
        createdAt: addDays(created, -18),
        updatedAt: created
      }],
      renewalAgreement: {
        plan: "pro",
        provider: "Apple",
        enabled: true,
        nextBillingAt: addDays(created, 12),
        subscriptionId: "demo_apple_subscription",
        lastOrderId: "demo_subscription",
        status: "active",
        capability: "unknown"
      },
      entitlementTransactions: [{
        id: id("txn"), type: "activated", entitlementId, plan: "pro",
        message: "Pro subscription became active", createdAt: addDays(created, -18)
      }],
      notifications: []
    };
  }

  function load() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return parsed?.version === 2 ? parsed : defaultState();
    } catch (_) {
      return defaultState();
    }
  }

  let state = load();
  let redemptionLock = false;

  function save(next = state) {
    state = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return clone(state);
  }

  function notify(type, title, detail) {
    state.notifications.unshift({ id: id("note"), type, title, detail, createdAt: nowIso() });
  }

  function refreshCodeStatuses() {
    let changed = false;
    const now = Date.now();
    state.redemptionCodes.forEach((code) => {
      if (code.status === "active" && new Date(code.expiresAt).getTime() <= now) {
        code.status = "expired";
        const gift = state.giftAssets.find((item) => item.id === code.giftAssetId);
        if (gift && gift.status === "pending") gift.status = "code_expired";
        notify("gift_code_expired", "Gift code expired", "The gift is still available. Generate a new code when you are ready.");
        changed = true;
      }
    });
    if (changed) save();
  }

  function createGiftOrder({ plan, cardType, quantity = 1 }) {
    const product = giftProduct(plan, cardType);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_GIFT_QUANTITY) throw new Error(`Choose between 1 and ${MAX_GIFT_QUANTITY} gift cards`);
    const createdAt = nowIso();
    const order = {
      id: id("order"), purchaserId: "demo_purchaser", plan, cardType,
      durationDays: product.durationDays, quantity, unitPriceCents: product.unitPriceCents,
      totalPriceCents: product.unitPriceCents * quantity, paymentOrderId: id("pay"),
      status: "paid", itemIds: [], createdAt, updatedAt: createdAt
    };
    const gifts = [];
    for (let index = 0; index < quantity; index += 1) {
      const assetId = id("asset");
      const item = {
        id: id("item"), giftOrderId: order.id, giftAssetId: assetId,
        plan, cardType, durationDays: product.durationDays,
        unitPriceCents: product.unitPriceCents, createdAt
      };
      const code = {
        id: id("code"), code: makeCode(), giftOrderId: order.id, giftAssetId: assetId,
        status: "active", generatedAt: createdAt, expiresAt: addDays(createdAt, 30), redeemedAt: null,
        redeemerId: null, replacedCodeId: null, regeneratedFromId: null, revokedReason: null
      };
      const asset = {
        id: assetId, giftOrderId: order.id, giftOrderItemId: item.id,
        plan, cardType, durationDays: product.durationDays, unitPriceCents: product.unitPriceCents,
        status: "pending", activeCodeId: code.id, claimedAt: null,
        revokedReason: null, createdAt, updatedAt: createdAt
      };
      order.itemIds.push(item.id);
      state.giftOrderItems.push(item);
      state.giftAssets.unshift(asset);
      state.redemptionCodes.unshift(code);
      gifts.push({ ...clone(asset), code: clone(code) });
    }
    state.giftOrders.unshift(order);
    notify("gift_purchased", "Gift cards purchased", `${quantity} ${plan.toUpperCase()} ${product.label}${quantity === 1 ? " is" : "s are"} ready.`);
    save();
    return { order: clone(order), gifts };
  }

  function getGiftView(asset) {
    const code = state.redemptionCodes.find((item) => item.id === asset.activeCodeId) || null;
    const order = state.giftOrders.find((item) => item.id === asset.giftOrderId) || null;
    return { ...clone(asset), code: clone(code), order: clone(order) };
  }

  function getMyGifts() {
    refreshCodeStatuses();
    return state.giftAssets.map(getGiftView);
  }

  function getGift(assetId) {
    refreshCodeStatuses();
    const asset = state.giftAssets.find((item) => item.id === assetId);
    return asset ? getGiftView(asset) : null;
  }

  function getGiftOrder(orderId) {
    refreshCodeStatuses();
    const order = state.giftOrders.find((item) => item.id === orderId);
    if (!order) return null;
    const gifts = state.giftAssets.filter((item) => item.giftOrderId === orderId).map(getGiftView);
    return { ...clone(order), gifts };
  }

  function regenerateCode(assetId) {
    refreshCodeStatuses();
    const asset = state.giftAssets.find((item) => item.id === assetId);
    if (!asset || asset.status !== "code_expired") throw new Error("This gift cannot be regenerated");
    const previous = state.redemptionCodes.find((item) => item.id === asset.activeCodeId);
    if (!previous || previous.status !== "expired") throw new Error("No expired code found");
    previous.status = "replaced";
    const generatedAt = nowIso();
    const code = {
      id: id("code"), code: makeCode(), giftOrderId: asset.giftOrderId, giftAssetId: asset.id, status: "active",
      generatedAt, expiresAt: addDays(generatedAt, 30), redeemedAt: null,
      redeemerId: null, replacedCodeId: null, regeneratedFromId: previous.id, revokedReason: null
    };
    previous.replacedCodeId = code.id;
    asset.activeCodeId = code.id;
    asset.status = "pending";
    asset.updatedAt = generatedAt;
    state.redemptionCodes.unshift(code);
    notify("gift_code_generated", "New gift code generated", "The new code is valid for 30 days.");
    save();
    return clone(code);
  }

  function findCode(raw) {
    const normalized = normalizeCode(raw);
    return state.redemptionCodes.find((item) => normalizeCode(item.code) === normalized);
  }

  function currentEntitlement() {
    return state.entitlements.find((item) => item.status === "active") || null;
  }

  function renewalImpact(plan) {
    const agreement = state.renewalAgreement;
    if (!agreement?.enabled) return { capability: "supported", message: "No active auto-renewal will be affected." };
    if (agreement.capability === "supported") return { capability: "supported", message: "The next charge is expected to be deferred by your provider." };
    if (agreement.capability === "unsupported") return { capability: "unsupported", message: "Your provider may still charge you. Manage auto-renewal manually." };
    return { capability: "unknown", message: `${agreement.provider} may continue billing your ${agreement.plan.toUpperCase()} plan. Check your subscription settings.` };
  }

  function previewEffect(plan) {
    const current = currentEntitlement();
    if (!current) return { effect: "active", title: "Starts immediately", detail: `${plan.toUpperCase()} will become your active plan.` };
    if (current.plan === plan) return { effect: "queued", title: `Adds to your ${plan.toUpperCase()} time`, detail: `This benefit will be used after the current ${plan.toUpperCase()} entitlement.` };
    if (plan === "max" && current.plan === "pro") return { effect: "preempt", title: "Max starts immediately", detail: "Your current Pro time will pause and resume after all Max benefits end." };
    return { effect: "queued", title: "Waits while Max is active", detail: "Pro will remain queued and start after all Max benefits end." };
  }

  function validateCode(raw) {
    refreshCodeStatuses();
    const normalized = normalizeCode(raw);
    if (!normalized) return { valid: false, reason: "empty", message: "Enter a gift code." };
    const code = findCode(normalized);
    if (!code) return { valid: false, reason: "not_found", message: "Code not found. Check the code and try again." };
    const messages = {
      redeemed: "Code already redeemed.", expired: "Code expired. Ask the sender to regenerate it.",
      replaced: "Code expired. Ask the sender for the new code.", revoked: "Code revoked. Contact support."
    };
    if (code.status !== "active") return { valid: false, reason: code.status, message: messages[code.status] || "Unable to validate code." };
    const gift = state.giftAssets.find((item) => item.id === code.giftAssetId);
    if (!gift || gift.status === "revoked") return { valid: false, reason: "revoked", message: "Code revoked. Contact support." };
    return {
      valid: true, normalizedCode: normalizeCode(code.code), code: clone(code), gift: clone(gift),
      effect: previewEffect(gift.plan), renewalImpact: renewalImpact(gift.plan),
      currentPlan: currentEntitlement()?.plan || "free"
    };
  }

  function reconcileEntitlements(newEntitlementId) {
    const active = currentEntitlement();
    const incoming = state.entitlements.find((item) => item.id === newEntitlementId);
    if (!incoming) throw new Error("Entitlement was not created");
    const timestamp = nowIso();
    if (!active) {
      incoming.status = "active";
      incoming.startedAt = timestamp;
      return "active";
    }
    if (incoming.plan === "max" && active.plan === "pro") {
      active.status = "paused";
      active.pausedAt = timestamp;
      active.updatedAt = timestamp;
      incoming.status = "active";
      incoming.startedAt = timestamp;
      state.entitlementTransactions.push({ id: id("txn"), type: "paused", entitlementId: active.id, plan: "pro", message: "Pro paused while Max is active", createdAt: timestamp });
      return "preempt";
    }
    incoming.status = "queued";
    return "queued";
  }

  function confirmRedemption(raw) {
    if (redemptionLock) throw new Error("A redemption is already in progress");
    redemptionLock = true;
    const snapshot = clone(state);
    try {
      const validation = validateCode(raw);
      if (!validation.valid) {
        const error = new Error(validation.message);
        error.reason = validation.reason;
        throw error;
      }
      const code = state.redemptionCodes.find((item) => item.id === validation.code.id);
      const gift = state.giftAssets.find((item) => item.id === validation.gift.id);
      if (code.status !== "active" || gift.status !== "pending") throw new Error("Code already redeemed.");
      const timestamp = nowIso();
      code.status = "redeemed";
      code.redeemedAt = timestamp;
      code.redeemerId = state.account.id;
      gift.status = "redeemed";
      gift.claimedAt = timestamp;
      gift.updatedAt = timestamp;
      const entitlement = {
        id: id("ent"), plan: gift.plan, billingCycle: gift.cardType, cardType: gift.cardType,
        durationDays: gift.durationDays, remainingDays: gift.durationDays,
        source: "gift_redemption", sourceReferenceId: gift.id, status: "queued",
        acquiredAt: timestamp, startedAt: null, pausedAt: null, endedAt: null,
        createdAt: timestamp, updatedAt: timestamp
      };
      state.entitlements.push(entitlement);
      const result = reconcileEntitlements(entitlement.id);
      state.entitlementTransactions.push({ id: id("txn"), type: "redeemed", entitlementId: entitlement.id, plan: entitlement.plan, message: `${entitlement.plan.toUpperCase()} gift redeemed`, createdAt: timestamp });
      notify("gift_redeemed", "Subscription redeemed", result === "preempt" ? "Max is active and your Pro time is paused." : result === "active" ? `${entitlement.plan.toUpperCase()} is active now.` : `${entitlement.plan.toUpperCase()} was added to your benefits.`);
      save();
      return { entitlement: clone(entitlement), result, effect: validation.effect, renewalImpact: validation.renewalImpact };
    } catch (error) {
      state = snapshot;
      throw error;
    } finally {
      redemptionLock = false;
    }
  }

  function getAccountSummary() {
    const entitlements = clone(state.entitlements);
    const active = entitlements.find((item) => item.status === "active") || null;
    const grouped = (plan) => entitlements.filter((item) => item.plan === plan && ["active", "queued", "paused"].includes(item.status));
    const aggregate = (plan) => grouped(plan).reduce((sum, item) => sum + item.remainingDays, 0);
    return {
      active,
      max: { totalDays: aggregate("max"), count: grouped("max").length, items: grouped("max") },
      pro: { totalDays: aggregate("pro"), count: grouped("pro").length, items: grouped("pro") },
      renewal: clone(state.renewalAgreement),
      transactions: clone(state.entitlementTransactions).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    };
  }

  function getNotifications() {
    refreshCodeStatuses();
    return clone(state.notifications);
  }

  window.GiftSubscriptionService = {
    prices: PRICES,
    giftProducts: GIFT_PRODUCTS,
    maxGiftQuantity: MAX_GIFT_QUANTITY,
    formatMoney,
    getGiftProduct: giftProduct,
    normalizeCode,
    createGiftOrder,
    getMyGifts,
    getGift,
    getGiftOrder,
    regenerateCode,
    validateCode,
    confirmRedemption,
    previewEffect,
    renewalImpact,
    getAccountSummary,
    getNotifications,
    resetDemo() { localStorage.removeItem(STORAGE_KEY); state = defaultState(); save(); }
  };
})();
