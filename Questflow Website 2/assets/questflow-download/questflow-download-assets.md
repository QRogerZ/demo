# Questflow Download prototype assets

The prototype uses locally recreated SVG assets because no approved mobile app
screenshots, store URLs, or production QR codes were supplied.

Replace or add approved files in this directory, then update the two centralized
configuration objects in `scripts/questflow-download-prototype.js`:

- `questflowDownloadConfig` for App Store / Google Play URLs and QR images
- `questflowAppShowcase` for Signal Feed, AI Broker, and Watchlist screenshots

The current `*-screen-placeholder.svg` and `*-qr-placeholder.svg` files are
deliberately non-production placeholders and contain no real or fabricated
financial data. Replace them with approved release assets before launch.

No placeholder QR code points to a temporary or incorrect destination.
