
# Maklér AI – AI-Powered Financial Analytics Dashboard

An experimental financial analytics web application combining interactive market data visualization, technical indicators, risk assessment and AI-powered market insights.

Built with React, Vite, Tailwind CSS, Recharts, Netlify Functions and Groq API.

**[Visit Live Demo](https://makler-ai.netlify.app/)**

<img width="1638" height="979" alt="SCR-20261126-pswy" src="https://github.com/user-attachments/assets/2bc612d9-bbc4-4ec4-be61-caa1bc07c955" />


## Project Overview

Maklér AI is a Slovak-language fintech application developed to explore the combination of financial data, modern frontend technologies and artificial intelligence.

The application presents selected stock market assets through an interactive dashboard with charts, technical signals, risk scores and AI-generated commentary.

The project uses demonstration market data and is designed to support external market data API integration.

## Key Features

- Interactive financial analytics dashboard
- Stock market asset monitoring
- Historical price charts
- Technical indicator visualization
- Risk assessment and scoring
- AI-powered market commentary
- AI chat interface
- Serverless backend architecture
- Input validation and sanitization
- API rate limiting
- Demo data and AI response fallback
- Slovak-language user interface

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend development |
| JavaScript | Application logic and data processing |
| Vite | Development and build tooling |
| Tailwind CSS | Styling and user interface |
| Recharts | Financial charts and data visualization |
| Netlify Functions | Serverless backend and API endpoints |
| Groq API | AI analysis and conversational functionality |
| REST API | Frontend and backend communication |
| Netlify | Cloud deployment and hosting |
| Git & GitHub | Version control |

## Monitored Assets

| Company | Ticker |
|---|---|
| Reddit | RDDT |
| Booking Holdings | BKNG |
| Duolingo | DUOL |
| Nebius Group | NBIS |
| Comcast | CMCSA |
| Circle Internet Group | CRCL |

## Application Architecture

The application is deployed entirely on Netlify.

- React and Vite frontend
- Serverless backend using Netlify Functions
- Groq API integration through backend functions
- Environment variables for sensitive credentials
- Relative API endpoints for frontend communication
- Demonstration data fallback when external services are unavailable

No separate Express server or external backend hosting is required.

## Project Structure

```text
makler-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── data/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
├── netlify/
│   └── functions/
│       ├── health.js
│       ├── assets.js
│       ├── asset-detail.js
│       ├── asset-history.js
│       ├── ai-analyze.js
│       ├── ai-chat.js
│       └── utils/
│           ├── allowedAssets.js
│           ├── demoData.js
│           ├── groqService.js
│           └── security.js
├── netlify.toml
├── README.md
└── .gitignore
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/.netlify/functions/health` | Service health check |
| GET | `/.netlify/functions/assets` | Available market assets |
| GET | `/.netlify/functions/asset-detail` | Asset details |
| GET | `/.netlify/functions/asset-history` | Historical market data |
| POST | `/.netlify/functions/ai-analyze` | AI-powered asset analysis |
| POST | `/.netlify/functions/ai-chat` | Conversational AI interface |

The API restricts asset requests to the supported stock tickers.

## Security & Configuration

The application incorporates the following security measures:

- Server-side API key management
- Environment variable configuration
- Restricted asset ticker validation
- Request parameter validation
- AI input length restrictions
- Input sanitization
- Safe error responses
- Rate limiting within warm function instances

API credentials must never be exposed in frontend code or committed to the repository.

## Local Development

Clone the repository:

```bash
git clone https://github.com/deboker/makler-ai.git
cd makler-ai
```

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

Start the application using Netlify CLI:

```bash
npx netlify-cli dev
```

The local application is typically available at:

```text
http://localhost:8888
```

Create a production build:

```bash
cd frontend
npm run build
```

## Environment Variables

Configure the following variables securely through Netlify Environment Variables or an appropriate local development environment.

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=your_groq_model_here
MARKET_DATA_API_KEY=your_market_data_api_key_here
NODE_ENV=production
```

The application supports demonstration data and AI response fallbacks when the required API credentials are unavailable.

## Netlify Deployment

| Setting | Value |
|---|---|
| Base directory | Repository root |
| Build command | `npm install --prefix frontend --include=dev && npm run build --prefix frontend` |
| Publish directory | `frontend/dist` |
| Functions directory | `netlify/functions` |

Deployment configuration is included in `netlify.toml`.

## Development Focus

- Modern React application development
- Component-based frontend architecture
- Financial data visualization
- AI and external API integration
- Serverless backend development
- Secure credential management
- Input validation
- Cloud deployment

## Project Status

Experimental fintech and AI application developed for technical exploration, educational purposes and portfolio presentation.

The project demonstrates financial analytics interfaces and AI integration using demonstration market data.

## Disclaimer

Maklér AI is intended for educational and informational purposes only.

The application does not provide financial or investment advice. Demonstration data, technical signals and AI-generated commentary should not be used as the basis for investment decisions.

## Developer

**Andrej Andrasik**

Frontend Developer | React | Next.js | JavaScript | WordPress | AI Integrations

- [Portfolio](https://portfolio-andrey-new.netlify.app/)
- [GitHub](https://github.com/deboker)
- [Live Demo](https://makler-ai.netlify.app/)
