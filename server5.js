var host = "127.0.0.1";
var port = 1337;
var express = require("express");
    http = require('http'),
    socketIo = require('socket.io');

var app = express();
app.use('/', express.static(__dirname + '/'));

app.get('/', (req, res) => res.sendFile("pg8.html", { root: __dirname }));

//app.listen(port, host);

// start webserver on port 3007
var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(port);

console.log('Running server at http://localhost:' + port + '/');

var line_history = [];

io.on('connection', function (socket) {
  io.emit('on_connect', { line_history : line_history } );

 // add handler for message type "draw_line".
  socket.on('draw_line', function (data) {
    // add received line to history 
    line_history.push(data.line);
    
    // make persistant
    //insert(data.line);
    
    // send line to all clients
    io.emit('draw_line', { line: data.line });
  });

  socket.on('move_cursor', function (data) {
    // send cursor to all clients
    io.emit('move_cursor', { cursor: data.cursor });
  });
});

