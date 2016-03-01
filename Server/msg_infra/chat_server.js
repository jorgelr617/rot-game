//Simple Chat Server: chat_server.js.
var app = require('express')();
var http = require('http').Server(app);

//Load the Message Infrastucture module.
var my_module = require('./public/scripts/msg_infra_server.js')(http);


var path = require('path');


//Send the HTML page or resource.
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'chat_client.html'));
});
app.get('/public/css/chat_client.css', function(req, res){
  res.sendFile(path.join(__dirname, 'public/css/chat_client.css'));
});
app.get('/public/scripts/jquery.tinyscrollbar.js', function(req, res){
  res.sendFile(path.join(__dirname, 'public/scripts/jquery.tinyscrollbar.js'));
});
app.get('/public/scripts/chat_client_lib.js', function(req, res){
  res.sendFile(path.join(__dirname, 'public/scripts/chat_client_lib.js'));
});

//Listen for incomming requests.
http.listen(3000, function(){
  console.log('Listening on port:3000');
  
  //Register a regular message listener.
  my_module.receive_message
  (
    function(message)
    {
      //Echo message back to the Chat Clients.
      my_module.send_message(message);
    }
  )

});