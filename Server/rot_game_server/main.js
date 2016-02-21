var express = require('express');
var app = express();
var server = require('http').Server(app);


app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World! <img src=/images/jetfighter.png alt="spaceship"><br /><a href="/chat.html">Sample Chat Page!</a>');
});

server.listen(80, function () { 
  console.log('Example app listening on port 80!');
});



//NOTES: The following code is for testing socket.io chat.  We need to better break this out of the main.js file.  Also need to impliment session data.
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('Socket.io: new connection');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('Socket.io: user disconnected');
    });

});

