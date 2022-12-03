const express = require("express");
const NLPCloudClient = require("nlpcloud");
require("dotenv").config();

const app = express();

const nlpcloudToken = process.env.NLPCLOUD_KEY;
const nlpCloudClient = new NLPCloudClient("fast-gpt-j", nlpcloudToken, false);

let history = [
  {
    input: "Hello friend",
    response: "Hi there, how is it going today?",
  },
  {
    input: "Well, not that good...",
    response: "Oh? What happened?",
  },
];
let msg = "Hi";

// const result = nlpCloudClient
//   .chatbot(msg, history)
//   .then((res) => {
//     console.log("Res: " + res);
//   })
//   .catch((e) => {
//     console.log("E: " + e);
//   });

app.get("/", async function (req, res) {
  try {
    //res.send([{ d: "dd" }]);
    const response = await nlpCloudClient.chatbot(
      "I just broke up with my girlfriend... What is your name by the way?",
      "This is a discussion between a human and an AI. The human is sad but the AI is empathetic and reassuring. The AI is called Patrick.",
      history
    );
    res.send(response.data);
    console.log("response: " + response.data);
    // Send response to Discord bot.
    //message.reply(`${response.data['response']}`);
  } catch (e) {
    console.log("E: " + e);
  }
});

app.listen(3000);
require("dotenv").config();
