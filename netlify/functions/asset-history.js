const { isAllowedRange } = require("./utils/allowedAssets");
const { createHistory, getAsset } = require("./utils/demoData");
const { getTicker, guard, handleError, json } = require("./utils/security");

exports.handler = async (event) => {
  try {
    const guarded = guard(event, "GET");
    if (guarded) return guarded;

    const ticker = getTicker(event);
    const asset = getAsset(ticker);
    if (!asset) return json(400, { error: "Nepovolený ticker." });

    const range = String(event.queryStringParameters?.range || "1m").toLowerCase();
    if (!isAllowedRange(range)) return json(400, { error: "Nepovolené obdobie grafu." });

    return json(200, {
      ticker: asset.ticker,
      range,
      dataMode: "demo",
      history: createHistory(asset, range)
    });
  } catch (error) {
    return handleError(error);
  }
};
