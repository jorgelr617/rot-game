var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var secretSessionKey = 'rotten-secrets!'; //This should be changed in production for security
var session = require('express-session')({
    secret: secretSessionKey,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false } //true requires https or won't work!
});

var sharedsession = require("express-socket.io-session");
app.use(session);

io.use(sharedsession(session, {
    autoSave:true
}));

var guestCounter = 0;
var sess;

//NOTES: To access session variables in a route use req.session.value_name
//NOTES: To access session variables in a socket use socket.handshake.session.username.value_name

app.use(express.static('public'));

app.get('/', function (req, res) {
    if (req.session.username) {

    } else {
        req.session.username = 'Guest'+guestCounter.toString();
        guestCounter++;
        console.log('new user '+ req.session.username);
    }
  res.send('Hello ' + req.session.username + '!<img src=/images/jetfighter.png alt="spaceship"><br /><a href="/chat.html">Sample Chat Page!</a>');
});

server.listen(80, function () {
  console.log('Example app listening on port 80!');
});

//NOTES: The following code is for testing socket.io chat.  We need to better break this out of the main.js file.
//NOTES: Would like to display current username on client browser on chat page.  Maybe need to use route?

io.on('connection', function (socket) {
    console.log('Socket.io: new connection');

    if (!socket.handshake.session.username){
        socket.handshake.session.username = 'Guest'+guestCounter.toString();
        guestCounter++;
        console.log('new user '+ socket.handshake.session.username);
    }

    socket.on('chat message', function(msg){
        console.log('message from ' + socket.handshake.session.username + ': ' + msg);
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', socket.handshake.session.username + ': ' + msg);
    });
    socket.on('disconnect', function(){
        console.log('Socket.io: user disconnected');
    });

});
