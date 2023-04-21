const express = require("express");
const fs = require("fs");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

router.get("/", async function (req, res, next) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createTranscription(
      fs.createReadStream("./test.mp3"),
      "whisper-1"
    );
    res.send(response.data.text);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error occurred while transcribing the audio file.");
  }
});

module.exports = router;
