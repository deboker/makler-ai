const { chatWithBroker } = require("./utils/groqService");
const { guard, handleError, json, parseBody, sanitizeQuestion } = require("./utils/security");

exports.handler = async (event) => {
  try {
    const guarded = guard(event, "POST");
    if (guarded) return guarded;

    const body = parseBody(event.body);
    const question = sanitizeQuestion(body.question);
    if (!question || question.length < 3) return json(400, { error: "Otázka je príliš krátka." });
    if (question.length > 700) return json(400, { error: "Otázka je príliš dlhá." });

    const ai = await chatWithBroker(question);
    return json(200, ai);
  } catch (error) {
    return handleError(error);
  }
};
