'use strict';


SenseSpaceApp.controller('Dashboard', function($scope, $interval, ReadPositions){
        $scope.msg = "this is  Dashboard";
    
        $scope.timerTreshold=5000;
        $scope.lastreading = new Date();
    
        var stop;
        $scope.Refresh = function() {
          if ( angular.isDefined(stop) ) return;
            stop = $interval(function() { 
               ReadPositions.ReadAllPositions().then(function (response) {
                    $scope.positions = response.data.positions;
              }, function (error) {
                    console.error(error);
              });
            }, $scope.timerTreshold);
        };
    
        $scope.$on('$destroy', function () { $interval.cancel(stop); });
});
