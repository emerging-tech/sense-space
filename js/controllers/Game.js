'use strict';


SenseSpaceApp.controller('Game', function($scope, $interval, $window, $rootScope, SendPosition, PubNub){
    var customUUID = (function getCustomUUID(){
        var uuid = sessionStorage.customUUID || PUBNUB.uuid();
        sessionStorage.setItem('customUUID',uuid); 
        return uuid;
    }());
    
    PubNub.init({                                  
        publish_key   : 'pub-c-f86007fc-87f8-49f5-91b1-a2ab4ed186cc',
        subscribe_key : 'sub-c-f6602896-6cce-11e4-b8ca-02ee2ddab7fe',
        ssl:true,
        uuid: customUUID
    });
    
    $scope.channel = 'game0';
    
    
    $scope.players = [];
    
    PubNub.ngSubscribe({ channel: $scope.channel })

    $rootScope.$on(PubNub.ngMsgEv($scope.channel), function(event, payload) {
        var message = payload.message;
        if(message.gamerId !== $scope.deviceData.gamerId){
            $scope.players[message.gamerId] = message;
            $scope.posMarker[message.gamerId.replace(/\-/g,'')] = {
               lat: message.latitude,
               lng: message.longitude,
               message: message.gamerId,
               focus: false,
               draggable: false,
               icon: {
                    type: 'div',
                    iconSize: [10, 10],
                    className: 'red',
                    iconAnchor:  [5, 5]
                }
            };
        }
    })

    $rootScope.$on(PubNub.ngPrsEv($scope.channel), function(event, payload) {
        $scope.playerCount = payload.event.occupancy;
        $scope.players = [];
        for(var i=0;i<$scope.playerCount;i++){
            if(payload.event.uuids && payload.event.uuids[i].uuid){
                $scope.players[payload.event.uuids[i].uuid] = {};
            }
        }
    });
    
    PubNub.ngHereNow({ channel: $scope.channel })
    
    
    $scope.msg = "Game Mode";
    $scope.deviceData={
        gamerId: customUUID,
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
    $scope.posMarker= {};

    $scope.posPath= {};

    defaults: {
        scrollWheelZoom: false
    };

    $scope.timerTreshold=1000;

    navigator.geolocation.watchPosition(showPosition, undefined, {enableHighAccuracy:true,timeout: 5000,maximumAge: 0});
    $scope.readPos = function(){
        //  if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(showPosition, undefined, {enableHighAccuracy:true});
        //  } else {
        //     $scope.msg = "Geolocation is not supported by this browser.";
        // }
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
            $scope.posMarker.me = {
               lat: lat,
               lng: lng,
               message: "This is your actual position",
               focus: false,
               draggable: false
            };
            $scope.posPath.me = {
                weight: 2,
                color: '#1000FD',
                latlngs: $scope.posMarker.me,
                radius: 10,
                type: 'circleMarker'
            };
            if(!$scope.center.lat && !$scope.center.lng){
                $scope.center.lat=lat;
                $scope.center.lng=lng;
            }
            // // and send it to the server
            // SendPosition.sendPos($scope.deviceData)
            //  .then( function(){console.log( "Loaded!" );},
            // function (errorMessage){
            //         console.warn(errorMessage);
            // });
            PubNub.ngPublish({
                channel: $scope.channel,
                message: $scope.deviceData
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
