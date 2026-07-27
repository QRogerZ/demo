(() => {
  "use strict";

  const questflowDownloadConfig = Object.freeze({
    webAppUrl: "https://app.questflow.ai/",
    launchAppUrl: "https://app.questflow.ai/",
    ios: Object.freeze({
      storeUrl: "https://apps.apple.com/",
      qrCodeImage: "../assets/questflow-download/qr/app-store-home-qr.png",
    }),
    android: Object.freeze({
      storeUrl: "https://play.google.com/store/apps",
      qrCodeImage: "../assets/questflow-download/qr/google-play-home-qr.png",
    }),
    links: Object.freeze({
      app: "https://next.questflow.ai?utm_source=website&utm_medium=navBar&utm_campaign=app",
      feedback: "https://feedback.questflow.ai?utm_source=website&utm_medium=navBar&utm_campaign=feedback",
      features: "https://feedback.questflow.ai/roadmap?utm_source=website&utm_medium=navBar&utm_campaign=roadmap",
      agents: "https://feedback.questflow.ai/changelog?utm_source=website&utm_medium=navBar&utm_campaign=changelog",
      developer: "https://questflow.ai/qdp/?utm_source=website&utm_medium=navBar&utm_campaign=questflow",
      a2a: "https://a2a.build/?utm_source=website&utm_medium=navBar&utm_campaign=a2a",
      customers: "https://questflow.ai/customers/?utm_source=website&utm_medium=navBar&utm_campaign=customers",
      gdp: "https://next.questflow.ai/gdp?utm_source=website&utm_medium=navBar&utm_campaign=gdp",
      vision: "https://questflow.ai/vision/?utm_source=website&utm_medium=navBar&utm_campaign=vision",
      benchmark: "https://next.questflow.ai/benchmark?utm_source=website&utm_medium=navBar&utm_campaign=benchmark",
      pricing: "https://questflow.ai/pricing/?utm_source=website&utm_medium=navBar&utm_campaign=pricing",
      mediaKit: "https://drive.google.com/drive/folders/1ZJ-JO6vxv4dp9R6y1Y_4Etr0B5lBXpFS",
      news: "https://blog.questflow.ai?utm_source=website&utm_medium=navBar&utm_campaign=news",
      privacy: "https://docs.questflow.ai/privacy-policy",
      terms: "https://docs.questflow.ai/terms-of-use",
      cookies: "https://docs.questflow.ai/cookie-notice-and-policy",
      creator: "https://docs.questflow.ai/creator-content-purchase-agreement",
    }),
    socials: Object.freeze([
      Object.freeze({ name: "X", url: "https://x.com/questflow", icon: "../assets/questflow-download/social/x-logo.svg" }),
      Object.freeze({ name: "Telegram", url: "https://t.me/+8Hh5JNE4i-w1ZDI1", icon: "../assets/questflow-download/social/telegram-logo.svg" }),
      Object.freeze({ name: "LinkedIn", url: "https://www.linkedin.com/company/questflow/", icon: "../assets/questflow-download/social/linkedin-logo.svg" }),
      Object.freeze({ name: "Discord", url: "https://discord.com/invite/ZJEBVRfcWp", icon: "../assets/questflow-download/social/discord-logo.svg" }),
      Object.freeze({ name: "Instagram", url: "https://www.instagram.com/questflowofficial", icon: "../assets/questflow-download/social/instagram-logo.svg" }),
      Object.freeze({ name: "YouTube", url: "https://www.youtube.com/@QuestflowLabs", icon: "../assets/questflow-download/social/youtube-logo.svg" }),
      Object.freeze({ name: "TikTok", url: "https://www.tiktok.com/@questflowlab", icon: "../assets/questflow-download/social/tiktok-logo.svg" }),
      Object.freeze({ name: "Product Hunt", url: "https://www.producthunt.com/products/questflow-2", icon: "../assets/questflow-download/social/producthunt-logo.svg" }),
      Object.freeze({ name: "Blog", url: "https://blog.questflow.ai", icon: "../assets/questflow-download/social/rss-logo.svg" }),
    ]),
  });

  const body = document.body;
  const menu = document.querySelector("[data-qf-download-mobile-menu]");
  const menuToggle = document.querySelector("[data-qf-download-menu-toggle]");
  const menuScrim = document.querySelector("[data-qf-download-menu-scrim]");
  const dialog = document.querySelector("[data-qf-download-platform-dialog]");
  const toast = document.querySelector("[data-qf-download-toast]");
  let toastTimer = 0;

  const openUrl = (url, sameTab = false) => {
    if (sameTab) {
      window.location.assign(url);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const showToast = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.dataset.qfDownloadVisible = "true";
    toastTimer = window.setTimeout(() => {
      toast.dataset.qfDownloadVisible = "false";
    }, 2200);
  };

  const setTheme = (theme) => {
    const isDark = theme === "dark";
    body.dataset.qfDownloadTheme = theme;
    document.querySelectorAll("[data-qf-download-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    });
    try {
      localStorage.setItem("qf-download-theme", theme);
    } catch {
      // Theme still works when storage is unavailable.
    }
  };

  const getInitialTheme = () => {
    try {
      const savedTheme = localStorage.getItem("qf-download-theme");
      if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    } catch {
      // Use the system preference below.
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const setMenuState = (isOpen) => {
    menu.hidden = !isOpen;
    menuScrim.hidden = !isOpen;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    body.classList.toggle("qf-download-menu-open", isOpen);
  };

  const detectMobilePlatform = () => {
    const userAgent = navigator.userAgent || "";
    const platform = navigator.platform || "";
    const touchPoints = navigator.maxTouchPoints || 0;
    if (/android/i.test(userAgent)) return "android";
    if (/iPad|iPhone|iPod/i.test(userAgent) || (platform === "MacIntel" && touchPoints > 1)) return "ios";
    return "unknown";
  };

  const renderSocials = () => {
    document.querySelectorAll("[data-qf-download-socials]").forEach((container) => {
      questflowDownloadConfig.socials.forEach((social) => {
        const link = document.createElement("a");
        link.href = social.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("aria-label", `Questflow on ${social.name}`);
        link.title = social.name;
        link.innerHTML = `<img src="${social.icon}" alt="" />`;
        container.append(link);
      });
    });
  };

  document.querySelector('[data-qf-download-qr="ios"]').src = questflowDownloadConfig.ios.qrCodeImage;
  document.querySelector('[data-qf-download-qr="android"]').src = questflowDownloadConfig.android.qrCodeImage;

  const webAppLink = document.querySelector("[data-qf-download-web-app]");
  webAppLink.href = questflowDownloadConfig.webAppUrl;
  webAppLink.target = "_blank";
  webAppLink.rel = "noopener noreferrer";

  document.querySelectorAll("[data-qf-download-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      setTheme(body.dataset.qfDownloadTheme === "dark" ? "light" : "dark");
    });
  });

  document.querySelectorAll("[data-qf-download-launch-app]").forEach((button) => {
    button.addEventListener("click", () => openUrl(questflowDownloadConfig.launchAppUrl));
  });

  document.querySelectorAll("[data-qf-download-link]").forEach((element) => {
    const url = questflowDownloadConfig.links[element.dataset.qfDownloadLink];
    if (element.tagName === "A") {
      element.href = url;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    } else {
      element.addEventListener("click", () => openUrl(url));
    }
  });

  document.querySelectorAll("[data-qf-download-prototype-link]").forEach((button) => {
    button.addEventListener("click", () => showToast("This destination is represented as a prototype."));
  });

  menuToggle.addEventListener("click", () => {
    setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
  });
  menuScrim.addEventListener("click", () => setMenuState(false));
  document.addEventListener("click", (event) => {
    if (
      menuToggle.getAttribute("aria-expanded") === "true" &&
      !menu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMenuState(false);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuState(false);
      menuToggle.focus();
    }
  });
  window.matchMedia("(min-width: 768px)").addEventListener("change", (event) => {
    if (event.matches) setMenuState(false);
  });

  document.querySelector("[data-qf-download-mobile-action]").addEventListener("click", () => {
    const platform = detectMobilePlatform();
    if (platform === "ios" || platform === "android") {
      openUrl(questflowDownloadConfig[platform].storeUrl, true);
      return;
    }
    dialog.showModal();
  });

  document.querySelectorAll("[data-qf-download-store-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      openUrl(questflowDownloadConfig[button.dataset.qfDownloadStoreChoice].storeUrl, true);
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelectorAll("[data-qf-download-back-to-top]").forEach((button) => {
    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
  });

  renderSocials();
  setTheme(getInitialTheme());
})();
