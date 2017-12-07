var express = require('express');
var app = express();
var server = app.listen(3000);
var socket = require('socket.io');
var io = socket(server);

app.use(express.static('public'));

console.log("My socket server is running")

io.sockets.on('connection', newConnection);


function newConnection(socket) {

  console.log("new connection: " + socket.id);
  socket.on('stoneXY', stoneMsg);
  socket.on('skip', turnMsg);

  function stoneMsg(data) {
    socket.broadcast.emit('stoneXY', data);
    console.log(data);
  }

  function turnMsg(data) {
    socket.broadcast.emit('skip', data);
    console.log(data);
  }

}
