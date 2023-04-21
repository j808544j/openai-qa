const express = require("express");
const router = express.Router();
const { OpenAI } = require("langchain/llms/openai");
const { RetrievalQAChain } = require("langchain/chains");
const { HNSWLib } = require("langchain/vectorstores/hnswlib");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const fs = require("fs").promises;
const logger = require("../logger");

router.post("/", async (req, res, next) => {
  try {
    const model = new OpenAI({});
    const text = await fs.readFile("./script.txt", "utf8");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([text]);
    const vectorStore = await HNSWLib.fromDocuments(
      docs,
      new OpenAIEmbeddings()
    );
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    const response = await chain.call({ query: req.body.query });
    res.send(response);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
});

module.exports = router;
