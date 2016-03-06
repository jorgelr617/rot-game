/* Chat Client */
$(function () 
{
  //Defines that JavaScript code that should be executed in "strict mode".
  //It is not a statement, but a literal expression, ignored by earlier versions of JavaScript.
  //The purpose of "use strict" is to indicate that the code should be executed in "strict mode"
  //With strict mode, you can not, for example, use undeclared variables.
  //Source: http://www.w3schools.com/js/js_strict.asp
  "use strict";
  
  //For better performance - to avoid searching in DOM.
  var content = $('#content');
  var input = $('#input');
  var status = $('#status');
  
  //Open local host connection.
  var msg_infra = require('./msg_infra_client.js')('http://localhost:3000');
  
  //Enable user input.
  input.removeAttr('disabled').val('').focus();
  status.text('Enter message:');
  
  //When connection is opened, use this callback.
  msg_infra.receive_message
  (
    "message",
    function(message)
    {
      //Process the message.
      processMessage(message);
    }
  );
  
  //When connection is opened, use this callback.
  msg_infra.receive_message
  (
    "connection",
    function(message)
    {
      console.log("CLIENT: Connection message = " + message);
    
      //First, we want users to enter their names.
      input.removeAttr('disabled').val('').focus();
      status.text('Enter message:');
    }
  );
  
  //When connection is closed, use this callback.
  msg_infra.receive_message
  (
    "disconnect",
    function(message)
    {
      console.log("CLIENT: Disconnect message = " + message);
    
      //First, we want users to enter their names.
      input.removeAttr('disabled').val('').focus();
      status.text('Enter message:');
    }
  );
  
  //When there is a warning, use this callback.
  msg_infra.receive_message
  ( 
    "warning", 
    function (warning) 
    {
      //Just in case there were some problems with the connection...
      content.html($("<p>", { text: "Sorry, but there's some problem with your "
                              + "connection or the server is down." } ));
    }
  );
  
  //When there is an error, use this callback.
  msg_infra.receive_message
  ( 
    "error",
    function (error)
    {
      //Just in case there were some problems with the connection...
      content.html($("<p>", { text: "Sorry, but there's some problem with your "
                              + "connection or the server is down." } ));
    }
  );
  
  //Most important part - handle incoming messages using this handler.
  function processMessage(event) 
  {
    //Extract the message.
    var message = event; 
    
    //Try to parse JSON message. Because we know that the server always returns
    //JSON this should work without any problem but we should make sure that
    //the massage is not chunked or otherwise damaged.
    try 
    {
      var json = JSON.parse(message);
    } 
    catch (exception) 
    {
      console.log("This doesn't look like a valid JSON: ", message);
      return;
    }
    
    //NOTE: If you're not sure about the JSON structure
    //check the server source code above.
    if (json.msg === 'chat_message') 
    { //It's a single message.
      
      //Let the user write another message.
      input.removeAttr('disabled');
      
      //Add a message.
      addMessage(json.data, new Date());
      
      slideScrollbar();
    } else 
      {
        console.log("Hmm..., I've never seen JSON like this: ", json);
      }
  }
  
    
  /**
   * Send message when user presses the Enter key.
   */
  input.on
  (
    'keydown',
    function(event)
    {
      if (event.keyCode === 13) 
      {
        //Get the message.
        var temp = $(this).val();
        
        var msg = '{ "msg": "chat_message", "data":"' + temp + '"}';
        
        //Send the message as an ordinary text.
        msg_infra.send_message("message", msg);
        
        //Clear the message. 
        $(this).val('');
      
      }
    }
  );
  
  /**
   * Add message to the chat window.
   */
  function addMessage(data, datetime) 
  {
    content.append('<p>'
                  + (datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()) + ':'
                  + (datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes())
                  + ': ' + data + '</p>');
  }
    
    
  /**
   *  Make it a little more user friendly
   */
  var scrollbar = $('body > section:first').tinyscrollbar();
  
  function slideScrollbar() 
  {
    scrollbar.update();
    scrollbar.move(Math.max(0, content.find('> p').length - 9) * 18);
  }
    
});




