const API_BASE_URL = "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "API požiadavka zlyhala.");
  }

  return response.json();
}

export const api = {
  baseUrl: API_BASE_URL || "rovnaká doména cez /.netlify/functions",
  health: () => request("/.netlify/functions/health"),
  assets: () => request("/.netlify/functions/assets"),
  asset: (ticker) => request(`/.netlify/functions/asset-detail?ticker=${ticker}`),
  history: (ticker, range) => request(`/.netlify/functions/asset-history?ticker=${ticker}&range=${range}`),
  analyze: (ticker) => request("/.netlify/functions/ai-analyze", { method: "POST", body: JSON.stringify({ ticker }) }),
  chat: (question) => request("/.netlify/functions/ai-chat", { method: "POST", body: JSON.stringify({ question }) })
};
