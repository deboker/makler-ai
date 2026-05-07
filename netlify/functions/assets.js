const { getAssets } = require("./utils/demoData");
const { guard, handleError, json } = require("./utils/security");

exports.handler = async (event) => {
  try {
    const guarded = guard(event, "GET");
    if (guarded) return guarded;

    return json(200, {
      dataMode: "demo",
      message: "Market data API nie je pripojené. Netlify Function vracia demo dáta.",
      assets: getAssets()
    });
  } catch (error) {
    return handleError(error);
  }
};
