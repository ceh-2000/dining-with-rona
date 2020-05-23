var http = require('http');

var server = http.createServer(function(req, res) {
    res.end("It works! Path: " + req.url);
});

server.listen(process.env.PORT, function() {
    console.log("Server listening on: " + process.env.PORT);
});