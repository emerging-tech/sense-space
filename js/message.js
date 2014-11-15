var messageService = (function(){
  var customUUID = (function getCustomUUID(){
    var uuid = sessionStorage.customUUID || PUBNUB.uuid();
    sessionStorage.setItem('customUUID',uuid); 
    return uuid;
  }());
  
  var subscribe = function subscribe(channel, onMessage, onConnect){
    onMessage = onMessage || function(message,env,channel){
      document.getElementById('text').innerHTML += message;
    };
    
    pubnub.subscribe({                                      
      channel : channel,
      message : onMessage,
      connect : onConnect
    });
  };
  
  var sendMessage = function sendMessage(channel, message, cb){
    pubnub.publish({                                     
         channel : channel,
         message : message,
         callback: cb || function(m){ console.log('Sent: ' + m) }
    })
  };
  
  pubnub = PUBNUB.init({                                  
    publish_key   : 'pub-c-f86007fc-87f8-49f5-91b1-a2ab4ed186cc',
    subscribe_key : 'sub-c-f6602896-6cce-11e4-b8ca-02ee2ddab7fe',
    uuid: customUUID
  });
  
  return {
    subscribe : subscribe,
    sendMessage : sendMessage,
    getUUID : customUUID
  };
}());
