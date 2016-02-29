//Simple Message Infrastucture module for Client.
var error_callbacks = [];
var warning_callbacks = [];
var message_callbacks = [];

module.exports = function(temp)
{
  var module = {};
  
  //Establish the socket connection.
  var socket = require('socket.io-client');
  var io = socket.connect('http://localhost:3000');
  
  
  //Send a regular message.
  module.send_message = function (message)
  {
    //Check for valid arguments.
    if ((message == null) || (message === 'undefined'))
      return;
    
    console.log("CLIENT: -> SENT: Regular message: " + message );
    io.emit('message', message);
    
  },
  
  //Send a warning error message.
  module.send_warning = function (message)
  {
    //Check for valid arguments.
    if ((message == null) || (message === 'undefined'))
      return;
    
    console.log("CLIENT: -> SENT: Warning message: " + message );
    io.emit('warning', message);
    
  },
  
  //Send an error message.
  module.send_error = function (message)
  {
    //Check for valid arguments.
    if ((message == null) || (message === 'undefined'))
      return;
    
    console.log("CLIENT: -> SENT: Error message: " + message );
    io.emit('error', message);
    
  },
  
  //Register a listener for regular messages.
  module.receive_message = function (callback)
  {
    console.log("CLIENT: Register regular message receiver.");
    
    //Check for valid arguments.
    if ((callback == null) || (callback === 'undefined'))
      return;
    
    //Add the regular message callback.
    message_callbacks.push(callback);
  },
  
  //Register a listener for warning messages.
  module.receive_warning = function (callback)
  {
    console.log("CLIENT: Register warning receiver.");
    
    //Check for valid arguments.
    if ((callback == null) || (callback === 'undefined'))
      return;
    
    //Add the warning callback.
    warning_callbacks.push(callback);
  },
  
  //Register a listener for error messages.
  module.receive_error = function (callback)
  {
    console.log("CLIENT: Register error receiver.");
    
    //Check for valid arguments.
    if ((callback == null) || (callback === 'undefined'))
      return;
    
    //Add the Error callback.
    error_callbacks.push(callback);
  }
  
  //Process regular messages.
  io.on('message', function(message)
  {
    console.log('CLIENT: -> RECEIVED: Regular message = ' + message);

    //Loop through all the message callbacks.
    for (var lcv=0; lcv < message_callbacks.length; lcv++)
    {
      //Get the callback.
      var callback = message_callbacks[lcv];
      
      //Invoke the message callback.
      callback(message);
    }
    
  });
  
  //Process warning message.
  io.on('warning', function(message)
  {
    console.log('CLIENT: -> RECEIVED: Warning message = ' + message);

    //Loop through all the warning callbacks.
    for (var lcv=0; lcv < warning_callbacks.length; lcv++)
    {
      //Get the callback.
      var callback = warning_callbacks[lcv];
      
      //Invoke the warning callback.
      callback(message);
    }
    
  });
  
  //Process error message.
  io.on('error', function(message)
  {
    console.log('CLIENT: -> RECEIVED: Error message = ' + message);

    //Loop through all the error callbacks.
    for (var lcv=0; lcv < error_callbacks.length; lcv++)
    {
      //Get the callback.
      var callback = error_callbacks[lcv];
      
      //Invoke the error callback.
      callback(message);
    }
    
  });
  
  //Process connection message.
  io.on('connection', function(message)
  {
    console.log('CLIENT: -> RECEIVED: Connection = ' + message);

    //Loop through all the message callbacks.
    for (var lcv=0; lcv < message_callbacks.length; lcv++)
    {
      //Get the callback.
      var callback = message_callbacks[lcv];
      
      //Invoke the message callback.
      callback(message);
    }
    
  });
  
  return module;
};