const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const moment=require('moment');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./helperFunctions');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
  // console.log('connection established')
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    // console.log(name)
    if(error) {return callback(error)};

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`,time:moment().format('h:mm a') });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`,time:moment().format('h:mm a')  });
     
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    // callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
     
    io.to(user.room).emit('message', { user: user.name, text: message ,time:moment().format('h:mm a') });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.`,time:moment().format('h:mm a')  });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));