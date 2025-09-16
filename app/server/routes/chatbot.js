const express = require("express");
const { getChatbotReply } = require("../services/chatbotService");

const router = express.Router();

// POST /api/chatbot
router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const reply = await getChatbotReply(message);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chatbot service failed" });
  }
});

module.exports = router;