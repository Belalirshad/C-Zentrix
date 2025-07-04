const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const {
  initialVisitors,
  addRandomVisitor,
  sendRandomMessage,
  scheduleDisconnect
} = require('./helper');

const app = express();
app.use(cors());

const PORT = 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let visitors = [...initialVisitors];
let messages = [];

// Add a new visitor every 1-2 minutes
setInterval(() => addRandomVisitor(visitors, io, (id) => scheduleDisconnect(visitors, io, id)), 60 * 1000 + Math.floor(Math.random() * 60 * 1000));
// Send a random message every 20-40 seconds
setInterval(() => sendRandomMessage(visitors, messages, io), 20000 + Math.floor(Math.random() * 20000));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // On client connection, send current state
  socket.emit('visitors_update', visitors);
  socket.emit('messages_init', messages);

  socket.on('send_message', (msg) => {
    messages.push(msg);
    io.emit('message', msg);
  });

  // Mark all messages for a visitor as read
  socket.on('read_messages', (visitorId) => {
    let updated = false;
    messages = messages.map(msg => {
      if (msg.visitorId === visitorId && !msg.isRead) {
        updated = true;
        return { ...msg, isRead: true };
      }
      return msg;
    });
    if (updated) {
      io.emit('messages_init', messages);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Socket.io backend is running');
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
