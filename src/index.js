const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const prompt = require("prompt-sync")();

const chatbot = new AssistantV2({
  version: "2019-02-28",
  url: process.env.ASSISTANT_URL,
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_IAM_APIKEY,
  }),
});

const assistantId = process.env.ASSISTANT_ID;
const mensageUser = prompt(">> ");

chatbot.createSession({ assistantId }, (_erro, data) => {
  const sessionId = data.result.session_id;

  chatbot.message(
    {
      input: { text: mensageUser },
      assistantId,
      sessionId,
    },
    (_err, data) => {
      const { intents, entities, generic } = data.result.output;

      console.log(intents, entities, generic[0].text);
    }
  );
});
