//Client: Simple Message Infrastucture module for Client.
var message_callbacks = [];

module.exports = function(connection_string) //Argument ignored for now.
{
  var module = {};
  
  //Check for valid "connection_string" argument.
  if ((connection_string == null) || (connection_string === 'undefined'))
  {
    connection_string = 'http://localhost:3000';
  }
  
  //Establish the "socket.io" connection.
  var socket = require('socket.io-client');
  var io = socket.connect(connection_string);
  
  
  //Send a message.
  module.send_message = function (message_type, message)
  {
    //Check for valid "message type" argument.
    if ((message_type == null) || (message_type === 'undefined'))
      return;
    
    //Check for valid "message" argument.
    if ((message == null) || (message === 'undefined'))
      return;
    
    console.log("CLIENT: -> SENT: " + message_type + ": " + message);
    io.emit(message_type, message);
    
  },
  
  //Register a listener for message type.
  module.receive_message = function (message_type, callback)
  {
    console.log("CLIENT: Register " + message_type + " receiver.");
    
    //Check for valid "message type" argument.
    if ((message_type == null) || (message_type == 'undefined'))
      return;
    
    //Check for valid "calback" argument.
    if ((callback == null) || (callback === 'undefined'))
      return;
    
    //Add the message type callback.
    message_callbacks.push({key: message_type, value: callback});
  },
  
  
  //Process regular messages.
  io.on('message', function(message)
  {
    console.log('CLIENT: -> RECEIVED: message = ' + message);

    //Loop through all the message callbacks.
    for (var lcv=0; lcv < message_callbacks.length; lcv++)
    {
      //Is it the regular message type?
      if (message_callbacks[lcv].key == "message")
      {
        //Get the callback.
        var callback = message_callbacks[lcv].value;
      
        //Invoke the regular message callback.
        callback(message);
      }
    }
    
  });
  
  //Process warning message.
  io.on('warning', function(message)
  {
    console.log('CLIENT: -> RECEIVED: Warning message = ' + message);

    //Loop through all the message callbacks.
    for (var lcv=0; lcv < message_callbacks.length; lcv++)
    {
      //Is it the warning message type?
      if (message_callbacks[lcv].key == "warning")
      {
        //Get the callback.
        var callback = message_callbacks[lcv].value;
      
        //Invoke the warning message callback.
        callback(message);
      }
    }
    
  });
  
  //Process error message.
  io.on('error', function(message)
  {
    console.log('CLIENT: -> RECEIVED: Error message = ' + message);

    //Loop through all the message callbacks.
    for (var lcv=0; lcv < message_callbacks.length; lcv++)
    {
      //Is it the error message type?
      if (message_callbacks[lcv].key == "error")
      {
        //Get the callback.
        var callback = message_callbacks[lcv].value;
      
        //Invoke the error message callback.
        callback(message);
      }
    }
  });
  
  //Process connection message.
  io.on('connection', function(message)
  {
    console.log('CLIENT: -> RECEIVED: Connection = ' + message);

    //Loop through all the message callbacks.
    for (var lcv=0; lcv < message_callbacks.length; lcv++)
    {
      //Is it the connection message type?
      if (message_callbacks[lcv].key == "connection")
      {
        //Get the callback.
        var callback = message_callbacks[lcv].value;
      
        //Invoke the connection message callback.
        callback(message);
      }
    }
    
  });
  
  //Process disconnect message.
  io.on('disconnect', function(message)
  {
    console.log('CLIENT: <- RECEIVED: Disconnect message = ' + message);

    //Loop through all the message callbacks.
    for (var lcv=0; lcv < message_callbacks.length; lcv++)
    {
      //Is it the disconnect message type?
      if (message_callbacks[lcv].key == "disconnect")
      {
        //Get the callback.
        var callback = message_callbacks[lcv].value;
      
        //Invoke the disconnect message callback.
        callback(message);
      }
    }
    
  })
  
  return module;
};