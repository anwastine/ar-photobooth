# AR Photobooth

Two static pages, deployed on Vercel:

| Link | What it does |
|---|---|
| `/` | **Photobooth** – camera, countdown, click picture → submit → 4×6 in print card with the blue‑and‑gold banner under the photo, QR code to the AR viewer, **Print** / Download. |
| `/ar` | **AR viewer** – opens the phone camera; when it sees the printed banner the ship sails, birds fly, the graduation cap gets tossed, the compass rose spins, the lighthouse beam sweeps, gold dots travel the dotted paths, sparkles on the waves. `/ar?preview=1` shows the animation without a camera. |

## How it works
* `assets/overlay.jpg` – the banner. It is both the print overlay **and** the AR image target.
* `assets/*.png` – cut‑outs of the animated elements (ship, compass, rose, cap, birds), made by `tools/extract.py` in the build session.
* `targets/overlay.mind` – MindAR feature file compiled from the banner (`tools/compile.html`).
* `index.html` – photobooth (vanilla JS, canvas composition, `qrcode-generator` from cdnjs).
* `ar.html` – MindAR image tracking + A‑Frame; every animation is a small A‑Frame component.

## Booth settings
Gear icon on the photobooth page: event title, subtitle, countdown, photo shape, AR link for the QR, date, mirror, QR on/off. Saved in the browser (localStorage) of the booth machine.

## Changing the banner
1. Replace `assets/overlay.jpg` (keep it ~3:1).
2. Re‑cut the layers (`tools/extract.py`, adjust boxes) and update `LAYERS` / `LAMP` / `PATHS` in `ar.html`.
3. Recompile the target: run `node tools/dev-server.js`, open `http://localhost:8803/tools/compile.html?post=1`.

## Local dev
```bash
node tools/dev-server.js   # http://localhost:8803
```
Camera pages need HTTPS or localhost.
