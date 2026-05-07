const { isAllowedTicker } = require("./allowedAssets");

const baseAssets = [
  {
    ticker: "RDDT",
    name: "Reddit",
    sector: "Social media",
    price: 182.34,
    dailyChangePercent: 2.18,
    monthChangePercent: 11.4,
    yearChangePercent: 88.2,
    week52High: 230.12,
    week52Low: 54.45,
    marketCap: "31.6B USD",
    volume: "5.8M",
    averageVolume: "4.9M",
    sma20: 174.2,
    sma50: 161.7,
    rsi: 64,
    volatility: 7.6,
    riskScore: 7,
    aiComment: "Technicky silnejší obraz, no volatilita ostáva zvýšená."
  },
  {
    ticker: "BKNG",
    name: "Booking Holdings",
    sector: "Travel technology",
    price: 4778.9,
    dailyChangePercent: 0.62,
    monthChangePercent: 4.8,
    yearChangePercent: 23.5,
    week52High: 5128.4,
    week52Low: 3450.7,
    marketCap: "157.2B USD",
    volume: "281K",
    averageVolume: "307K",
    sma20: 4690.2,
    sma50: 4555.9,
    rsi: 58,
    volatility: 3.2,
    riskScore: 4,
    aiComment: "Stabilný rastový trend s miernejším rizikovým profilom."
  },
  {
    ticker: "DUOL",
    name: "Duolingo",
    sector: "Education technology",
    price: 392.11,
    dailyChangePercent: -1.34,
    monthChangePercent: 8.1,
    yearChangePercent: 44.7,
    week52High: 448.6,
    week52Low: 145.8,
    marketCap: "17.9B USD",
    volume: "714K",
    averageVolume: "830K",
    sma20: 398.5,
    sma50: 356.4,
    rsi: 61,
    volatility: 6.8,
    riskScore: 7,
    aiComment: "Rastový príbeh trvá, krátkodobo však pribúda opatrnosť."
  },
  {
    ticker: "NBIS",
    name: "Nebius Group N.V.",
    sector: "AI infrastructure",
    price: 33.84,
    dailyChangePercent: 4.92,
    monthChangePercent: 19.7,
    yearChangePercent: 71.3,
    week52High: 46.2,
    week52Low: 14.1,
    marketCap: "8.1B USD",
    volume: "8.4M",
    averageVolume: "6.7M",
    sma20: 31.2,
    sma50: 28.4,
    rsi: 74,
    volatility: 9.1,
    riskScore: 9,
    aiComment: "Silný momentum signál, ale RSI a volatilita upozorňujú na korekčné riziko."
  },
  {
    ticker: "CMCSA",
    name: "Comcast",
    sector: "Telecommunications",
    price: 39.27,
    dailyChangePercent: -0.28,
    monthChangePercent: -2.6,
    yearChangePercent: -9.2,
    week52High: 48.1,
    week52Low: 33.3,
    marketCap: "148.4B USD",
    volume: "15.1M",
    averageVolume: "18.3M",
    sma20: 39.9,
    sma50: 41.3,
    rsi: 42,
    volatility: 2.8,
    riskScore: 5,
    aiComment: "Defenzívnejší profil, no trend je zatiaľ skôr slabší."
  },
  {
    ticker: "CRCL",
    name: "Circle Internet Group",
    sector: "Digital assets infrastructure",
    price: 74.52,
    dailyChangePercent: -5.7,
    monthChangePercent: 26.5,
    yearChangePercent: 0,
    week52High: 96.4,
    week52Low: 51.9,
    marketCap: "16.7B USD",
    volume: "12.8M",
    averageVolume: "10.2M",
    sma20: 79.6,
    sma50: 68.8,
    rsi: 55,
    volatility: 11.4,
    riskScore: 10,
    aiComment: "Veľmi volatilné aktívum, kde je vhodné sledovať riziko rýchlych pohybov."
  }
];

const assets = baseAssets.map((asset) => ({
  ...asset,
  dataMode: "demo",
  trend: getTrend(asset),
  signal: getSignal(asset)
}));

const rangePoints = {
  "1d": 24,
  "5d": 30,
  "1m": 30,
  "6m": 72,
  "1y": 96,
  "5y": 120
};

const rangeDrift = {
  "1d": 0.01,
  "5d": 0.025,
  "1m": 0.07,
  "6m": 0.18,
  "1y": 0.32,
  "5y": 0.75
};

function getAssets() {
  return assets;
}

function getAsset(tickerInput) {
  const ticker = String(tickerInput || "").toUpperCase();
  if (!isAllowedTicker(ticker)) return null;
  return assets.find((asset) => asset.ticker === ticker) || null;
}

function createHistory(asset, range = "1m") {
  const points = rangePoints[range] || rangePoints["1m"];
  const drift = rangeDrift[range] || rangeDrift["1m"];
  const start = asset.price * (1 - Math.sign(asset.yearChangePercent || asset.monthChangePercent) * drift);
  const series = [];

  for (let i = 0; i < points; i += 1) {
    const progress = i / Math.max(points - 1, 1);
    const wave = Math.sin(i * 0.63 + asset.ticker.length) * asset.volatility * 0.004;
    const noise = Math.cos(i * 0.21 + asset.riskScore) * asset.volatility * 0.002;
    const value = start + (asset.price - start) * progress + asset.price * (wave + noise);
    series.push({
      date: labelForPoint(range, i, points),
      price: Number(Math.max(value, 0.1).toFixed(2))
    });
  }

  return series;
}

function getTrend(asset) {
  if (asset.price > asset.sma20 && asset.price > asset.sma50) return "rastuci";
  if (asset.price < asset.sma20 && asset.price < asset.sma50) return "klesajuci";
  return "neutralny";
}

function getSignal(asset) {
  if (asset.volatility >= 9) return "Vysoká volatilita";
  if (asset.rsi > 70) return "Zvýšená opatrnosť";
  if (asset.rsi < 30) return "Potenciálna príležitosť";
  if (asset.price > asset.sma20 && asset.price > asset.sma50) return "Silný trend";
  if (asset.price < asset.sma20 && asset.price < asset.sma50) return "Slabý trend";
  return "Sledovať";
}

function labelForPoint(range, index, total) {
  if (range === "1d") return `${String(index).padStart(2, "0")}:00`;
  if (range === "5d") return `D-${total - index}`;
  if (range === "1m") return `${index + 1}. deň`;
  if (range === "6m") return `T${index + 1}`;
  if (range === "1y") return `M${Math.ceil((index + 1) / 8)}`;
  return `R${Math.ceil((index + 1) / 24)}`;
}

module.exports = {
  getAsset,
  getAssets,
  createHistory
};
