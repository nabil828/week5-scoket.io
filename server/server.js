const express = require('express');
const app = express();

const server = require('http').createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

const { Server } = require('socket.io');

const io = new Server(server,
  {
    cors: '*'
  });

const users = []

// server-side
io.on("connection", (socket) => {
  console.log(`client connected with id ${socket.id}`);

  socket.on("message", (user, msg, time) => {
    console.log(`user ${user} sent ${msg}`);
    const room = users.find(u => u.id == user).room
    socket.to(room).emit("message", user, msg, time)
  })

  socket.on("join", (user, room) => {
    socket.join(room)
    console.log(` a ${user} joined ${room}`);
    users.push({
      "id": user,
      room
    })
  })

});
