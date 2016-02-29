//Server: Simple Message Infrastucture module for Server.
var message_callbacks = [];
var warning_callbacks = [];
var error_callbacks = [];

module.exports = function(http_var)
{
  var module = {};
  
  //Open local host connection.
  var io = require('socket.io')(http_var);
  
  //Send a regular message.
  module.send_message = function (message)
  {
    //Check for valid arguments.
    if ((message == null) || (message === 'undefined'))
      return;
    
    console.log("SERVER: -> SENT: Regular message: " + message );
    io.emit('message', message);
    
  },
  
  //Send a warning message.
  module.send_warning = function (message)
  {
    //Check for valid arguments.
    if ((message == null) || (message === 'undefined'))
      return;
    
    console.log("SERVER: -> SENT: Warning message: " + message );
    io.emit('warning', message);
    
  },
  
  //Send an error message.
  module.send_error = function (message)
  {
    //Check for valid arguments.
    if ((message == null) || (message === 'undefined'))
      return;
    
    console.log("SERVER: -> SENT: Error message: " + message );
    io.emit('error', message);
    
  },
  
  //Register a listener for regular messages.
  module.receive_message = function (callback)
  {
    console.log("SERVER: Register regular message receiver.");
    
    //Check for valid arguments.
    if ((callback == null) || (callback === 'undefined'))
      return;
    
    //Add the regular message callback.
    message_callbacks.push(callback);
  },
  
  //Register a listener for warning messages.
  module.receive_warning = function (callback)
  {
    console.log("SERVER: Register warning receiver.");
    
    //Check for valid arguments.
    if ((callback == null) || (callback === 'undefined'))
      return;
    
    //Add the warning callback.
    error_callbacks.push(callback);
  },
  
  //Register a listener for error messages.
  module.receive_error = function (callback)
  {
    console.log("SERVER: Register error receiver.");
    
    //Check for valid arguments.
    if ((callback == null) || (callback === 'undefined'))
      return;
    
    //Add the error callback.
    error_callbacks.push(callback);
  }
  
  
  io.on('connection', function(socket)
  {
    //Process regular messages.
    socket.on('message', function(message)
    {
      console.log('SERVER: <- RECEIVED: Regular message = ' + message);

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
    socket.on('warning', function(message)
    {
      console.log('SERVER: <- RECEIVED: Warning message = ' + message);

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
    socket.on('error', function(message)
    {
      console.log('SERVER: <- RECEIVED: Error message = ' + message);

      //Loop through all the error callbacks.
      for (var lcv=0; lcv < error_callbacks.length; lcv++)
      {
        //Get the callback.
        var callback = error_callbacks[lcv];
        
        //Invoke the error callback.
        callback(message);
      }
      
    });
    
    //Process conenction message.
    socket.on('connection', function(message)
    {
      console.log('SERVER: <- RECEIVED: Connection message = ' + message);

      //Loop through all the message callbacks.
      for (var lcv=0; lcv < message_callbacks.length; lcv++)
      {
        //Get the callback.
        var callback = message_callbacks[lcv];
        
        //Invoke the message callback.
        callback(message);
      }
      
    });
  
  });
    
  return module;
};