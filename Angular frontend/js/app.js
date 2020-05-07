'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
}]);


(function(){
    var app = angular.module('myApp', []);
    app.controller('FormController', ['$scope', '$http', function($scope, $http){
        $scope.step = 1;
        $scope.nextStep = function() {
            $scope.step++;
        }
        $scope.prevStep = function() {
            $scope.step--;
        }
        //When submitting send to api server
        $scope.submitForm = function() {
            $http({
        url: 'https://athletes-form.herokuapp.com/athleteData',
        method: 'POST',
        data: $scope.data
    }).then(function (httpResponse) {
        console.log('response:', httpResponse);
    })
            //Then get all athletes
            var request = $http.get('https://athletes-form.herokuapp.com/athleteData').then(function (response) {
        $scope.athletes = response.data;
        console.log(response.data);
        return response.data; 
    });
        }
    }]);
})();