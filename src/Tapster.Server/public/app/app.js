
var tapster = angular.module('tapster', [
    'restangular'
    ])

  .controller('PumpsController', ['$scope', 'Restangular', '$http', function ($scope, Restangular, $http) {
    
    $scope.pumps = [];
    
    var pumpsApi = Restangular.all('pumps');
    
    var updatePumps = function (res) {
        $scope.pumps = res.data;
        $scope.pumps.forEach(function (pump) {
            
            function update(res) {
                angular.extend(pump, res.data);
            }            ;
            pump.forward = function () {
                
                $http.post('/pumps/' + pump.name + '/forward').then(update);
            };
            
            pump.reverse = function () {
                $http.post('/pumps/' + pump.name + '/reverse').then(update);
            };
            
            pump.stop = function () {
                $http.post('/pumps/' + pump.name + '/stop').then(update);
            };
        });
    }
    
    $http.get('/pumps').then(updatePumps);
    
    
    $scope.forwardAll = function () {
        
        $http.post('/pumps/forward').then(updatePumps);
    };
    $scope.reverseAll = function () {
        
        
        $http.post('/pumps/reverse').then(updatePumps);
    };
    $scope.stopAll = function () {
        
        
        $http.post('/pumps/stop').then(updatePumps);
    };

}]);