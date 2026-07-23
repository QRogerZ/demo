"""Generate and decode-check the Questflow Download prototype QR assets."""

from pathlib import Path

import qrcode
import zxingcpp
from PIL import Image


PROJECT_ROOT = Path(__file__).resolve().parents[1]
QR_DIRECTORY = PROJECT_ROOT / "assets" / "questflow-download" / "qr"
QR_TARGETS = {
    "app-store-home-qr.png": "https://apps.apple.com/",
    "google-play-home-qr.png": "https://play.google.com/store/apps",
}


def generate_qr(destination: str, output_path: Path) -> None:
    qr = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=12,
        border=4,
    )
    qr.add_data(destination)
    qr.make(fit=True)
    qr.make_image(fill_color="black", back_color="white").save(output_path)


def decode_qr(image_path: Path) -> str:
    result = zxingcpp.read_barcode(Image.open(image_path))
    if result is None:
        raise RuntimeError(f"Could not decode {image_path}")
    return result.text


def main() -> None:
    QR_DIRECTORY.mkdir(parents=True, exist_ok=True)
    for filename, destination in QR_TARGETS.items():
        output_path = QR_DIRECTORY / filename
        generate_qr(destination, output_path)
        decoded = decode_qr(output_path)
        if decoded != destination:
            raise RuntimeError(
                f"{filename} decoded as {decoded!r}, expected {destination!r}"
            )
        print(f"PASS {filename}: {decoded}")


if __name__ == "__main__":
    main()
