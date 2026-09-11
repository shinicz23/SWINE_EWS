# Swine Farm Profitability Predictor — Installable App (PWA)

Streamlit mismo ay hindi puwedeng maging installable app nang direkta (technical
limitation ng framework — hindi puwedeng i-edit ang `<head>` ng page). Ang
paraan dito: gumawa tayo ng maliit na **wrapper/shell** na naka-embed sa
Streamlit dashboard mo (`streamlit_app.py`) sa loob ng iframe. Itong shell ang
mai-i-install bilang app na may sariling icon — pero yung dashboard mo mismo,
hindi ginalaw, gumagana pa rin nang normal sa loob.

## Mga laman ng package

- `index.html` — ang shell/wrapper na naglo-load ng Streamlit app mo
- `manifest.json` — pangalan, kulay, at icons ng app
- `sw.js` — service worker (kailangan para "installable" sa Chrome/Edge/Android)
- `icons/` — mga app icon (192px, 512px, maskable, at apple-touch-icon), tema:
  snout + farm rows sa soil-to-sage gradient (kapareho ng palette ng dashboard mo)

## Hakbang 1 — I-deploy muna ang Streamlit app mo (kailangan ng public HTTPS URL)

Kailangan ng totoong internet address (hindi `localhost`) para mag-work ang
"Install" prompt sa phone. Pinakamadaling paraan:

1. I-upload ang `streamlit_app.py`, `predictor_engine.py`, `forecast_engine.py`,
   at lahat ng ibang `.py`/`.pkl` files mo sa isang GitHub repo.
2. Pumunta sa **share.streamlit.io** (Streamlit Community Cloud), i-connect ang
   repo mo, tapos i-deploy — libre ito.
3. Makakakuha ka ng URL na hal. `https://swine-farm-predictor-yourname.streamlit.app`

(Kung gusto mo ng ibang host — Render, Railway, atbp — okay din, basta may
HTTPS URL.)

## Hakbang 2 — I-configure ang shell

Buksan ang `index.html`, hanapin ang linyang ito malapit sa taas:

```js
const STREAMLIT_APP_URL = "https://YOUR-APP-NAME.streamlit.app/?embed=true";
```

Palitan ng totoong URL ng na-deploy mong app (panatilihin ang `?embed=true` —
tinatanggal nito ang Streamlit header/footer para mas parang totoong app).

## Hakbang 3 — I-deploy ang shell (ibang lugar, simpleng static host)

Puwede mong i-host ang buong `swine_farm_pwa` folder sa:

- **GitHub Pages** (libre) — i-push sa isang repo, i-enable ang Pages sa settings
- **Netlify** / **Vercel** (libre) — i-drag-and-drop lang ang folder
- Kahit anong static file host, basta HTTPS

## Hakbang 4 — I-install sa phone/desktop

1. Buksan ang URL ng shell (hindi yung Streamlit URL, yung shell URL) sa
   Chrome (Android) o Safari (iOS) o Chrome/Edge (desktop).
2. **Android/Chrome/Edge:** lalabas ang "Install app" prompt, o pindutin ang
   ⋮ menu → "Install app" / "Add to Home screen".
3. **iOS/Safari:** pindutin ang Share button → "Add to Home Screen".
4. May lalabas na app icon (🐖 na snout/farm-rows icon) — pag binuksan,
   standalone na itong bubukas, walang browser address bar, parang totoong app.

## Mahalagang paalala

- Kailangan pa rin ng internet connection ang dashboard mismo (nagpe-predict
  at nagfe-forecast ito gamit ang mga trained model) — ang "offline" part dito
  ay yung shell/icon lang na gumagana kaagad, may babala kung walang connection.
- Kung nag-iiba ang URL ng deployed Streamlit app mo, kailangan mo ulit i-edit
  ang `index.html` (yung `STREAMLIT_APP_URL`) at i-re-deploy ang shell.
