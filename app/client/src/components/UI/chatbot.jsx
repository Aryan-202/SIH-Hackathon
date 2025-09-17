const sendMessage = async () => {
  if (!input.trim()) return;
  const userMsg = { sender: "user", text: input };
  setMessages([...messages, userMsg]);

  try {
    const res = await axios.post("http://localhost:5000/api/chatbot", {
      message: input,
    });

    const botMsg = { sender: "bot", text: res.data.reply };
    setMessages((prev) => [...prev, botMsg]);
  } catch (err) {
    setMessages((prev) => [...prev, { sender: "bot", text: "Error: Chatbot unavailable." }]);
  }
  setInput("");
};