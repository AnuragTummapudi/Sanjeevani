// Simple WebSocket server for testing chat functionality
// This is a basic implementation for demo purposes

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server running on ws://localhost:8080');

wss.on('connection', (ws, req) => {
  console.log('New client connected');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);
      
      if (data.type === 'join') {
        ws.userType = data.userType;
        ws.userId = data.userId;
        ws.patientId = data.patientId;
        console.log(`${data.userType} ${data.userId} joined`);
      } else if (data.type === 'message') {
        // Broadcast message to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'message',
              text: data.text,
              sender: data.sender,
              timestamp: data.timestamp,
              patientId: data.patientId
            }));
          }
        });
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

