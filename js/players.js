var playersService = (function(){
  
  var players = [];
  
  var addPlayer = function addPlayer(uuid){
    players[uuid] = {
      uuid : uuid,
      added : new Date()
    };
    return players[uuid];
  };
  
  var removePlayer = function removePlayer(uuid){
    delete players[uuid];
  };
  
  var getPlayer = function getPlayer(uuid){
    return players[uuid];
  };
  
  var updatePlayerLocation = function updatePlayerLocation(uuid, location){
    var player = players[uuid];
    if(!player) player = addPlayer(uuid);
    player.location = location;
    players[uuid] = player;
  };
  
  var batchUpdate = function batchUpdate(participantUUIDs){
    // Remove players that have left
    _.foreach(players, function(player){
      if(!_.contains(participantUUIDs, player.uuid)){
        removePlayer(uuid);
      }
    });    
    /// Add new players
    _.foreach(participantUUIDs, function(uuid){
      if(!player[uuid]) addPlayer(uuid);
    });
  };
  
  return {
    addPlayer : addPlayer,
    removePlayer : removePlayer,
    getPlayer : getPlayer,
    batchUpdate : batchUpdate,
    updatePlayerLocation : updatePlayerLocation
  };
}());
