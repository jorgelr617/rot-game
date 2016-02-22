//Simple Message Infrastucture Client.
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//Send the HTML page or resource.
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'msg_infra_client.html'));
});
app.get('/msg_infra_client.css', function(req, res){
  res.sendFile(path.join(__dirname, 'msg_infra_client.css'));
});
app.get('/jquery.tinyscrollbar.js', function(req, res){
  res.sendFile(path.join(__dirname, 'jquery.tinyscrollbar.js'));
});
app.get('/msg_infra_client.js', function(req, res){
  res.sendFile(path.join(__dirname, 'msg_infra_client.js'));
});

//User connected.
//Handle the upcomming requests, the events.
io.on('connection', function(socket){
  console.log('NOTICE: User connected!');
  
  //socket.emit('game_general', { msg: 'User Connected.', msg_id: '12345' });
  //socket.emit('game_error', { msg: 'Error message.'});
  //socket.emit('game_warning', { msg: 'Warning message.'});
  //socket.emit('game_message', { msg: 'Game message.', data:'text'});
  
  //Game general.
  socket.on('game_general', function(data){
      console.log('NOTICE: Game general' + data);
  });
  
  //Game error.
  socket.on('game_error', function(data){
      console.log('NOTICE: Game error' + data);
  });
  
  //Game warning.
  socket.on('game_error', function(data){
      console.log('NOTICE: Game warning' + data);
  });
  
  //Game message.
  socket.on('game_message', function(data){
      console.log('NOTICE: Game message' + data);
      
      //Just echo the mesage back for now.
      socket.emit('game_message', data);
  });
  
  //User diconnected.
  socket.on('disconnect', function(data){
      console.log('NOTICE: A user disconnected!');
  });  
    
});

//Listen for incomming requests.
http.listen(313, function(){
  console.log('listening on *:313');
});