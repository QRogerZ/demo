# Questflow Download prototype asset sources

Downloaded or extracted on: **2026-07-23**

All page assets listed below are stored locally. The prototype does not hotlink
any image at runtime.

## Questflow logo

- Local file: `assets/questflow-download/brand/questflow-logo.svg`
- Source page: `https://questflow.ai/`
- Original asset: `https://questflow.ai/redesign/questflow-logo.svg`
- Usage: Header and footer
- Format: SVG
- Modification: None

## App Store badge

- Local file: `assets/questflow-download/stores/app-store-badge.svg`
- Source page: `https://developer.apple.com/app-store/marketing/guidelines/`
- Original asset: `https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg`
- Usage: iOS store links
- Format: SVG
- Modification: None

## Apple logo

- Local file: `assets/questflow-download/stores/apple-logo.svg`
- Source page: `https://www.apple.com/`
- Original asset: Inline Apple logo SVG in the official global navigation
- Usage: iOS platform card
- Format: SVG
- Modification: The official path geometry was copied verbatim into a
  standalone SVG; its vertical origin was normalized to remove the navigation
  sprite's empty canvas. The shape and aspect ratio were not changed.

## Google Play badge

- Local file: `assets/questflow-download/stores/google-play-badge.png`
- Source page: `https://partnermarketinghub.withgoogle.com/brands/google-play/visual-identity/badge-guidelines/`
- Original asset: `https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png`
- Usage: Android store links
- Format: PNG, 646 × 250
- Modification: None

## Google Play logo

- Local file: `assets/questflow-download/stores/google-play-logo.png`
- Source page: `https://play.google.com/store/apps`
- Original asset: `https://www.gstatic.com/android/market_images/web/favicon_v3.ico`
- Usage: Android platform card
- Format: PNG, 32 × 32
- Modification: Converted from the official ICO container to PNG with macOS
  Image Processing System (`sips`); no artwork, color, or proportion changes

## X logo

- Local file: `assets/questflow-download/social/x-logo.svg`
- Source page: `https://about.x.com/en/who-we-are/brand-toolkit`
- Original asset archive: `https://about.x.com/content/dam/about-twitter/x/brand-toolkit/x-logo.zip`
- Usage: Footer social link prototype
- Format: SVG
- Modification: Extracted from the official archive; no artwork changes

## Discord logo

- Local file: `assets/questflow-download/social/discord-logo.svg`
- Source page: `https://discord.com/branding`
- Original asset: `https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6762812affa5eaf1bedc0c42_Symbol.svg`
- Usage: Footer social link prototype
- Format: SVG
- Modification: None

## Telegram logo

- Local file: `assets/questflow-download/social/telegram-logo.svg`
- Source page: `https://telegram.org/tour/screenshots`
- Original asset archive: `https://telegram.org/file/464001088/1/bI7AJLo7oX4.287931.zip/374fe3b0a59dc60005`
- Usage: Footer social link prototype
- Format: SVG
- Modification: Extracted from the official archive; no artwork changes

## Functional UI icons

- Local files:
  - `assets/questflow-download/ui/sun.svg`
  - `assets/questflow-download/ui/moon.svg`
  - `assets/questflow-download/ui/arrow-up.svg`
- Source page: `https://github.com/lucide-icons/lucide`
- Original assets:
  - `https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sun.svg`
  - `https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/moon.svg`
  - `https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/arrow-up.svg`
- Usage: Theme toggle and back-to-top control
- Format: SVG
- Modification: None

## QR codes

- Local files:
  - `assets/questflow-download/qr/app-store-home-qr.png`
  - `assets/questflow-download/qr/google-play-home-qr.png`
- Generator: Python `qrcode` 8.2, error correction M, 12-pixel
  modules, four-module quiet zone
- Destinations:
  - App Store: `https://apps.apple.com/`
  - Google Play: `https://play.google.com/store/apps`
- Format: 1-bit grayscale PNG (396 × 396 and 444 × 444)
- Modification: Generated locally; no post-processing, stretching, logo
  overlay, gradient, or shadow
- Verification: Re-decoded locally with `zxing-cpp` 3.1.0. Both decoded
  values exactly matched their configured destinations.

## Prototype app-screen artwork

The three `*-screen-placeholder.svg` files are locally authored interface
mockups retained from the existing prototype. They are visibly labeled as
screen placeholders and are not presented as official mobile-product
screenshots or brand icons.
