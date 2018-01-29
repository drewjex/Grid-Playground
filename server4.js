var host = "127.0.0.1";
var port = 1337;
var express = require("express");
    http = require('http')
var app = express();
app.use('/', express.static(__dirname + '/'));

app.get('/', (req, res) => res.sendFile("pg7.html", { root: __dirname }));

//app.listen(port, host);

// start webserver on port 3007
var server =  http.createServer(app);

server.listen(port);

console.log('Running server at http://localhost:' + port + '/');