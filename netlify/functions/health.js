const { guard, handleError, json } = require("./utils/security");

exports.handler = async (event) => {
  try {
    const guarded = guard(event, "GET");
    if (guarded) return guarded;

    return json(200, {
      status: "ok",
      app: "Maklér AI Netlify Functions API",
      dataMode: "demo-ready",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return handleError(error);
  }
};
