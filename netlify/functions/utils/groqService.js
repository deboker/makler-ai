const { getAssets } = require("./demoData");

const systemPrompt =
  "Si profesionálny analytický asistent pre aplikáciu Maklér AI. Odpovedáš po slovensky. Pomáhaš používateľovi pochopiť trhové dáta, trendy, riziká a možné scenáre. Nikdy negarantuješ zisk. Nikdy nedávaš priamy príkaz kúpiť alebo predať. Používaš opatrný jazyk. Odpovede majú byť jasné, krátke a profesionálne. Každú odpoveď zakončíš upozornením, že nejde o finančné poradenstvo.";

async function analyzeAsset(asset) {
  const prompt = `Analyzuj aktívum ${asset.name} (${asset.ticker}). Cena ${asset.price}, zmena ${asset.dailyChangePercent} %, SMA20 ${asset.sma20}, SMA50 ${asset.sma50}, RSI ${asset.rsi}, volatilita ${asset.volatility}, riziko ${asset.riskScore}/10.`;
  return askGroq(prompt, demoAnalyze(asset));
}

async function chatWithBroker(question) {
  const marketContext = getAssets()
    .map((asset) => `${asset.ticker}: cena ${asset.price}, zmena ${asset.dailyChangePercent} %, trend ${asset.trend}, signál ${asset.signal}, riziko ${asset.riskScore}/10`)
    .join("\n");

  const prompt = `Používateľ sa pýta: "${question}"\n\nAktuálne demo dáta:\n${marketContext}`;
  return askGroq(prompt, demoChat(question));
}

async function askGroq(prompt, fallback) {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "demo-groq-model";

  if (!apiKey || apiKey === "your_groq_api_key_here") {
    return { mode: "demo", model, answer: fallback };
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.35,
        max_tokens: 420
      })
    });

    if (!response.ok) return { mode: "demo", model, answer: fallback };

    const data = await response.json();
    return {
      mode: "live",
      model,
      answer: data.choices?.[0]?.message?.content || fallback
    };
  } catch {
    return { mode: "demo", model, answer: fallback };
  }
}

function demoAnalyze(asset) {
  return [
    `${asset.name} (${asset.ticker}) má aktuálne trend označený ako ${asset.trend}.`,
    `Technický obraz naznačuje signál: ${asset.signal}. RSI je ${asset.rsi} a rizikové skóre ${asset.riskScore}/10.`,
    asset.volatility >= 8
      ? "Volatilita je zvýšená, preto môže byť vhodné sledovať reakciu ceny pri najbližších supportoch a rezistenciách."
      : "Volatilita je miernejšia, no stále je vhodné overovať objem a celkový trhový kontext.",
    "Nejde o finančné poradenstvo."
  ].join(" ");
}

function demoChat(question) {
  const assets = getAssets();
  const strongest = [...assets].sort((a, b) => b.dailyChangePercent - a.dailyChangePercent)[0];
  const riskiest = [...assets].sort((a, b) => b.riskScore - a.riskScore)[0];

  return [
    `Podľa demo dát dnes vyzerá najsilnejšie ${strongest.name} (${strongest.ticker}), keďže má pozitívny denný pohyb a technický obraz naznačuje ${strongest.signal.toLowerCase()}.`,
    `Najvyššie riziko má ${riskiest.name} (${riskiest.ticker}) so skóre ${riskiest.riskScore}/10, preto by konzervatívny investor mohol počkať na stabilizáciu.`,
    question.toLowerCase().includes("porovnaj")
      ? "Pri porovnaní sledujte najmä trend voči SMA, RSI, volatilitu a objem."
      : "Dnes môže byť vhodné sledovať najmä volatilitu, objem a reakciu ceny pri kľúčových úrovniach.",
    "Nejde o finančné poradenstvo."
  ].join(" ");
}

module.exports = {
  analyzeAsset,
  chatWithBroker
};
