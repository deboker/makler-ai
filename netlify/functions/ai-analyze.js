const { getAsset } = require("./utils/demoData");
const { analyzeAsset } = require("./utils/groqService");
const { getTicker, guard, handleError, json, parseBody } = require("./utils/security");

exports.handler = async (event) => {
  try {
    const guarded = guard(event, "POST");
    if (guarded) return guarded;

    const body = parseBody(event.body);
    const ticker = getTicker(event, body);
    const asset = getAsset(ticker);
    if (!asset) return json(400, { error: "Nepovolený ticker." });

    const ai = await analyzeAsset(asset);
    return json(200, { ticker: asset.ticker, ...ai });
  } catch (error) {
    return handleError(error);
  }
};
