const pages = {
  chat: document.querySelector("#page-chat"),
  feed: document.querySelector("#page-feed"),
  markets: document.querySelector("#page-markets"),
  detail: document.querySelector("#page-detail"),
  token: document.querySelector("#page-token-detail"),
  profile: document.querySelector("#page-profile"),
  subscription: document.querySelector("#page-subscription")
};

const models = [
  "Claude Fable 5",
  "Claude Opus 4.8",
  "Claude Sonnet 4.6",
  "Claude Haiku 4.5",
  "GPT-5.4",
  "GPT-5.4 Mini",
  "Gemini 3.1 Flash Lite",
  "Grok 4.3",
  "Kimi K2.6",
  "Qwen 3.7 Max",
  "DeepSeek V4 Pro",
  "DeepSeek V4 Flash",
  "Z.AI GLM-5.1",
  "Xiaomi MiMo V2.5",
  "Xiaomi MiMo V2.5 Pro",
  "MiniMax M3"
];

const markets = {
  "BTC-USDC": {
    name: "BTC-USDC",
    symbol: "BTC",
    category: "Crypto",
    price: "$62,984.50",
    change: "+0.16%",
    volume: "$42.8B",
    funding: "0.0102%",
    openInterest: "$13.2B",
    oracle: "$62,986.10",
    mark: "$62,984.50",
    high: "$63,510.00",
    low: "$61,840.20",
    leverage: "50x",
    position: { direction: "Long", size: "0.12 BTC", entry: "$61,420", pnl: "+$184.20", margin: "$1,240" },
    chart: "M8 106 C39 88 48 96 78 76 S118 104 146 78 184 42 215 56 245 82 278 58 304 42 324 36"
  },
  "ETH-USDC": {
    name: "ETH-USDC",
    symbol: "ETH",
    category: "Crypto",
    price: "$1,752.65",
    change: "-0.24%",
    volume: "$18.6B",
    funding: "-0.0031%",
    openInterest: "$7.4B",
    oracle: "$1,752.71",
    mark: "$1,752.65",
    high: "$1,781.30",
    low: "$1,736.88",
    leverage: "50x",
    position: null,
    chart: "M8 38 C36 56 51 46 76 71 S118 58 142 84 178 112 205 88 238 102 268 76 302 95 324 68"
  },
  "HYPE-USDC": {
    name: "HYPE-USDC",
    symbol: "HYPE",
    category: "Crypto",
    price: "$71.44",
    change: "+2.02%",
    volume: "$360.7M",
    funding: "0.0013%",
    openInterest: "$1.6B",
    oracle: "$71.45",
    mark: "$71.45",
    high: "$72.00",
    low: "$68.62",
    leverage: "10x",
    position: { direction: "Long", size: "42 HYPE", entry: "$68.20", pnl: "+$136.08", margin: "$860" },
    chart: "M8 112 C40 102 48 65 78 72 S118 128 148 91 191 34 222 52 252 91 285 58 310 38 324 30"
  },
  "SOL-USDC": {
    name: "SOL-USDC",
    symbol: "SOL",
    category: "Crypto",
    price: "$182.64",
    change: "+3.62%",
    volume: "$4.8B",
    funding: "0.0082%",
    openInterest: "$2.2B",
    oracle: "$182.66",
    mark: "$182.64",
    high: "$186.10",
    low: "$174.34",
    leverage: "20x",
    position: null,
    chart: "M8 116 C36 112 54 92 78 96 S118 112 146 76 178 64 200 36 232 48 258 78 290 52 324 28"
  },
  "DOGE-USDC": {
    name: "DOGE-USDC",
    symbol: "DOGE",
    category: "Crypto",
    price: "$0.193",
    change: "-1.12%",
    volume: "$1.2B",
    funding: "-0.0016%",
    openInterest: "$740M",
    oracle: "$0.193",
    mark: "$0.193",
    high: "$0.201",
    low: "$0.190",
    leverage: "10x",
    position: null,
    chart: "M8 52 C38 70 52 48 78 66 S116 102 148 84 176 62 206 100 236 86 268 110 298 84 324 98"
  },
  "BTC-USD": {
    name: "BTC-USD",
    symbol: "BTC",
    category: "Crypto",
    price: "$62,970.20",
    change: "+0.12%",
    volume: "$16.4B",
    funding: "n/a",
    openInterest: "n/a",
    oracle: "$62,971.10",
    mark: "$62,970.20",
    high: "$63,482.40",
    low: "$61,902.80",
    leverage: "n/a",
    position: null
  },
  "ETH-USD": {
    name: "ETH-USD",
    symbol: "ETH",
    category: "Crypto",
    price: "$1,751.90",
    change: "-0.18%",
    volume: "$7.9B",
    funding: "n/a",
    openInterest: "n/a",
    oracle: "$1,752.02",
    mark: "$1,751.90",
    high: "$1,779.40",
    low: "$1,738.10",
    leverage: "n/a",
    position: null
  },
  "SOL-USD": {
    name: "SOL-USD",
    symbol: "SOL",
    category: "Crypto",
    price: "$182.42",
    change: "+3.48%",
    volume: "$2.1B",
    funding: "n/a",
    openInterest: "n/a",
    oracle: "$182.44",
    mark: "$182.42",
    high: "$185.86",
    low: "$174.72",
    leverage: "n/a",
    position: null
  },
  "DOGE-USD": {
    name: "DOGE-USD",
    symbol: "DOGE",
    category: "Crypto",
    price: "$0.1926",
    change: "-1.08%",
    volume: "$680.4M",
    funding: "n/a",
    openInterest: "n/a",
    oracle: "$0.1927",
    mark: "$0.1926",
    high: "$0.2008",
    low: "$0.1904",
    leverage: "n/a",
    position: null
  },
  NVDAx: {
    name: "NVDAx",
    symbol: "NVDAx",
    category: "xStocks",
    price: "$159.80",
    change: "+0.96%",
    volume: "$52.4M",
    funding: "0.0000%",
    openInterest: "$91.8M",
    oracle: "$159.82",
    mark: "$159.80",
    high: "$161.10",
    low: "$157.62",
    leverage: "5x",
    position: null,
    chart: "M8 96 C38 88 58 104 86 78 S128 48 156 61 190 82 214 58 246 42 278 56 304 39 324 44"
  },
  TSLAx: {
    name: "TSLAx",
    symbol: "TSLAx",
    category: "xStocks",
    price: "$248.10",
    change: "-0.72%",
    volume: "$38.9M",
    funding: "0.0000%",
    openInterest: "$84.5M",
    oracle: "$248.14",
    mark: "$248.10",
    high: "$252.30",
    low: "$246.90",
    leverage: "5x",
    position: null,
    chart: "M8 44 C34 57 54 51 80 70 S120 52 148 86 180 108 212 76 242 94 274 88 302 114 324 96"
  },
  SPYx: {
    name: "SPYx",
    symbol: "SPYx",
    category: "Tradfi",
    price: "$603.18",
    change: "+0.31%",
    volume: "$24.6M",
    funding: "0.0000%",
    openInterest: "$48.2M",
    oracle: "$603.21",
    mark: "$603.18",
    high: "$605.44",
    low: "$599.72",
    leverage: "5x",
    position: null
  },
  "Election Winner": {
    name: "Election Winner",
    symbol: "ELECT",
    category: "Prediction",
    price: "54¢",
    change: "+1.40%",
    volume: "$11.6M",
    funding: "n/a",
    openInterest: "$24.2M",
    oracle: "54¢",
    mark: "54¢",
    high: "58¢",
    low: "49¢",
    leverage: "n/a",
    position: null,
    chart: "M8 92 C42 88 56 72 82 76 S120 96 150 70 184 46 216 72 246 58 278 64 302 48 324 36"
  }
};

const marketMeta = {
  "BTC-USDC": { type: "Perpetual", assetClass: "Crypto", assetName: "Bitcoin" },
  "ETH-USDC": { type: "Perpetual", assetClass: "Crypto", assetName: "Ethereum" },
  "HYPE-USDC": { type: "Perpetual", assetClass: "Crypto", assetName: "Hyperliquid" },
  "SOL-USDC": { type: "Perpetual", assetClass: "Crypto", assetName: "Solana" },
  "DOGE-USDC": { type: "Perpetual", assetClass: "Crypto", assetName: "Dogecoin" },
  "BTC-USD": { type: "Spot", assetClass: "Crypto", assetName: "Bitcoin" },
  "ETH-USD": { type: "Spot", assetClass: "Crypto", assetName: "Ethereum" },
  "SOL-USD": { type: "Spot", assetClass: "Crypto", assetName: "Solana" },
  "DOGE-USD": { type: "Spot", assetClass: "Crypto", assetName: "Dogecoin" },
  NVDAx: { type: "Synthetic", assetClass: "Tradfi", assetName: "NVIDIA" },
  TSLAx: { type: "Synthetic", assetClass: "Tradfi", assetName: "Tesla" },
  SPYx: { type: "Synthetic", assetClass: "Tradfi", assetName: "S&P 500" },
  "Election Winner": { type: "Prediction", assetClass: "Prediction", assetName: "US Election" }
};

const marketOrder = Object.keys(markets);
let watchlist = ["BTC-USDC", "ETH-USDC", "HYPE-USDC"];

const signals = [
  { direction: "SHORT", coin: "ETH", title: "Whale Entry", amount: "$17.4k", desc: "A T1 whale increased a $17.4k short position (8.7x median).", pair: "ETH-USDC", time: "29m ago" },
  { direction: "SHORT", coin: "BTC", title: "Whale Entry", amount: "$25.2k", desc: "A T2 whale increased a $25.2k short position (12.6x median).", pair: "BTC-USDC", time: "53m ago" },
  { direction: "SHORT", coin: "BTC", title: "Whale Add", amount: "$17.0k", desc: "A whale added to a BTC short position.", pair: "BTC-USDC", time: "1h ago" },
  { direction: "LONG", coin: "HYPE", title: "Whale Consensus", amount: "$185.2k", desc: "3 whales aligned long on HYPE.", pair: "HYPE-USDC", time: "44m ago" },
  { direction: "LONG", coin: "HYPE", title: "Whale Entry", amount: "$12.8k", desc: "Fresh whale entry detected on HYPE.", pair: "HYPE-USDC", time: "51m ago" },
  { direction: "LONG", coin: "SOL", title: "Momentum Shift", amount: "$64.1k", desc: "Large accounts are leaning back into SOL after volume expansion.", pair: "SOL-USDC", time: "2h ago" }
];

const topTabs = document.querySelectorAll(".top-tab");
const mainHeader = document.querySelector("[data-main-header]");
const composer = document.querySelector("[data-composer]");
const chatWelcome = document.querySelector("[data-chat-welcome]");
const chatThread = document.querySelector("[data-chat-thread]");
const chatInput = document.querySelector("[data-chat-input]");
const toast = document.querySelector(".toast");
const sidebar = document.querySelector("[data-sidebar]");
const dim = document.querySelector("[data-dim]");
const modelSheet = document.querySelector("[data-model-sheet]");
const watchlistSheet = document.querySelector("[data-watchlist-sheet]");
const shareSheet = document.querySelector("[data-share-sheet]");
const tradeConfirmSheet = document.querySelector("[data-trade-confirm-sheet]");
const modelList = document.querySelector("[data-model-list]");
const modelLabel = document.querySelector("[data-model-label]");
const signalList = document.querySelector("[data-signal-list]");
const choiceDialog = document.querySelector("[data-choice-dialog]");
const choiceTitle = document.querySelector("[data-choice-title]");
const choiceOptions = document.querySelector("[data-choice-options]");
const watchlistSearch = document.querySelector("[data-watchlist-search]");
const appContent = document.querySelector(".app-content");
const newChatButton = document.querySelector("[data-new-chat]");

let currentModel = "Kimi K2.6";
let toastTimer;
let thinkingTimer;
let lastProfileEntry = "chat";
let lastMainPage = "chat";
let tokenSource = "markets";
let currentToken = "HYPE-USDC";
let touchStartX = 0;
let currentTimeframe = "15m";
let selectedCandleIndex = -1;
let chartTouchActive = false;
let watchlistCategory = "all";
let currentDetailTab = "info";
let detailTabTouchStartX = 0;
let tokenReturnPage = "markets";
let tokenReturnScroll = 0;
let currentSignalIndex = 0;
const favoriteSignals = new Set();
const timeframeOptions = ["1m", "5m", "15m", "1H", "4H", "1D", "1W"];
const candleStore = {};

function showPage(name) {
  Object.entries(pages).forEach(([pageName, page]) => {
    page.classList.toggle("is-active", pageName === name);
  });

  const isMain = name === "chat" || name === "feed" || name === "markets";
  mainHeader.classList.toggle("is-hidden", !isMain);
  composer.classList.toggle("is-hidden", name !== "chat");
  newChatButton.classList.toggle("is-hidden", name !== "chat");

  topTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === name);
  });

  if (isMain) lastMainPage = name;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-open");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-open"), 1700);
}

function openSidebar() {
  sidebar.classList.add("is-open");
  dim.classList.add("is-open");
}

function closeSidebar() {
  sidebar.classList.remove("is-open");
  dim.classList.remove("is-open");
}

function openSheet(sheet) {
  sheet.classList.add("is-open");
}

function closeSheets() {
  [modelSheet, watchlistSheet, shareSheet, tradeConfirmSheet, choiceDialog].forEach((sheet) => sheet.classList.remove("is-open"));
}

function modelIcon(name) {
  if (name.startsWith("Claude")) return "Cl";
  if (name.startsWith("GPT")) return "G";
  if (name.startsWith("Gemini")) return "Ge";
  if (name.startsWith("Grok")) return "X";
  if (name.startsWith("Kimi")) return "K";
  if (name.startsWith("Qwen")) return "Q";
  if (name.startsWith("DeepSeek")) return "D";
  if (name.startsWith("Z.AI")) return "Z";
  if (name.startsWith("Xiaomi")) return "Mi";
  return "M";
}

function tokenIcon(symbol) {
  if (symbol === "BTC") return "btc";
  if (symbol === "ETH") return "eth";
  return "";
}

function isUp(change) {
  return !change.startsWith("-");
}

function marketKind(market) {
  return marketMeta[market.name] || { type: "Market", assetClass: market.category, assetName: market.symbol };
}

function renderModels() {
  modelList.innerHTML = models.map((name) => {
    const selected = name === currentModel;
    const defaultLabel = name === "DeepSeek V4 Flash" ? "<span class=\"model-meta\">默认</span>" : "";
    const freeLabel = ["Xiaomi MiMo V2.5 Pro", "MiniMax M3"].includes(name) ? "<span class=\"free-tag\">Free</span>" : "";
    const right = selected ? "<span class=\"check\">✓</span>" : defaultLabel || freeLabel;

    return `
      <button class="model-row ${selected ? "is-selected" : ""}" type="button" data-model="${name}">
        <span class="model-icon">${modelIcon(name)}</span>
        <strong>${name}</strong>
        ${right}
      </button>
    `;
  }).join("");
}

function marketRow(name, options = {}) {
  const market = markets[name];
  const watched = watchlist.includes(name);
  const asSheet = options.sheet ? "sheet-add" : "";
  const kind = marketKind(market);
  return `
    <article class="market-row ${asSheet}" data-market-name="${name}" data-open-token="${name}">
      <button class="market-row-main" type="button">
        <span class="token-icon ${tokenIcon(market.symbol)}">${market.symbol === "BTC" ? "₿" : market.symbol.slice(0, 1)}</span>
        <span class="market-copy">
          <strong>${market.name}</strong>
          <em>${kind.type} · ${kind.assetClass}</em>
        </span>
      </button>
      <button class="market-price" type="button">
        <strong>${market.price}</strong>
        <span class="${isUp(market.change) ? "up" : "down"}">${market.change}</span>
      </button>
      <button class="watch-toggle ${watched ? "is-watched" : ""}" type="button" data-toggle-watch="${name}" aria-label="${watched ? "Remove" : "Add"} ${name} ${watched ? "from" : "to"} Watchlist">${watched ? "✓" : "+"}</button>
    </article>
  `;
}

function filteredMarkets(names, query) {
  const q = query.trim().toLowerCase();
  if (!q) return names;
  return names.filter((name) => {
    const market = markets[name];
    const meta = marketKind(market);
    return [market.name, market.symbol, meta.assetName, meta.type, meta.assetClass]
      .some((value) => String(value).toLowerCase().includes(q));
  });
}

function matchesMarketCategory(name, category) {
  const meta = marketKind(markets[name]);
  if (category === "all") return true;
  if (category === "perps") return meta.type === "Perpetual";
  if (category === "spot") return meta.type === "Spot";
  if (category === "crypto") return meta.assetClass === "Crypto";
  if (category === "tradfi") return meta.assetClass === "Tradfi";
  if (category === "hip3") return meta.type === "HIP-3";
  if (category === "prelaunch") return meta.type === "Pre-launch";
  return false;
}

function renderMarketLists() {
  const watchNames = watchlist;
  const exploreNames = marketOrder;
  document.querySelector("[data-watchlist-list]").innerHTML = watchNames.map((name) => marketRow(name)).join("");
  document.querySelector("[data-explore-list]").innerHTML = exploreNames.map((name) => marketRow(name)).join("");
  document.querySelector("[data-watchlist-empty]").classList.toggle("is-visible", watchlist.length === 0);
  renderWatchlistSearch();
}

function renderWatchlistSearch() {
  const names = filteredMarkets(marketOrder, watchlistSearch.value).filter((name) => {
    return matchesMarketCategory(name, watchlistCategory);
  });
  const list = document.querySelector("[data-watchlist-search-list]");
  list.innerHTML = names.map((name) => marketRow(name, { sheet: true })).join("");
  list.classList.toggle("is-empty", names.length === 0);
  document.querySelector("[data-market-search-empty]").classList.toggle("is-visible", names.length === 0);
}

function toggleWatch(name, quiet = false) {
  const exists = watchlist.includes(name);
  if (exists) {
    watchlist = watchlist.filter((item) => item !== name);
  } else {
    watchlist = [...watchlist, name];
  }
  renderMarketLists();
  renderSignals();
  if (pages.token.classList.contains("is-active")) renderTokenDetail(name);
  if (pages.detail.classList.contains("is-active")) updateSignalDetailWatch();
  if (!quiet) showToast(exists ? `${name} 已从 Watchlist 移除` : `${name} 已添加到 Watchlist`);
}

function renderSignals() {
  signalList.innerHTML = signals.map((signal, index) => {
    const market = markets[signal.pair];
    const watched = watchlist.includes(signal.pair);
    return `
      <article class="signal-card" data-signal-index="${index}">
        <div class="signal-top">
          <span class="direction ${signal.direction === "SHORT" ? "short" : ""}">${signal.direction}</span>
          <button class="signal-title" type="button" data-open-detail>
            <span class="coin-link">$${signal.coin}</span>
            <strong>${signal.title}</strong>
            <b>${signal.amount}</b>
          </button>
        </div>
        <p class="signal-desc">${signal.desc}</p>
        <button class="market-mini" type="button" data-open-token="${signal.pair}">
          <span class="token-icon ${tokenIcon(market.symbol)}">${market.symbol === "BTC" ? "₿" : market.symbol.slice(0, 1)}</span>
          <span class="market-copy">
            <strong>${signal.pair}</strong>
            <em>${market.price} <b class="${isUp(market.change) ? "up" : "down"}">${market.change}</b></em>
          </span>
          <svg class="sparkline ${isUp(market.change) ? "up" : "down"}" viewBox="0 0 72 30" aria-hidden="true">
            <path d="${isUp(market.change) ? "M2 22 C12 20 14 10 24 13 S37 27 47 16 58 7 70 4" : "M2 5 C10 23 17 12 24 18 S36 27 43 16 53 21 60 11 67 24 70 9"}"></path>
          </svg>
        </button>
        <div class="signal-actions">
          <span>${signal.time}</span>
          <span class="action-group">
            <button class="market-watch-inline ${watched ? "is-watched" : ""}" type="button" data-toggle-watch="${signal.pair}" aria-label="${watched ? "Remove from" : "Add to"} Watchlist">${watched ? "✓" : "+"}</button>
            <button class="${favoriteSignals.has(index) ? "is-active" : ""}" type="button" data-favorite aria-label="收藏 Signal">${favoriteSignals.has(index) ? "★" : "☆"}</button>
            <button type="button" data-open-share aria-label="分享">↗</button>
            <i></i>
            <button type="button" data-ask-signal>Ask AI</button>
          </span>
        </div>
      </article>
    `;
  }).join("");
}

function renderSignalDetail(signal) {
  currentSignalIndex = signals.indexOf(signal);
  document.querySelector(".detail-tags").innerHTML = `
    <span>${signal.title}</span>
    <span>${signal.pair}</span>
    <span>${signal.time}</span>
    <button class="detail-market-watch ${watchlist.includes(signal.pair) ? "is-watched" : ""}" type="button" data-detail-toggle-watch="${signal.pair}">${watchlist.includes(signal.pair) ? "✓" : "+"}</button>
  `;
  document.querySelector(".detail-title-row h1").textContent = `${signal.direction === "LONG" ? "↗" : "↘"} ${signal.direction} ${signal.coin}`;
  document.querySelector(".detail-title-row strong").textContent = signal.amount;
  document.querySelector(".detail-hero p").textContent = signal.desc;
  const rows = document.querySelectorAll("#page-detail .info-card .info-row strong");
  rows[0].textContent = signal.title;
  rows[1].textContent = signal.coin;
  rows[2].textContent = signal.direction;
  rows[2].className = signal.direction === "LONG" ? "up" : "down";
  rows[3].textContent = signal.amount;
  rows[4].textContent = signal.title === "Whale Consensus" ? "3" : "1";
  rows[5].textContent = signal.time;
  document.querySelector("[data-ask-detail]").dataset.signalPair = signal.pair;
  document.querySelector("[data-open-market]").dataset.openToken = signal.pair;
  document.querySelector("[data-open-market]").textContent = `View ${signal.pair} market`;
}

function updateSignalDetailWatch() {
  const signal = signals[currentSignalIndex];
  const button = document.querySelector("[data-detail-toggle-watch]");
  if (!signal || !button) return;
  const watched = watchlist.includes(signal.pair);
  button.textContent = watched ? "✓" : "+";
  button.classList.toggle("is-watched", watched);
}

function numericPrice(value) {
  const cleaned = String(value).replace(/[$,¢]/g, "");
  const parsed = Number(cleaned);
  if (String(value).includes("¢")) return parsed / 100;
  return Number.isFinite(parsed) ? parsed : 1;
}

function formatChartPrice(value, market) {
  if (market.price.includes("¢")) return `${Math.round(value * 100)}¢`;
  if (value >= 1000) return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (value >= 10) return `$${value.toFixed(2)}`;
  if (value >= 1) return `$${value.toFixed(3)}`;
  return `$${value.toFixed(4)}`;
}

function compactVolume(value) {
  if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${Math.round(value)}`;
}

function seededNoise(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function tokenSeed(name) {
  return [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function timeframeConfig(timeframe) {
  return {
    "1m": { count: 46, step: 1, label: "m", volatility: 0.0018, wave: 2.8 },
    "5m": { count: 44, step: 5, label: "m", volatility: 0.0032, wave: 2.2 },
    "15m": { count: 42, step: 15, label: "m", volatility: 0.005, wave: 1.7 },
    "1H": { count: 40, step: 1, label: "H", volatility: 0.008, wave: 1.35 },
    "4H": { count: 38, step: 4, label: "H", volatility: 0.012, wave: 1.08 },
    "1D": { count: 36, step: 1, label: "D", volatility: 0.018, wave: 0.86 },
    "1W": { count: 34, step: 1, label: "W", volatility: 0.03, wave: 0.62 }
  }[timeframe];
}

function candleTimeLabel(index, config) {
  const remaining = config.count - index - 1;
  if (remaining === 0) return "Now";
  if (config.label === "m") return `-${remaining * config.step}m`;
  if (config.label === "H") return `-${remaining * config.step}H`;
  if (config.label === "D") return `-${remaining}D`;
  return `-${remaining}W`;
}

function generateCandles(name, timeframe) {
  const key = `${name}:${timeframe}`;
  if (candleStore[key]) return candleStore[key];

  const market = markets[name];
  const config = timeframeConfig(timeframe);
  const base = numericPrice(market.price);
  const seed = tokenSeed(name) + timeframeOptions.indexOf(timeframe) * 31;
  const trendBias = {
    BTC: 0.00028,
    ETH: -0.00018,
    HYPE: 0.00086,
    SOL: 0.0011,
    TSLAx: -0.00036,
    NVDAx: 0.00042,
    DOGE: -0.00048,
    ELECT: 0.0002
  }[market.symbol] || 0.00016;
  let close = base * (1 - trendBias * config.count * 0.62);
  const candles = [];

  for (let i = 0; i < config.count; i += 1) {
    const wave = Math.sin((i + seed / 9) * config.wave) * config.volatility * 1.25;
    const micro = (seededNoise(seed + i * 5.7) - 0.5) * config.volatility * 2.2;
    const open = close;
    close = Math.max(base * 0.1, open * (1 + trendBias + wave + micro));
    const spread = Math.max(Math.abs(close - open) * 0.52, base * config.volatility * (0.28 + seededNoise(seed + i)));
    const high = Math.max(open, close) + spread * (0.7 + seededNoise(seed + i * 2.1));
    const low = Math.min(open, close) - spread * (0.7 + seededNoise(seed + i * 3.1));
    const volumeBase = base * 8500 * (market.category === "Crypto" ? 1 : 0.32);
    const volume = volumeBase * (0.5 + seededNoise(seed + i * 4.2) * 1.4 + Math.abs(close - open) / Math.max(base * config.volatility, 0.0001) * 0.22);
    candles.push({
      time: candleTimeLabel(i, config),
      open,
      high,
      low: Math.max(0.0001, low),
      close,
      volume
    });
  }

  const last = candles[candles.length - 1];
  const ratio = base / last.close;
  candles.forEach((candle) => {
    candle.open *= ratio;
    candle.high *= ratio;
    candle.low *= ratio;
    candle.close *= ratio;
  });

  candleStore[key] = candles;
  return candles;
}

function renderChartStats(market, candles) {
  const last = candles[candles.length - 1];
  document.querySelector("[data-token-price]").textContent = formatChartPrice(last.close, market);
}

function renderCandleChart(name, selectedIndex = -1) {
  const market = markets[name];
  const candles = generateCandles(name, currentTimeframe);
  selectedCandleIndex = selectedIndex >= 0 ? selectedIndex : candles.length - 1;
  document.querySelectorAll("[data-timeframe]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.timeframe === currentTimeframe);
  });
  const svg = document.querySelector("[data-token-chart]");
  const width = 330;
  const height = 238;
  const pad = { left: 8, right: 48, top: 14, bottom: 24 };
  const chartBottom = 154;
  const volumeTop = 171;
  const innerWidth = width - pad.left - pad.right;
  const highs = candles.map((candle) => candle.high);
  const lows = candles.map((candle) => candle.low);
  const volumes = candles.map((candle) => candle.volume);
  const maxPrice = Math.max(...highs);
  const minPrice = Math.min(...lows);
  const priceRange = Math.max(maxPrice - minPrice, maxPrice * 0.01);
  const maxVolume = Math.max(...volumes);
  const slot = innerWidth / candles.length;
  const bodyWidth = Math.max(3.2, Math.min(6.8, slot * 0.58));
  const yPrice = (price) => pad.top + (maxPrice - price) / priceRange * (chartBottom - pad.top);
  const yVolume = (volume) => height - pad.bottom - (volume / maxVolume) * 44;
  const last = candles[candles.length - 1];
  const lastY = yPrice(last.close);
  const selected = candles[selectedCandleIndex] || last;
  const selectedX = pad.left + selectedCandleIndex * slot + slot / 2;

  const priceLines = Array.from({ length: 4 }, (_, index) => {
    const price = maxPrice - (priceRange / 3) * index;
    const y = yPrice(price);
    return `
      <line class="chart-grid" x1="${pad.left}" y1="${y.toFixed(1)}" x2="${width - pad.right}" y2="${y.toFixed(1)}"></line>
      <text class="chart-axis-label" x="${width - 42}" y="${(y + 3).toFixed(1)}">${formatChartPrice(price, market)}</text>
    `;
  }).join("");

  const verticalLines = [0, 0.25, 0.5, 0.75, 1].map((position) => {
    const x = pad.left + innerWidth * position;
    return `<line class="chart-grid" x1="${x.toFixed(1)}" y1="${pad.top}" x2="${x.toFixed(1)}" y2="${height - pad.bottom}"></line>`;
  }).join("");

  const candleNodes = candles.map((candle, index) => {
    const x = pad.left + index * slot + slot / 2;
    const up = candle.close >= candle.open;
    const className = up ? "candle-up" : "candle-down";
    const openY = yPrice(candle.open);
    const closeY = yPrice(candle.close);
    const bodyY = Math.min(openY, closeY);
    const bodyHeight = Math.max(2, Math.abs(closeY - openY));
    const volumeHeight = height - pad.bottom - yVolume(candle.volume);
    const highlight = index === selectedCandleIndex ? `<rect class="chart-highlight" x="${(x - slot / 2).toFixed(1)}" y="${pad.top}" width="${slot.toFixed(1)}" height="${(height - pad.bottom - pad.top).toFixed(1)}"></rect>` : "";
    return `
      ${highlight}
      <line class="candle-wick ${className}" x1="${x.toFixed(1)}" y1="${yPrice(candle.high).toFixed(1)}" x2="${x.toFixed(1)}" y2="${yPrice(candle.low).toFixed(1)}"></line>
      <rect class="candle-body ${className}" x="${(x - bodyWidth / 2).toFixed(1)}" y="${bodyY.toFixed(1)}" width="${bodyWidth.toFixed(1)}" height="${bodyHeight.toFixed(1)}"></rect>
      <rect class="volume-bar ${className}" x="${(x - bodyWidth / 2).toFixed(1)}" y="${yVolume(candle.volume).toFixed(1)}" width="${bodyWidth.toFixed(1)}" height="${volumeHeight.toFixed(1)}"></rect>
    `;
  }).join("");

  const timeIndexes = [0, Math.floor(candles.length * 0.33), Math.floor(candles.length * 0.66), candles.length - 1];
  const timeLabels = timeIndexes.map((index) => {
    const x = pad.left + index * slot + slot / 2;
    return `<text class="chart-time-label" x="${x.toFixed(1)}" y="229" text-anchor="middle">${candles[index].time}</text>`;
  }).join("");

  svg.innerHTML = `
    ${verticalLines}
    ${priceLines}
    <line class="chart-grid" x1="${pad.left}" y1="${volumeTop}" x2="${width - pad.right}" y2="${volumeTop}"></line>
    <text class="chart-volume-label" x="${pad.left}" y="${volumeTop + 12}">Vol.</text>
    ${candleNodes}
    <line class="chart-price-line" x1="${pad.left}" y1="${lastY.toFixed(1)}" x2="${width - pad.right + 4}" y2="${lastY.toFixed(1)}"></line>
    <rect class="chart-price-tag-bg" x="${width - 48}" y="${(lastY - 9).toFixed(1)}" width="46" height="18" rx="7"></rect>
    <text class="chart-price-tag" x="${width - 25}" y="${(lastY + 4).toFixed(1)}" text-anchor="middle">${formatChartPrice(last.close, market)}</text>
    <line class="chart-crosshair" x1="${selectedX.toFixed(1)}" y1="${pad.top}" x2="${selectedX.toFixed(1)}" y2="${height - pad.bottom}"></line>
    ${timeLabels}
    <rect class="chart-hit-area" x="${pad.left}" y="${pad.top}" width="${innerWidth}" height="${height - pad.top - pad.bottom}" fill="transparent"></rect>
  `;

  renderChartStats(market, candles);
  renderChartTooltip(selectedCandleIndex);
}

function renderChartTooltip(index) {
  const market = markets[currentToken];
  const candles = generateCandles(currentToken, currentTimeframe);
  const candle = candles[index];
  if (!candle) return;

  const wrap = document.querySelector("[data-candle-wrap]");
  const tooltip = document.querySelector("[data-chart-tooltip]");
  const slot = 274 / candles.length;
  const x = 8 + index * slot + slot / 2;
  const left = Math.max(8, Math.min(wrap.clientWidth - 140, x / 330 * wrap.clientWidth + 8));
  tooltip.style.left = `${left}px`;
  tooltip.innerHTML = `
    <strong>${currentTimeframe} · ${candle.time}</strong>
    <span>Open <b>${formatChartPrice(candle.open, market)}</b></span>
    <span>High <b>${formatChartPrice(candle.high, market)}</b></span>
    <span>Low <b>${formatChartPrice(candle.low, market)}</b></span>
    <span>Close <b>${formatChartPrice(candle.close, market)}</b></span>
    <span>Volume <b>${compactVolume(candle.volume)}</b></span>
  `;
  tooltip.classList.add("is-visible");
}

function selectCandleFromClientX(clientX) {
  const wrap = document.querySelector("[data-candle-wrap]");
  const rect = wrap.getBoundingClientRect();
  const candles = generateCandles(currentToken, currentTimeframe);
  const chartX = Math.max(8, Math.min(282, (clientX - rect.left) / rect.width * 330));
  const index = Math.max(0, Math.min(candles.length - 1, Math.round((chartX - 8) / (274 / candles.length) - 0.5)));
  renderCandleChart(currentToken, index);
}

function renderTokenDetail(name, source = tokenSource) {
  const market = markets[name];
  currentToken = name;
  tokenSource = source;
  const watched = watchlist.includes(name);

  document.querySelector("[data-token-header]").textContent = market.name;
  document.querySelector("[data-token-category]").textContent = market.category;
  document.querySelector("[data-token-name]").textContent = market.name;
  document.querySelector("[data-token-symbol]").textContent = market.symbol;
  document.querySelector("[data-token-change]").textContent = market.change;
  document.querySelector("[data-token-change]").className = isUp(market.change) ? "up" : "down";
  const tokenWatch = document.querySelector("[data-token-watch]");
  tokenWatch.textContent = watched ? "✓" : "+";
  tokenWatch.classList.toggle("is-watched", watched);
  tokenWatch.setAttribute("aria-label", `${watched ? "Remove" : "Add"} ${name} ${watched ? "from" : "to"} Watchlist`);
  document.querySelector("[data-token-source]").textContent = source === "watchlist" ? "From Watchlist" : `From ${source}`;
  document.querySelector("[data-watchlist-nav]").classList.toggle("is-hidden", source !== "watchlist" || watchlist.length < 2);
  renderCandleChart(name);

  const info = [
    ["Oracle Price", market.oracle],
    ["Mark Price", market.mark],
    ["24h Change", market.change],
    ["24h Volume", market.volume],
    ["24h High", market.high],
    ["24h Low", market.low],
    ["Funding Rate", market.funding],
    ["Open Interest", market.openInterest],
    ["Max Leverage", market.leverage]
  ];
  document.querySelector("[data-token-market-info]").innerHTML = info.map(([label, value]) => `
    <div class="info-row"><span>${label}</span><strong class="${label === "24h Change" ? (isUp(value) ? "up" : "down") : ""}">${value}</strong></div>
  `).join("");

  document.querySelector("[data-token-position]").innerHTML = market.position ? `
    <div class="info-row"><span>Direction</span><strong class="up">${market.position.direction}</strong></div>
    <div class="info-row"><span>Size</span><strong>${market.position.size}</strong></div>
    <div class="info-row"><span>Entry Price</span><strong>${market.position.entry}</strong></div>
    <div class="info-row"><span>Unrealized PnL</span><strong class="${market.position.pnl.startsWith("+") ? "up" : "down"}">${market.position.pnl}</strong></div>
    <div class="info-row"><span>Margin</span><strong>${market.position.margin}</strong></div>
  ` : `
    <div class="position-empty">No active position</div>
  `;

  const related = signals.filter((signal) => signal.pair === name);
  document.querySelector("[data-related-signals]").innerHTML = related.length ? related.map((signal, index) => `
    <article class="related-row" data-related-index="${signals.indexOf(signal)}">
      <button type="button" data-related-detail>
        <span class="direction ${signal.direction === "SHORT" ? "short" : ""}">${signal.direction}</span>
        <span><strong>${signal.title}</strong><em>${signal.desc}</em></span>
      </button>
      <span class="related-actions">
        <button class="signal-favorite ${favoriteSignals.has(signals.indexOf(signal)) ? "is-active" : ""}" type="button" data-related-favorite aria-label="收藏 Signal">${favoriteSignals.has(signals.indexOf(signal)) ? "★" : "☆"}</button>
        <button type="button" data-related-ask>Ask AI</button>
      </span>
    </article>
  `).join("") : `<div class="position-empty">No related signals yet.</div>`;

  setDetailTab(currentDetailTab, false);

  pages.token.classList.remove("slide-in");
  window.requestAnimationFrame(() => pages.token.classList.add("slide-in"));
}

function openToken(name, source = "markets") {
  const activeEntry = Object.entries(pages).find(([, page]) => page.classList.contains("is-active"));
  if (activeEntry?.[0] !== "token") {
    tokenReturnPage = activeEntry?.[0] || (source === "feed" ? "feed" : "markets");
    tokenReturnScroll = appContent.scrollTop;
    currentDetailTab = "info";
  }
  renderTokenDetail(name, source);
  showPage("token");
  appContent.scrollTop = 0;
}

function moveWatchlistToken(direction) {
  if (!watchlist.length) return;
  const index = watchlist.indexOf(currentToken);
  const safeIndex = index === -1 ? 0 : index;
  const nextIndex = (safeIndex + direction + watchlist.length) % watchlist.length;
  renderTokenDetail(watchlist[nextIndex], "watchlist");
}

function setDetailTab(name, animate = true) {
  const tabs = ["info", "position", "signals"];
  if (!tabs.includes(name)) return;
  const previousIndex = tabs.indexOf(currentDetailTab);
  const nextIndex = tabs.indexOf(name);
  currentDetailTab = name;
  document.querySelectorAll("[data-detail-tab]").forEach((button) => {
    const active = button.dataset.detailTab === name;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-detail-panel]").forEach((panel) => {
    const active = panel.dataset.detailPanel === name;
    panel.classList.toggle("is-active", active);
    panel.classList.remove("slide-left", "slide-right");
    if (active && animate && previousIndex !== nextIndex) {
      panel.classList.add(nextIndex > previousIndex ? "slide-left" : "slide-right");
    }
  });
}

function moveDetailTab(direction) {
  const tabs = ["info", "position", "signals"];
  const nextIndex = Math.max(0, Math.min(tabs.length - 1, tabs.indexOf(currentDetailTab) + direction));
  setDetailTab(tabs[nextIndex]);
}

function addMessage(text, role, marketName = "") {
  const message = document.createElement("div");
  message.className = `message ${role}`;
  if (marketName) {
    message.innerHTML = `<button class="context-chip" type="button" data-open-token="${marketName}">Context: ${marketName}</button><span>${text}</span>`;
  } else {
    message.textContent = text;
  }
  chatThread.appendChild(message);
  chatWelcome.style.display = "none";
  chatThread.scrollIntoView({ block: "end" });
  return message;
}

function mockReply(prompt) {
  const matched = marketOrder.find((name) => prompt.toUpperCase().includes(name.toUpperCase()) || prompt.toUpperCase().includes(markets[name].symbol.toUpperCase()));
  if (matched) {
    const market = markets[matched];
    return `${market.name} 当前价格 ${market.price}，24h ${market.change}。我会重点看成交量、资金费率和相关鲸鱼信号；这只是 mock 分析，不包含交易操作。`;
  }

  return "我会把链上资金、市场信号、新闻热度和价格结构放在一起看。当前最值得关注的是鲸鱼方向是否一致、成交量是否跟进，以及风险事件是否正在升温。";
}

function askAI(prompt, marketName = "") {
  window.clearTimeout(thinkingTimer);
  showPage("chat");
  addMessage(prompt, "user", marketName);
  const thinking = addMessage("思考中...", "ai");
  thinkingTimer = window.setTimeout(() => {
    thinking.textContent = mockReply(prompt);
    if (marketName) {
      thinking.innerHTML = `<button class="context-chip" type="button" data-open-token="${marketName}">Context: ${marketName}</button><span>${mockReply(prompt)}</span>`;
    }
  }, 650);
}

function resetChat() {
  window.clearTimeout(thinkingTimer);
  chatThread.innerHTML = "";
  chatWelcome.style.display = "grid";
  chatInput.value = "";
  showPage("chat");
}

function openChoice(type) {
  const choices = type === "language" ? ["中文", "English"] : ["浅色", "深色", "跟随系统"];
  choiceTitle.textContent = type === "language" ? "语言" : "主题";
  choiceOptions.innerHTML = choices.map((choice) => `<button type="button" data-choice-value="${choice}" data-choice-type="${type}">${choice}</button>`).join("");
  openSheet(choiceDialog);
}

topTabs.forEach((tab) => {
  tab.addEventListener("click", () => showPage(tab.dataset.tab));
});

document.querySelector("[data-open-sidebar]").addEventListener("click", openSidebar);
document.querySelector("[data-new-chat]").addEventListener("click", resetChat);
dim.addEventListener("click", closeSidebar);

document.querySelector("[data-open-profile]").addEventListener("click", () => {
  lastProfileEntry = lastMainPage;
  closeSidebar();
  showPage("profile");
});

document.querySelector("[data-sidebar-upgrade]").addEventListener("click", (event) => {
  event.stopPropagation();
  closeSidebar();
  showPage("subscription");
});

document.querySelector("[data-open-notification-market]").addEventListener("click", () => {
  closeSidebar();
  openToken("BTC-USDC", "notification");
});

document.querySelectorAll("[data-history]").forEach((button) => {
  button.addEventListener("click", () => {
    closeSidebar();
    resetChat();
    askAI(`${button.dataset.history} 最近有什么值得关注？`);
  });
});

document.querySelectorAll("[data-back-home]").forEach((button) => {
  button.addEventListener("click", () => showPage(lastProfileEntry));
});

document.querySelector("[data-back-feed]").addEventListener("click", () => showPage("feed"));
document.querySelector("[data-go-subscription]").addEventListener("click", () => showPage("subscription"));
document.querySelector("[data-back-profile]").addEventListener("click", () => showPage("profile"));
document.querySelector("[data-back-token]").addEventListener("click", () => {
  showPage(tokenReturnPage);
  window.requestAnimationFrame(() => {
    appContent.scrollTop = tokenReturnScroll;
  });
});
document.querySelector("[data-ask-detail]").addEventListener("click", (event) => {
  const pair = event.currentTarget.dataset.signalPair || "HYPE-USDC";
  askAI(`分析这个 ${pair} signal 的风险和机会`, pair);
});

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => askAI(button.dataset.prompt));
});

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  const prompt = chatInput.value.trim();
  if (!prompt) return;
  chatInput.value = "";
  askAI(prompt);
});

chatThread.addEventListener("click", (event) => {
  const open = event.target.closest("[data-open-token]");
  if (open) openToken(open.dataset.openToken, "AI Chat");
});

document.querySelector("[data-open-model]").addEventListener("click", () => {
  renderModels();
  openSheet(modelSheet);
});

modelList.addEventListener("click", (event) => {
  const row = event.target.closest("[data-model]");
  if (!row) return;
  currentModel = row.dataset.model;
  modelLabel.textContent = currentModel;
  renderModels();
});

signalList.addEventListener("click", (event) => {
  const card = event.target.closest(".signal-card");
  if (!card) return;
  const signal = signals[Number(card.dataset.signalIndex)];

  const watch = event.target.closest("[data-toggle-watch]");
  if (watch) {
    toggleWatch(watch.dataset.toggleWatch);
    return;
  }

  const token = event.target.closest("[data-open-token]");
  if (token) {
    openToken(token.dataset.openToken, "feed");
    return;
  }

  if (event.target.closest("[data-open-detail]")) {
    renderSignalDetail(signal);
    showPage("detail");
    return;
  }

  if (event.target.closest("[data-favorite]")) {
    const button = event.target.closest("[data-favorite]");
    const index = Number(card.dataset.signalIndex);
    const active = !favoriteSignals.has(index);
    if (active) favoriteSignals.add(index);
    else favoriteSignals.delete(index);
    button.classList.toggle("is-active", active);
    button.textContent = active ? "★" : "☆";
    showToast(active ? "已收藏" : "已取消收藏");
    return;
  }

  if (event.target.closest("[data-open-share]")) {
    openSheet(shareSheet);
    return;
  }

  if (event.target.closest("[data-ask-signal]")) {
    askAI(`分析 ${signal.direction} $${signal.coin} ${signal.title}：${signal.desc}`, signal.pair);
    return;
  }

  renderSignalDetail(signal);
  showPage("detail");
});

pages.detail.addEventListener("click", (event) => {
  const watch = event.target.closest("[data-detail-toggle-watch]");
  if (!watch) return;
  toggleWatch(watch.dataset.detailToggleWatch);
});

document.querySelectorAll("[data-market-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-market-tab]").forEach((tab) => tab.classList.toggle("is-active", tab === button));
    document.querySelectorAll("[data-market-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.marketPanel === button.dataset.marketTab));
  });
});

document.querySelectorAll("[data-open-watchlist-sheet]").forEach((button) => {
  button.addEventListener("click", () => {
    renderWatchlistSearch();
    openSheet(watchlistSheet);
    window.requestAnimationFrame(() => watchlistSearch.focus());
  });
});

document.querySelector("#page-markets").addEventListener("click", (event) => {
  const watch = event.target.closest("[data-toggle-watch]");
  if (watch) {
    toggleWatch(watch.dataset.toggleWatch);
    return;
  }

  const token = event.target.closest("[data-open-token]");
  if (token) {
    const activePanel = document.querySelector("[data-market-panel].is-active");
    openToken(token.dataset.openToken, activePanel?.dataset.marketPanel === "watchlist" ? "watchlist" : "markets");
  }
});

watchlistSheet.addEventListener("click", (event) => {
  const watch = event.target.closest("[data-toggle-watch]");
  if (watch) {
    toggleWatch(watch.dataset.toggleWatch);
    return;
  }

  const token = event.target.closest("[data-open-token]");
  if (token) {
    closeSheets();
    openToken(token.dataset.openToken, "markets");
  }
});

watchlistSearch.addEventListener("input", renderWatchlistSearch);
document.querySelector("[data-watchlist-categories]").addEventListener("click", (event) => {
  const button = event.target.closest("[data-watchlist-category]");
  if (!button) return;
  watchlistCategory = button.dataset.watchlistCategory;
  document.querySelectorAll("[data-watchlist-category]").forEach((item) => item.classList.toggle("is-active", item === button));
  renderWatchlistSearch();
});

document.querySelector("[data-token-watch]").addEventListener("click", () => toggleWatch(currentToken));
document.querySelector("[data-token-ask-ai]").addEventListener("click", () => askAI(`分析 ${currentToken} 当前市场、持仓和相关 signal`, currentToken));
document.querySelector("[data-open-trade-confirm]").addEventListener("click", () => {
  document.querySelector("[data-trade-market]").textContent = currentToken;
  openSheet(tradeConfirmSheet);
});
document.querySelector("[data-cancel-trade]").addEventListener("click", () => tradeConfirmSheet.classList.remove("is-open"));
document.querySelector("[data-continue-trade]").addEventListener("click", () => {
  tradeConfirmSheet.classList.remove("is-open");
  showToast(`Opening Questflow Web trading for ${currentToken}`);
});
document.querySelector("[data-prev-token]").addEventListener("click", () => moveWatchlistToken(-1));
document.querySelector("[data-next-token]").addEventListener("click", () => moveWatchlistToken(1));

document.querySelector("[data-token-swipe]").addEventListener("touchstart", (event) => {
  if (event.target.closest("[data-candle-wrap]")) return;
  touchStartX = event.touches[0].clientX;
});

document.querySelector("[data-token-swipe]").addEventListener("touchend", (event) => {
  if (chartTouchActive || event.target.closest("[data-candle-wrap]")) {
    chartTouchActive = false;
    return;
  }
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) < 45 || tokenSource !== "watchlist") return;
  moveWatchlistToken(delta > 0 ? -1 : 1);
});

document.querySelector("[data-timeframe-switch]").addEventListener("click", (event) => {
  const button = event.target.closest("[data-timeframe]");
  if (!button) return;
  currentTimeframe = button.dataset.timeframe;
  renderCandleChart(currentToken);
});

document.querySelector("[data-candle-wrap]").addEventListener("mousemove", (event) => {
  selectCandleFromClientX(event.clientX);
});

document.querySelector("[data-candle-wrap]").addEventListener("click", (event) => {
  selectCandleFromClientX(event.clientX);
});

document.querySelector("[data-candle-wrap]").addEventListener("touchstart", (event) => {
  chartTouchActive = true;
  touchStartX = event.touches[0].clientX;
  event.stopPropagation();
  selectCandleFromClientX(event.touches[0].clientX);
});

document.querySelector("[data-candle-wrap]").addEventListener("touchmove", (event) => {
  chartTouchActive = true;
  event.preventDefault();
  event.stopPropagation();
  selectCandleFromClientX(event.touches[0].clientX);
});

document.querySelector("[data-candle-wrap]").addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].clientX - touchStartX;
  chartTouchActive = false;
  event.stopPropagation();
  if (Math.abs(delta) >= 55 && tokenSource === "watchlist") {
    moveWatchlistToken(delta > 0 ? -1 : 1);
  }
});

document.querySelectorAll("[data-detail-tab]").forEach((button) => {
  button.addEventListener("click", () => setDetailTab(button.dataset.detailTab));
});

document.querySelector("[data-detail-tab-content]").addEventListener("touchstart", (event) => {
  detailTabTouchStartX = event.touches[0].clientX;
  event.stopPropagation();
}, { passive: true });

document.querySelector("[data-detail-tab-content]").addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].clientX - detailTabTouchStartX;
  event.stopPropagation();
  if (Math.abs(delta) < 45) return;
  moveDetailTab(delta < 0 ? 1 : -1);
}, { passive: true });

document.querySelector("[data-related-signals]").addEventListener("click", (event) => {
  const row = event.target.closest("[data-related-index]");
  if (!row) return;
  const signal = signals[Number(row.dataset.relatedIndex)];
  if (event.target.closest("[data-related-favorite]")) {
    const index = Number(row.dataset.relatedIndex);
    const active = !favoriteSignals.has(index);
    if (active) favoriteSignals.add(index);
    else favoriteSignals.delete(index);
    renderTokenDetail(currentToken, tokenSource);
    showToast(active ? "已收藏" : "已取消收藏");
    return;
  }
  if (event.target.closest("[data-related-ask]")) {
    askAI(`分析 ${signal.pair} 的这条相关 Signal：${signal.desc}`, signal.pair);
    return;
  }
  renderSignalDetail(signal);
  showPage("detail");
});

document.querySelectorAll("[data-open-market]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const pair = event.currentTarget.dataset.openToken || "HYPE-USDC";
    openToken(pair, "Signal Detail");
  });
});

document.querySelectorAll("[data-open-share]").forEach((button) => {
  button.addEventListener("click", () => openSheet(shareSheet));
});

document.querySelectorAll("[data-close-sheets]").forEach((button) => {
  button.addEventListener("click", closeSheets);
});

[modelSheet, watchlistSheet, shareSheet, tradeConfirmSheet, choiceDialog].forEach((sheet) => {
  sheet.addEventListener("click", (event) => {
    if (event.target === sheet) closeSheets();
  });
});

document.querySelectorAll("[data-share-action]").forEach((button) => {
  button.addEventListener("click", () => showToast(`${button.dataset.shareAction} 已触发`));
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

document.querySelectorAll("[data-choice]").forEach((button) => {
  button.addEventListener("click", () => openChoice(button.dataset.choice));
});

choiceOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-choice-value]");
  if (!button) return;
  const label = button.dataset.choiceType === "language"
    ? document.querySelector("[data-language-label]")
    : document.querySelector("[data-theme-label]");
  label.textContent = `${button.dataset.choiceValue} ›`;
  closeSheets();
});

document.querySelector("[data-toggle-about]").addEventListener("click", () => {
  document.querySelector("[data-about-panel]").classList.toggle("is-open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSidebar();
    closeSheets();
  }
});

renderSignals();
renderModels();
renderMarketLists();
renderTokenDetail("HYPE-USDC");
