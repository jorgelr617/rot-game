var Player = require('./private/classes/player.js');
var Game = require('./private/classes/game.js');

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

//Global variables for server
var guestCounter = 0; //used assign unique names to guests
var players = []; //an array that contains all player objects
var games = []; //an array that contains all game objects


//Middleware used to create username in session
var createGuestName = function (req, res, next) {
    if (!req.session.username) {
        console.log('new user detected');
        req.session.username = 'Guest'+guestCounter.toString();
        guestCounter++;
        console.log('username session variable set: '+ req.session.username);
        player = new Player(req.sessionID, req.session.username);
        players.push(player);
        console.log(player);
    }
    next();   
};

app.use(createGuestName);

//NOTES: To access session variables in a route use req.session.value_name
//NOTES: To access session variables in a socket use socket.handshake.session.username.value_name


//ROUTES
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello ' + req.session.username + '!<img src=/images/jetfighter.png alt="spaceship"><br /><a href="/chat.html">Sample Chat Page!</a>');
});

app.get('/newgame', function(req, res) { 
  //Search players array for correct player object
  var filterResults = players.filter(function(obj) { if (obj.id == req.sessionID) {return true;} }); //searches player array for object that contains same session id as current request.
  var currentPlayer = filterResults[0]; // get the first result of the above search 
  
  if (currentPlayer) {
    console.log('found player: ' + currentPlayer.playerName + " " + currentPlayer.id );
    var game = new  Game(currentPlayer);
    games.push(game);
  } else {
      console.log('player not found in array');
  } 
});

app.get('/showgames', function(req, res) { 
  console.log(games);
});

app.get('/showplayers', function(req, res) { 
  console.log(players);
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
