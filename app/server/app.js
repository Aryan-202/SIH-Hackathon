const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const chatbotRoutes = require("./routes/chatbot"); 

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Mount routes
app.use('/api/tourists', require('./routes/tourists'));
app.use('/api/admin', require('./routes/admin'));

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handler middleware (should be last)
app.use(errorHandler);

module.exports = app;

// Mount chatbot route
app.use("/api/chatbot", chatbotRoutes);
