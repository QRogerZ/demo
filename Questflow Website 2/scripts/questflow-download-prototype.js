(() => {
  "use strict";

  const questflowDownloadConfig = Object.freeze({
    launchAppUrl: "",
    ios: Object.freeze({
      platformName: "iOS",
      storeUrl: "https://apps.apple.com/",
      qrValue: "https://apps.apple.com/",
      qrCodeImage:
        "../assets/questflow-download/qr/app-store-home-qr.png",
      storeBadgeImage:
        "../assets/questflow-download/stores/app-store-badge.svg",
      platformIconImage:
        "../assets/questflow-download/stores/apple-logo.svg",
      storeName: "App Store",
      storeBadgeAlt: "Download on the App Store",
      scanLabel: "Scan to visit the App Store",
      description: "Financial intelligence designed for iPhone and iPad.",
    }),
    android: Object.freeze({
      platformName: "Android",
      storeUrl: "https://play.google.com/store/apps",
      qrValue: "https://play.google.com/store/apps",
      qrCodeImage:
        "../assets/questflow-download/qr/google-play-home-qr.png",
      storeBadgeImage:
        "../assets/questflow-download/stores/google-play-badge.png",
      platformIconImage:
        "../assets/questflow-download/stores/google-play-logo.png",
      storeName: "Google Play",
      storeBadgeAlt: "Get it on Google Play",
      scanLabel: "Scan to visit Google Play",
      description: "Questflow on the Android devices you use every day.",
    }),
  });

  const questflowAppShowcase = Object.freeze([
    Object.freeze({
      title: "Signal Feed",
      image:
        "../assets/questflow-download/signal-feed-screen-placeholder.svg",
      alt: "Questflow Signal Feed mobile app screen placeholder",
      isPlaceholder: true,
    }),
    Object.freeze({
      title: "AI Broker",
      image:
        "../assets/questflow-download/ai-broker-screen-placeholder.svg",
      alt: "Questflow AI Broker mobile app screen placeholder",
      isPlaceholder: true,
    }),
    Object.freeze({
      title: "Watchlist",
      image:
        "../assets/questflow-download/watchlist-screen-placeholder.svg",
      alt: "Questflow Watchlist mobile app screen placeholder",
      isPlaceholder: true,
    }),
  ]);

  const body = document.body;
  const heroActions = document.querySelector(
    "[data-qf-download-hero-store-actions]"
  );
  const platformGrid = document.querySelector(
    "[data-qf-download-platform-grid]"
  );
  const heroShowcase = document.querySelector(
    "[data-qf-download-hero-showcase]"
  );
  const showcaseGrid = document.querySelector(
    "[data-qf-download-showcase-grid]"
  );
  const themeToggle = document.querySelector(
    "[data-qf-download-theme-toggle]"
  );
  const toast = document.querySelector("[data-qf-download-toast]");
  const header = document.querySelector("[data-qf-download-header]");
  let toastTimer = 0;

  const showToast = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.dataset.qfDownloadVisible = "true";
    toastTimer = window.setTimeout(() => {
      toast.dataset.qfDownloadVisible = "false";
    }, 2200);
  };

  const makeStoreButton = (platformKey) => {
    const platform = questflowDownloadConfig[platformKey];
    const link = document.createElement("a");

    link.className = "qf-download-store-button";
    link.dataset.qfDownloadPlatform = platformKey;
    link.href = platform.storeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Open ${platform.storeName} in a new tab`);
    link.innerHTML = `
      <img
        class="qf-download-store-badge"
        src="${platform.storeBadgeImage}"
        alt="${platform.storeBadgeAlt}"
      />
    `;
    return link;
  };

  const makeQrArea = (platformKey) => {
    const platform = questflowDownloadConfig[platformKey];
    const area = document.createElement("div");
    const imageShell = document.createElement("div");
    const image = document.createElement("img");
    const label = document.createElement("p");

    area.className = "qf-download-qr-area";
    area.dataset.qfDownloadQr = platformKey;
    area.dataset.qfDownloadQrValue = platform.qrValue;
    imageShell.className = "qf-download-qr-image-shell";
    image.src = platform.qrCodeImage;
    image.alt = `${platform.platformName} store QR code`;
    label.textContent = platform.scanLabel;
    imageShell.append(image);
    area.append(imageShell, label);
    return area;
  };

  const makePlatformCard = (platformKey) => {
    const platform = questflowDownloadConfig[platformKey];
    const article = document.createElement("article");
    const copy = document.createElement("div");
    const status = document.createElement("div");

    article.className = "qf-download-platform-card";
    article.dataset.qfDownloadPlatformCard = platformKey;
    copy.className = "qf-download-platform-card-copy";
    copy.innerHTML = `
      <div class="qf-download-platform-icon">
        <img
          src="${platform.platformIconImage}"
          alt=""
          aria-hidden="true"
        />
      </div>
      <h3>${platform.platformName}</h3>
      <p>${platform.description}</p>
    `;
    copy.append(makeStoreButton(platformKey));

    status.className = "qf-download-prototype-note";
    status.textContent =
      "Prototype link — the official Questflow listing will replace this destination.";
    copy.append(status);

    article.append(copy, makeQrArea(platformKey));
    return article;
  };

  const makeHeroPhone = (item) => {
    const phone = document.createElement("div");
    phone.className = "qf-download-phone";
    phone.innerHTML = `
      <div class="qf-download-phone-screen">
        <span class="qf-download-phone-notch" aria-hidden="true"></span>
        <img src="${item.image}" alt="${item.alt}" />
      </div>
    `;
    return phone;
  };

  const makeShowcaseItem = (item) => {
    const article = document.createElement("article");
    article.className = "qf-download-showcase-item";
    article.innerHTML = `
      <div class="qf-download-showcase-device">
        <div class="qf-download-phone-screen">
          <span class="qf-download-phone-notch" aria-hidden="true"></span>
          <img src="${item.image}" alt="${item.alt}" />
        </div>
      </div>
      <h3>${item.title}</h3>
      ${
        item.isPlaceholder
          ? '<span class="qf-download-showcase-label">Screen placeholder</span>'
          : ""
      }
    `;
    return article;
  };

  const renderConfiguredContent = () => {
    ["ios", "android"].forEach((platformKey) => {
      heroActions.append(makeStoreButton(platformKey));
      platformGrid.append(makePlatformCard(platformKey));
    });

    questflowAppShowcase.forEach((item) => {
      heroShowcase.append(makeHeroPhone(item));
      showcaseGrid.append(makeShowcaseItem(item));
    });
  };

  const applyTheme = (theme) => {
    const dark = theme === "dark";
    body.dataset.qfDownloadTheme = theme;
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode"
    );

    try {
      localStorage.setItem("qf-download-theme", theme);
    } catch {
      // The prototype remains functional when browser storage is unavailable.
    }
  };

  const getInitialTheme = () => {
    try {
      const saved = localStorage.getItem("qf-download-theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch {
      // Fall through to the operating-system preference.
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  themeToggle.addEventListener("click", () => {
    const nextTheme =
      body.dataset.qfDownloadTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });

  document.querySelectorAll("[data-qf-download-launch-app]").forEach((button) => {
    button.addEventListener("click", () => {
      if (questflowDownloadConfig.launchAppUrl) {
        window.open(
          questflowDownloadConfig.launchAppUrl,
          "_blank",
          "noopener,noreferrer"
        );
        return;
      }

      showToast("Questflow web app link will be added before launch.");
    });
  });

  document
    .querySelectorAll("[data-qf-download-prototype-link]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        showToast("Prototype only — this destination is not connected.");
      });
    });

  document
    .querySelector("[data-qf-download-back-to-top]")
    .addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });

  window.addEventListener(
    "scroll",
    () => {
      header.dataset.qfDownloadScrolled = String(window.scrollY > 8);
    },
    { passive: true }
  );

  renderConfiguredContent();
  applyTheme(getInitialTheme());
})();
