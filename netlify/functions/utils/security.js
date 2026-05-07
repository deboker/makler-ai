const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "Cache-Control": "no-store"
};

const rateLimitStore = new Map();
const rateLimitWindowMs = 60 * 1000;
const rateLimitMax = 90;

function json(statusCode, payload) {
  return {
    statusCode,
    headers: jsonHeaders,
    body: statusCode === 204 ? "" : JSON.stringify(payload)
  };
}

function methodNotAllowed() {
  return json(405, { error: "Metóda nie je povolená." });
}

function parseBody(body) {
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch {
    const error = new Error("Neplatný JSON payload.");
    error.statusCode = 400;
    throw error;
  }
}

function sanitizeQuestion(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 700);
}

function getTicker(event, body = {}) {
  const fromQuery = event.queryStringParameters?.ticker;
  const fromBody = body.ticker;
  const fromPath = event.path?.split("/").filter(Boolean).at(-1);
  return String(fromQuery || fromBody || fromPath || "").toUpperCase();
}

function rateLimit(event) {
  const now = Date.now();
  const ip = event.headers?.["x-nf-client-connection-ip"] || event.headers?.["client-ip"] || "anonymous";
  const current = rateLimitStore.get(ip);

  if (!current || now - current.startedAt > rateLimitWindowMs) {
    rateLimitStore.set(ip, { count: 1, startedAt: now });
    return false;
  }

  current.count += 1;
  return current.count > rateLimitMax;
}

function handleError(error) {
  const statusCode = error.statusCode || 500;
  return json(statusCode, {
    error: statusCode >= 500 ? "Nastala chyba API funkcie." : error.message
  });
}

function guard(event, allowedMethod) {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== allowedMethod) return methodNotAllowed();
  if (rateLimit(event)) return json(429, { error: "Príliš veľa požiadaviek. Skúste to neskôr." });
  return null;
}

module.exports = {
  guard,
  handleError,
  json,
  parseBody,
  sanitizeQuestion,
  getTicker
};
