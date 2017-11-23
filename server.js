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
  socket.on('setTrue', trueMsg);

  function stoneMsg(data) {
    socket.broadcast.emit('stoneXY', data);
    console.log(data);
  }

  function trueMsg(bool) {
    socket.broadcast.emit('setTrue', bool);
  }

}
