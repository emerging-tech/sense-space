var playersService = (function(){
  
  var players = [];
  
  var addPlayer = function addPlayer(uuid, location){
    if(!_.contains(players, uuid)){
      players.push({
        uuid : uuid,
        location : location
      });
    }
  };
  
  var getPlayer = function getPlayer(uuid){
    return _.first(players, function(player){
      return player.uuid === uuid;
    })
  };
  
  var updatePlayerLocation = function updatePlayerLocation(uuid, location){
    _.forEach(player, function(player, index){
      if(player.uuid === uuid){
        player.location = location;
        players[i] = player;
      }
    })
  };
  
  return {
    addPlayer : addPlayer,
    getPlayer : getPlayer,
    updatePlayerLocation : updatePlayerLocation
  };
}());
