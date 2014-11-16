SenseSpaceApp.service('ReadPositions', function($q, $http) {
   console.log("Reading all positions");
   return {
      ReadAllPositions: function () {
        var deferred = $q.defer(),
        httpPromise = $http.get('/api/positions');
        httpPromise.then(function (response) {
        
        deferred.resolve(response);
        }, function (error) {
          console.error(error);
        });
 
        return deferred.promise;
      }
    };
        
});
      