SenseSpaceApp.service('SendPosition', function($q, $http) {

    console.log("Sending new position");
  
    return({
        sendPos: sendPos
    });
     

        
    function sendPos(deviceData) {
        console.log(" gamer ID: " + deviceData.gamerId);
        var request = $http({
            method: "post",
            url: "/api/position",
             data:{
                gamerId: deviceData.gamerId,
                teamId: deviceData.teamId,
                latitude: deviceData.latitude,
                longitude: deviceData.longitude,
                accuracy: deviceData.accuracy
            }
        });
        return( request.then( handleSuccess, handleError ) );
      }
    
    
    function handleError( response ) {
        if (
        ! angular.isObject( response.data ) ||
        ! response.data.position
        ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        return( $q.reject( response.data.position ) );
     }
    function handleSuccess( response ) { return( response.data );  }
    
});