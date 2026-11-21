#!/usr/bin/env python3
"""Kirpintinin telefon goruntusundeki yerini olcer -> _gen/fx-src.json.

Ana sayfadaki "ekrandan kalkan yakin plan" hareketi, ekranda karsiligi olan
kirpintiyi tam o yerden kaldirir. Yer, kirpinti telefon goruntusunde
aranarak bulunur (gri tonda, olcekli sablon esleme). Karsiligi ekranda olmayan
kirpinti (widget, gorev karti, meal) listeye girmez; sayfa onlari telefondan acar.

Kirpinti ya da ekran goruntusu degisirse yeniden calistir:
    python3 _gen/fx-src.py && node _gen/build-home.mjs
Gereken: Pillow + numpy.
"""
import json, os, sys
import numpy as np
from PIL import Image

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DILLER = ["tr", "en", "de", "fr", "ar"]
# kirpinti -> ait oldugu ekran (build-home.mjs fxParcalari ile ayni gruplar)
# fx-h2-tur (dagitim ekranindan) BILEREK yok: halka ekraninda karsiligi yok, uye satirlarina
# yanlis eslesiyordu (mse ~440, esigin hemen alti). Telefonun ortasindan acilir.
# 21 Kas 2026: Kur'an, Namaz ve Halka satirlari 2.1.0 ekranlarina gecti (s21-*, kaynak gallery-2026-11 raw).
EKRAN = {"fx-q2-panel": "s21-quran", "fx-q2-bar": "s21-quran",
         "fx-w-med": "s21-namaz", "fx-w-lock": "s21-namaz", "fx-w-small": "s21-namaz", "fx-n-kaza": "s21-namaz",
         "fx-h2-next": "s21-halka", "fx-a-today": "amel", "fx-a-hadis": "amel"}
ESIK = 450          # kabul edilen en buyuk ortalama kare hata (0-255 gri, 1/4 olcek)
OLCEK = np.arange(0.66, 0.96, 0.02)  # kirpinti genisliginin telefon goruntusune orani

def gri(im): return np.asarray(im.convert("L"), dtype=np.float32)

def duz(yol):
    im = Image.open(yol).convert("RGBA")
    zemin = Image.new("RGBA", im.size, (246, 249, 247, 255)); zemin.alpha_composite(im)
    return zemin.convert("RGB")

def ara(tel, krp):
    PW, PH = tel.size
    best = (1e18, None)
    t4 = gri(tel.resize((PW // 4, PH // 4)))
    for sc in OLCEK:
        w, h = int(krp.width * sc / 4), int(krp.height * sc / 4)
        if w < 8 or h < 4 or w > t4.shape[1] or h > t4.shape[0]: continue
        k = gri(krp.resize((w, h)))
        for y in range(0, t4.shape[0] - h, 2):
            for x in range(0, t4.shape[1] - w, 2):
                d = float(np.mean((t4[y:y + h, x:x + w] - k) ** 2))
                if d < best[0]: best = (d, (sc, x * 4, y * 4))
    if best[1] is None: return None
    d0, (sc0, x0, y0) = best
    # ince ayar: 1/2 olcekte, bulunan yerin cevresinde
    t2 = gri(tel.resize((PW // 2, PH // 2)))
    ince = (1e18, None)
    for sc in np.arange(sc0 - 0.02, sc0 + 0.021, 0.004):
        w, h = int(krp.width * sc / 2), int(krp.height * sc / 2)
        k = gri(krp.resize((w, h)))
        for y in range(max(0, y0 // 2 - 6), min(t2.shape[0] - h, y0 // 2 + 7)):
            for x in range(max(0, x0 // 2 - 6), min(t2.shape[1] - w, x0 // 2 + 7)):
                d = float(np.mean((t2[y:y + h, x:x + w] - k) ** 2))
                if d < ince[0]: ince = (d, (x * 2, y * 2, w * 2, h * 2))
    x, y, w, h = ince[1]
    return d0, [round(x / PW * 100, 2), round(y / PH * 100, 2), round(w / PW * 100, 2), round(h / PH * 100, 2)]

sonuc = {}
for dil in DILLER:
    sonuc[dil] = {}
    klasor = os.path.join(KOK, "img", "app", dil)
    for ad, ekran in EKRAN.items():
        yol = os.path.join(klasor, ad + ".webp")
        if not os.path.exists(yol): continue
        tel = Image.open(os.path.join(klasor, ekran + ".webp")).convert("RGB")
        r = ara(tel, duz(yol))
        durum = "yok"
        if r and r[0] <= ESIK:
            sonuc[dil][ad + ".webp"] = r[1]; durum = "var"
        print(f"{dil} {ad:11s} mse={r[0] if r else -1:8.0f} {durum}", file=sys.stderr)

with open(os.path.join(KOK, "_gen", "fx-src.json"), "w") as f:
    json.dump(sonuc, f, indent=1, ensure_ascii=False, sort_keys=True)
    f.write("\n")
