// Simple WebSocket server for real-time chat
// Run with: node websocket-server.js

const WebSocket = require('ws');
const http = require('http');

// Create HTTP server
const server = http.createServer();

// Create WebSocket server
const wss = new WebSocket.Server({ 
  server,
  path: '/chat'
});

console.log('🚀 Starting WebSocket server...');

// Store connected clients
const clients = new Map();

wss.on('connection', (ws, req) => {
  console.log('✅ New client connected');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('📨 Received:', data.type, data.sender);
      
      if (data.type === 'join') {
        // Store client info
        ws.userType = data.userType;
        ws.userId = data.userId;
        ws.patientId = data.patientId;
        clients.set(ws.userId, ws);
        
        console.log(`👤 ${data.userType} ${data.userId} joined`);
        
        // Send confirmation
        ws.send(JSON.stringify({
          type: 'joined',
          message: 'Successfully connected to chat',
          userType: data.userType
        }));
        
      } else if (data.type === 'message') {
        // Broadcast message to relevant clients
        const messageToSend = {
          type: 'message',
          id: data.id, // Include the message ID
          text: data.text,
          sender: data.sender,
          timestamp: data.timestamp,
          patientId: data.patientId
        };
        
        // Send to all connected clients (in a real app, you'd filter by patient/doctor relationship)
        clients.forEach((client, userId) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(messageToSend));
          }
        });
        
        console.log(`💬 Message from ${data.sender}: ${data.text}`);
        
      } else if (data.type === 'typing') {
        // Broadcast typing indicator
        const typingMessage = {
          type: 'typing',
          isTyping: data.isTyping,
          sender: data.sender,
          patientId: data.patientId
        };
        
        clients.forEach((client, userId) => {
          if (client.readyState === WebSocket.OPEN && client.userId !== data.sender) {
            client.send(JSON.stringify(typingMessage));
          }
        });
      }
      
    } catch (error) {
      console.error('❌ Error parsing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format'
      }));
    }
  });
  
  ws.on('close', () => {
    console.log('❌ Client disconnected');
    if (ws.userId) {
      clients.delete(ws.userId);
    }
  });
  
  ws.on('error', (error) => {
    console.error('❌ WebSocket error:', error);
  });
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'welcome',
    message: 'Connected to Sanjeevan Health Chat',
    timestamp: new Date().toISOString()
  }));
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🎉 WebSocket server running on ws://localhost:${PORT}/chat`);
  console.log(`📡 HTTP server running on http://localhost:${PORT}`);
  console.log('💡 Ready to accept connections!');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down WebSocket server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
