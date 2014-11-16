'use strict';


SenseSpaceApp.controller('NavController', function($scope, $location){
    $scope.isCollapsed = true;
    $scope.$on('$routeChangeSuccess', function () {
        $scope.isCollapsed = true;
    });
    
    $scope.getClass = function (path) {
        if(path === '/') {
            if($location.path() === '/') {
                return "active";
            } else {
                return "";
            }
        }

        if ($location.path().substr(0, path.length) === path) {
            return "active";
        } else {
            return "";
        }
    }
    
});
