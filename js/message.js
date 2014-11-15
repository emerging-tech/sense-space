var messageService = (function(){
  var customUUID = (function getCustomUUID(){
    var uuid = sessionStorage.customUUID || PUBNUB.uuid();
    sessionStorage.setItem('customUUID',uuid); 
    return uuid;
  }());
  
  var currentChannel;
  
  var subscribe = function subscribe(channel, onMessage, onConnect){
    onMessage = onMessage || function(message,env,channel){
      document.getElementById('text').innerHTML += message;
    };
    
    currentChannel = channel;
    
    pubnub.subscribe({                                      
      channel : currentChannel,
      message : onMessage,
      connect : onConnect
    });
  };
  
  var sendMessage = function sendMessage(message, cb){
    pubnub.publish({                                     
         channel : currentChannel,
         message : message,
         callback: cb
    })
  };
  
  var sendLocation = function sendLocation(location){
    if(location){
      sendMessage({
        type : 'location',
        lat: location.latitude,
        lon: location.longitude,
        accuracy : location.accuracy,
        heading : location.heading,
        timestamp : new Date(), 
        uuid : customUUID
      });
    }
  };
  
  var tagUser = function tagUser(otherUser){
    if(otherUser){
      sendMessage({
        type : 'tag',
        victim : otherUser,
        uuid : customUUID
      });
    }
  };
  
  pubnub = PUBNUB.init({                                  
    publish_key   : 'pub-c-f86007fc-87f8-49f5-91b1-a2ab4ed186cc',
    subscribe_key : 'sub-c-f6602896-6cce-11e4-b8ca-02ee2ddab7fe',
    ssl:true,
    uuid: customUUID
  });
  
  return {
    subscribe : subscribe,
    sendMessage : sendMessage,
    sendLocation : sendLocation,
    tagUser : tagUser,
    getUUID : customUUID
  };
}());
