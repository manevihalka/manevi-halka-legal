#!/usr/bin/env python3
"""Rehber paylasim gorselleri (5 Eki 2026).

Akis:
  1. node _gen/build-rehber.mjs --og        -> _gen/og-tmp/<id>-<dil>.html (1200x630 sahne)
  2. python3 -m http.server 7789            (depo kokunden; sayfalar /fonts, /img gibi kok yollari kullanir)
  3. python3 _gen/rehber-og.py              -> img/rehber/og/<id>-<dil>.jpg, sonra _gen/og-tmp silinir
  4. node _gen/build-rehber.mjs --tam       -> og:image artik bu dosyalari gosterir (dosya yoksa og-cover)

Chrome basliksiz, 2x olcekle ceker; Pillow 1200x630'a indirip JPEG yazar (WhatsApp/Facebook/X
onizlemesi bu boyutu bekler). Rehber metni ya da mini telefonlar degisirse yeniden calistir.
"""
import os, shutil, subprocess, sys, tempfile, time
from PIL import Image

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GIRDI = os.path.join(KOK, "_gen", "og-tmp")
CIKTI = os.path.join(KOK, "img", "rehber", "og")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TABAN = os.environ.get("OG_TABAN", "http://localhost:7789")

if not os.path.isdir(GIRDI):
    sys.exit("once: node _gen/build-rehber.mjs --og")
os.makedirs(CIKTI, exist_ok=True)
gecici = tempfile.mkdtemp()
adlar = sorted(f for f in os.listdir(GIRDI) if f.endswith(".html"))
for ad in adlar:
    png = os.path.join(gecici, ad.replace(".html", ".png"))
    url = f"{TABAN}/_gen/og-tmp/{ad}"
    # ⚠️ Chrome basliksiz modda goruntuyu yazdiktan sonra kapanmayabiliyor (guncelleyici); dosya
    # gelince sureci biz kapatiyoruz. --virtual-time-budget sayfadaki animasyonlarla hic bitmiyordu.
    pr = subprocess.Popen([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2",
                           "--window-size=1200,630", "--timeout=4000", f"--user-data-dir={gecici}/profil",
                           f"--screenshot={png}", url], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(60):
        if os.path.exists(png) and os.path.getsize(png) > 0 and pr.poll() is not None:
            break
        if os.path.exists(png) and os.path.getsize(png) > 0:
            time.sleep(1.0)
            break
        time.sleep(0.5)
    if pr.poll() is None:
        pr.kill()
    if not os.path.exists(png):
        sys.exit(f"{ad}: goruntu alinamadi")
    im = Image.open(png).convert("RGB")
    if im.size != (2400, 1260):
        sys.exit(f"{ad}: beklenmeyen boyut {im.size}")
    im = im.resize((1200, 630), Image.LANCZOS)
    hedef = os.path.join(CIKTI, ad.replace(".html", ".jpg"))
    im.save(hedef, "JPEG", quality=86, optimize=True, progressive=True)
    print(f"yazildi: img/rehber/og/{os.path.basename(hedef)} ({os.path.getsize(hedef) // 1024} KB)")
shutil.rmtree(gecici, ignore_errors=True)
shutil.rmtree(GIRDI, ignore_errors=True)
print(f"{len(adlar)} gorsel; _gen/og-tmp silindi")
