# Questflow Download prototype asset sources

Last reviewed: **2026-07-27**

All images and icons used by the page are stored locally under
`assets/questflow-download/`. The page does not hotlink runtime images.

## Questflow brand

- Local file: `assets/questflow-download/brand/questflow-logo.svg`
- Official page: `https://questflow.ai/`
- Official asset: `https://questflow.ai/redesign/questflow-logo.svg`
- Use: Web/H5 headers and footers, plus the app concept UI
- Modification: None

## Apple and App Store

- Local files:
  - `assets/questflow-download/stores/apple-logo.svg`
  - `assets/questflow-download/stores/app-store-badge.svg`
- Apple sources:
  - `https://www.apple.com/`
  - `https://developer.apple.com/app-store/marketing/guidelines/`
  - `https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg`
- Use: iOS QR label and platform chooser
- Modification: The official Apple navigation mark was normalized to a
  standalone SVG canvas without changing its path geometry or aspect ratio.

## Google Play

- Local files:
  - `assets/questflow-download/stores/google-play-logo.png`
  - `assets/questflow-download/stores/google-play-badge.png`
- Google sources:
  - `https://play.google.com/store/apps`
  - `https://partnermarketinghub.withgoogle.com/brands/google-play/visual-identity/badge-guidelines/`
  - `https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png`
  - `https://www.gstatic.com/android/market_images/web/favicon_v3.ico`
- Use: Android QR label and platform chooser
- Modification: The official Play favicon was converted from ICO to PNG; the
  artwork and proportions were not changed.

## Questflow social channels

The channel list and destinations were checked against the current Questflow
website footer.

- Official brand assets retained locally:
  - `social/x-logo.svg` from `https://about.x.com/en/who-we-are/brand-toolkit`
  - `social/telegram-logo.svg` from `https://telegram.org/`
  - `social/discord-logo.svg` from `https://discord.com/branding`
- Additional local brand marks:
  - `social/linkedin-logo.svg`
  - `social/instagram-logo.svg`
  - `social/youtube-logo.svg`
  - `social/tiktok-logo.svg`
  - `social/producthunt-logo.svg`
  - `social/rss-logo.svg`
- Additional icon source: Simple Icons v13,
  `https://github.com/simple-icons/simple-icons`
- Use: X, Telegram, LinkedIn, Discord, Instagram, YouTube, TikTok, Product Hunt,
  and Questflow Blog footer links
- Modification: None; CSS applies a uniform monochrome footer treatment.

## Functional UI icons

- Local files:
  - `ui/sun.svg`
  - `ui/moon.svg`
  - `ui/menu.svg`
  - `ui/close.svg`
  - `ui/arrow-up.svg`
  - `ui/download.svg`
  - `ui/external-link.svg`
  - `ui/check.svg`
- Source: Lucide, `https://github.com/lucide-icons/lucide`
- Modification: None

## QR codes

- Local files:
  - `qr/app-store-home-qr.png`
  - `qr/google-play-home-qr.png`
- Generator: Python `qrcode` 8.2, error correction M, 12-pixel modules, and a
  four-module quiet zone
- Format: 1-bit grayscale PNG; 396 x 396 and 444 x 444
- Runtime behavior: Static local images only; no external QR service
- Verification on 2026-07-27: Re-decoded from the saved PNG pixels using
  `jsQR` 1.4.0 and Sharp. Results:
  - App Store: `https://apps.apple.com/`
  - Google Play: `https://play.google.com/store/apps`

## App showcase

The phone frame and finance-agent preview are HTML/CSS prototype UI, not a
downloaded screenshot and not represented as an official App Store listing.
The older `*-screen-placeholder.svg` files remain in the project for provenance
but are no longer referenced by the page.
