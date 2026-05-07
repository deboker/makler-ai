# Maklér AI

Maklér AI je moderná fintech web aplikácia v slovenčine, ktorá sleduje šesť vybraných brokerských a burzových aktív. Zobrazuje demo trhové dáta, grafy, technické signály, rizikové skóre a AI komentáre. Aplikácia je pripravená na napojenie reálneho market data API a Groq API cez Netlify Functions.

Maklér AI slúži iba na analytické a vzdelávacie účely. Nejde o finančné ani investičné poradenstvo. Pred akýmkoľvek investičným rozhodnutím si overte informácie a zvážte konzultáciu s licencovaným odborníkom.

## Tech stack

- React
- Vite
- Tailwind CSS
- Recharts
- Netlify
- Netlify Functions
- Groq API

## Deployment architektúra

Celá aplikácia je nasadená na Netlify:

- Frontend je React + Vite v priečinku `frontend/`.
- API logika je v `netlify/functions/`.
- Nepoužíva sa Render.
- Nepoužíva sa samostatný Express server.
- Citlivé kľúče sú iba v Netlify Environment Variables.
- `GROQ_API_KEY` a `MARKET_DATA_API_KEY` nie sú vo frontend kóde.

Frontend volá API priamo cez relatívne Netlify Functions endpointy `/.netlify/functions/*`. Súbor `netlify.toml` ponecháva aj kompatibilné `/api/*` redirecty.

## Sledované aktíva

- Reddit — RDDT
- Booking Holdings — BKNG
- Duolingo — DUOL
- Nebius Group N.V. — NBIS
- Comcast — CMCSA
- Circle Internet Group — CRCL

## Štruktúra projektu

```txt
makler-ai/
  frontend/
    src/
      components/
      pages/
      services/
      hooks/
      utils/
      data/
      App.jsx
      main.jsx
      index.css
    package.json
    vite.config.js
    tailwind.config.js
    postcss.config.js
    .env.example
  netlify/
    functions/
      health.js
      assets.js
      asset-detail.js
      asset-history.js
      ai-analyze.js
      ai-chat.js
      utils/
        allowedAssets.js
        demoData.js
        groqService.js
        security.js
  netlify.toml
  README.md
  .gitignore
```

## Lokálne spustenie

Odporúčaný lokálny režim je cez Netlify CLI, aby fungovali aj Netlify Functions.

```bash
cd frontend
npm install
cd ..
npx netlify-cli dev
```

Aplikácia bude dostupná cez lokálnu Netlify Dev adresu, typicky:

```txt
http://localhost:8888
```

Produkčný build frontendu:

```bash
cd frontend
npm run build
```

## Environment premenné

Frontend nepotrebuje žiadnu API URL, ak beží na Netlify. API sa volá cez relatívne `/.netlify/functions/*`.

Citlivé premenné nastavte iba v Netlify:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
MARKET_DATA_API_KEY=your_market_data_api_key_here
NODE_ENV=production
```

Ak `GROQ_API_KEY` alebo `MARKET_DATA_API_KEY` nie sú nastavené, aplikácia používa demo dáta a demo AI odpovede.

## API endpointy

Primárne endpointy sú riešené priamo cez Netlify Functions:

- `GET /.netlify/functions/health`
- `GET /.netlify/functions/assets`
- `GET /.netlify/functions/asset-detail?ticker=RDDT`
- `GET /.netlify/functions/asset-history?ticker=RDDT&range=1m`
- `POST /.netlify/functions/ai-analyze`
- `POST /.netlify/functions/ai-chat`

API povoľuje iba tickery `RDDT`, `BKNG`, `DUOL`, `NBIS`, `CMCSA`, `CRCL`.

## Bezpečnostné poznámky

- `.env` súbory sa necommitujú.
- API kľúče patria iba do Netlify Environment Variables.
- `GROQ_API_KEY` a `MARKET_DATA_API_KEY` nikdy nepatria do frontendu.
- Netlify Function validuje ticker a range parametre.
- AI otázky majú obmedzenú dĺžku a sú sanitizované.
- API vracia bezpečné chybové správy bez stack trace.
- Funkcia neloguje citlivé údaje.
- Rate limiting je implementovaný v Netlify Function pre warm runtime.

## Deploy na Netlify

Nastavenia Netlify:

- Base directory: nechajte prázdne, build beží z koreňa repozitára
- Build command: `npm install --prefix frontend && npm run build --prefix frontend`
- Publish directory: `frontend/dist`
- Functions directory: `netlify/functions`

Konfigurácia je pripravená v `netlify.toml`.

Netlify Environment Variables:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
MARKET_DATA_API_KEY=your_market_data_api_key_here
NODE_ENV=production
```

## GitHub

Repozitár:

```txt
https://github.com/deboker/makler-ai.git
```

Príprava a push:

```bash
git init
git remote add origin https://github.com/deboker/makler-ai.git
git add .
git commit -m "Initial Makler AI Netlify app"
git branch -M main
git push -u origin main
```

## Disclaimer

Maklér AI slúži iba na analytické a vzdelávacie účely. Nejde o finančné ani investičné poradenstvo. Pred akýmkoľvek investičným rozhodnutím si overte informácie a zvážte konzultáciu s licencovaným odborníkom.
