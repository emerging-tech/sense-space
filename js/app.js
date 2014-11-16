'use strict';
var SenseSpaceApp=angular.module('SenseSpaceApp', ['ngRoute', 'leaflet-directive', "pubnub.angular.service"])
    .config(function($routeProvider, $locationProvider){
    
    // Routes ---------------------------------    
    $routeProvider.when('/Dashboard',{
        controller: 'Dashboard',
        templateUrl:'partials/Dashboard.html'
    });          
    $routeProvider.when('/Game',{
        controller: 'Game',
        templateUrl:'partials/Game.html'
    });
    $routeProvider.when('/Simulator',{
        controller: 'Simulator',
        templateUrl:'partials/Simulator.html'
    });
    //-----------------------------------------
});
