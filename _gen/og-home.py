#!/usr/bin/env python3
"""Ana sayfanin paylasim gorselleri: og-cover-<dil>.jpg (1200x630) ve og-cover.jpg (= tr).

Kaynak: _gen/og-home.html (?lang=). Sitenin butun sayfalari bu kapagi kullanir (_layouts/default.html,
uretici bas bilgileri). Chrome basliksiz, 2x olcekle ceker; Pillow 1200x630'a indirip JPEG yazar.
    1. python3 -m http.server 7789     (depo kokunden; sablon /fonts, /img kok yollarini kullanir)
    2. python3 _gen/og-home.py [http://127.0.0.1:7789]
"""
import os, subprocess, sys, tempfile
from PIL import Image

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TABAN = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:7789"
for dil in ["tr", "en", "de", "fr", "ar"]:
    with tempfile.TemporaryDirectory() as td:
        png = os.path.join(td, "og.png")
        subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", "--force-device-scale-factor=2", "--window-size=1200,630",
                        "--virtual-time-budget=6000", f"--user-data-dir={td}/p", f"--screenshot={png}",
                        f"{TABAN}/_gen/og-home.html?lang={dil}"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        im = Image.open(png).convert("RGB").resize((1200, 630), Image.LANCZOS)
        hedefler = [f"og-cover-{dil}.jpg"] + (["og-cover.jpg"] if dil == "tr" else [])
        for ad in hedefler:
            im.save(os.path.join(KOK, ad), "JPEG", quality=86, optimize=True, progressive=True)
            print("yazildi:", ad)
