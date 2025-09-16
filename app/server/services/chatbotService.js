const axios = require("axios");

async function getChatbotReply(message) {
  try {
    const res = await axios.post("http://localhost:5000/chat", { message });
    return res.data.reply;
  } catch (err) {
    console.error("Error connecting to Python chatbot:", err.message);
    throw err;
  }
}

module.exports = { getChatbotReply };