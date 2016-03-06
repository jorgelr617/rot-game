//Server: Simple Message Infrastucture module for Server.
var message_callbacks = [];

module.exports = function(http_var)
{
  var module = {};
  
  //Check for valid arguments.
  if ((http_var == null) || (http_var === 'undefined'))
    return;
  
  //Open local host connection.
  var io = require('socket.io')(http_var);
  
  
  //Send a message.
  module.send_message = function (message_type, message)
  {
    //Check for valid "message type" argument.
    if ((message_type == null) || (message_type === 'undefined'))
      return;
    
    //Check for valid "message" argument.
    if ((message == null) || (message === 'undefined'))
      return;
    
    console.log("SERVER: -> SENT: " + message_type + ": " + message );
    io.emit(message_type, message);
    
  },
  
  //Register a listener for message type.
  module.receive_message = function (message_type, callback)
  {
    console.log("SERVER: Register " + message_type + " receiver.");
    
    //Check for valid "message type" argument.
    if ((message_type == null) || (message_type === 'undefined'))
      return;
    
    //Check for valid "calback" argument.
    if ((callback == null) || (callback === 'undefined'))
      return;
    
    //Add the message type callback.
    message_callbacks.push({key: message_type, value: callback});
  },
  
  
  io.on('connection', function(socket)
  {
    //Process regular messages.
    socket.on('message', function(message)
    {
      console.log('SERVER: <- RECEIVED: message = ' + message);
      
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
    socket.on('warning', function(message)
    {
      console.log('SERVER: <- RECEIVED: Warning message = ' + message);
      
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
    socket.on('error', function(message)
    {
      console.log('SERVER: <- RECEIVED: Error message = ' + message);
      
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
    socket.on('connection', function(message)
    {
      console.log('SERVER: <- RECEIVED: Connection message = ' + message);

      //Loop through all the message callbacks.
      for (var lcv=0; lcv < message_callbacks.length; lcv++)
      {
        //Is it the conenction message type?
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
    socket.on('disconnect', function(message)
    {
      console.log('SERVER: <- RECEIVED: Disconnect message = ' + message);

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
  
  })
    
  return module;
};