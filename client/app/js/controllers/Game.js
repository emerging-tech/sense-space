'use strict';


SenseSpaceApp.controller('Game', function($scope, $interval, $window, SendPosition){
        $scope.msg = "Game Mode";
        $scope.deviceData={
            gamerId: "",
            teamId: "",
            latitude:0.0,
            longitude:0.0,
            altitude:0.0,
            accuracy:0.0
        };
    
        $scope.myScore =0;
    
        $scope.center = {
            lat:0,
            lng:0,
            zoom : 18
        };
        $scope.posMarker= {
            position :{
                lat: 0,
                lng: 0,
                message: "This is your actual position",
                focus: true,
                draggable: false
            }
        };
    
        $scope.posPath= {
            circle: {
		                    weight: 2,
		                    color: '#ff612f',
		                    latlngs: $scope.posMarker.position,
		                    radius: 5,
		                    type: 'circleMarker'
	               }
        };

        defaults: {
            scrollWheelZoom: false
        };
    
        $scope.timerTreshold=2000;
    
        $scope.readPos = function(){
             if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
             } else {
                $scope.msg = "Geolocation is not supported by this browser.";
            }
        };
    
        
        $scope.mapheight =function(){
            var height = $window.innerHeight/1.5;
            if (height > 500) height = 500;
            return height;  
        };
    
    
        $scope.mapwidth =function(){
            var width = $window.innerWidth/2;
            if (width > 500) width = 500;
            if (width < 250) width = 250;
            return width;  
        };

    
        function showPosition(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            $scope.$apply(function(){
                $scope.deviceData.latitude = lat;
                $scope.deviceData.longitude = lng;
                //New field : deviceData.lastreading and posMarker.lat lng
                $scope.deviceData.lastreading = new Date();
                $scope.posMarker.position.lat=lat;
                $scope.posMarker.position.lng=lng;
                $scope.center.lat=lat;
                $scope.center.lng=lng;
                // and send it to the server
                SendPosition.sendPos($scope.deviceData)
                 .then( function(){console.log( "Loaded!" );},
                function (errorMessage){
                        console.warn(errorMessage);
                });
            });
        }  
    
        var stop;
        $scope.Refresh = function() {
          if ( angular.isDefined(stop) ) return;
            stop = $interval(function() { 
                if (navigator.geolocation) {
                    // Get position
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                    $scope.$apply(function(){
                        $scope.msg = "Geolocation is not supported by this browser.";
                    });
                }
            }, $scope.timerTreshold);
        };
    
        $scope.$on('$destroy', function () { $interval.cancel(stop); });
});
