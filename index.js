const express = require("express");
const cors = require("cors");
const NLPCloudClient = require("nlpcloud");
require("dotenv").config();

const app = express();

app.use(cors());

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

app.get("/", function (req, res) {
  res.send("hello");
});

app.get("/chat", async function (req, res) {
  try {
    const response = await nlpCloudClient.chatbot(
      "I just broke up with my girlfriend... What is your name by the way?",
      "This is a discussion between a human and an AI. The human is sad but the AI is empathetic and reassuring. The AI is called Patrick.",
      history
    );
    res.send(response.data);
    console.log("response: " + response.data);
  } catch (e) {
    console.log("E: " + e);
  }
});

app.listen(process.env.PORT || 3000);
