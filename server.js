const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const path = require('path');
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      id: socket.id,
      text: msg.text
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  //
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server at http://localhost:3000
server.listen(3000, () => {
  console.log('Chat app running on http://localhost:3000');
});