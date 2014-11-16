var statsService = (function(){
  
  var stats;
  
  function getDistanceFromLatLon(lat1,lon1,lat2,lon2) {
    var R = 6378100; // Radius of the earth in m
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in m
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }  
  
  var createStats = function createStats(uuid){
    stats = {
      uuid : uuid,
      joined : new Date(),
      tagged : [],
      numberOfTimesIt : function(){return this.tagged.length;},
      playTime : function(){return new Date().getTime() - this.joined.getTime();}
    };
  };
  
  var updateDistance = function updateDistance(location){
    var oldLocation = stats.location;
    if(oldLocation){
      stats.distance = stats.distance + getDistanceFromLatLon(oldLocation.latitude, oldLocation.logitude, location.latitude, location.logitude);
    }else{
      stats.distance = 0;
    }
    stats.location = location;
  };
  
  var wasTagged = function wasTagged(){
    stats.tagged.push({start : new Date()});
  };
  
  var taggedPlayer = function taggedPlayer(otherPlayer){
    var lastTagged = stats.tagged[stats.tagged.length-1];
    lastTagged.end = new Date();
    lastTagged.duration = lastTagged.end.getTime() - lastTagged.start.getTime(); // Duration in millis
    lastTagged.victim = otherPlayer;
  };
  
  var getStats = function getStats(){
    return stats;
  }
    
  return {
    createStats : createStats,
    updateDistance : updateDistance,
    wasTagged : wasTagged,
    taggedPlayer : taggedPlayer,
    getStats : getStats
  };
}());
