const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// CORS configuration for both Express and Socket.io
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Initialize Socket.io with consistent CORS config
const io = socketIo(server, {
  cors: corsOptions,
  // Additional Socket.io configuration for production
  transports: ['websocket', 'polling'], // Preferred transport methods
  maxHttpBufferSize: 1e6, // 1MB max message size
  pingTimeout: 60000, // 60 seconds without pong to consider connection closed
  pingInterval: 25000 // How often to ping (25 seconds)
});

// Enhanced connection handling with error management
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // Handle connection errors
  socket.on('error', (error) => {
    console.error('Socket error for client:', socket.id, error);
  });

  socket.on('disconnect', (reason) => {
    console.log('Client disconnected:', socket.id, 'Reason:', reason);
  });

  // Optional: Handle custom events
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });
});

// Store io instance in app for access in controllers
app.set('io', io);

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${corsOptions.origin}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = server;