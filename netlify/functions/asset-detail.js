const { getAsset } = require("./utils/demoData");
const { getTicker, guard, handleError, json } = require("./utils/security");

exports.handler = async (event) => {
  try {
    const guarded = guard(event, "GET");
    if (guarded) return guarded;

    const ticker = getTicker(event);
    const asset = getAsset(ticker);
    if (!asset) return json(400, { error: "Nepovolený ticker." });

    return json(200, { dataMode: "demo", asset });
  } catch (error) {
    return handleError(error);
  }
};
