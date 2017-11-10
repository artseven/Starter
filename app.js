

var myApp = angular.module('myApp', ['ngMessages', 'ngResource']);

// myApp.controller('mainController', function($log, $scope, $filter, $resource) {
   myApp.controller('mainController', ['$scope', '$log','$filter','$resource', '$timeout', function($scope, $log, $filter, $resource, $timeout) {
        
    console.log($scope);
    console.log($log);
    console.log($resource);

    $log.log('Hello.');
    $log.info('This is some information');
    $log.warn('Warning!');
    $log.debug('Some debug information');
    $log.error('This was an error!');

    $scope.name = 'Tony';
    $scope.formattedname = $filter('uppercase')($scope.name)

    $timeout(function() {
        $scope.name = 'Everybody';
    }, 3000);

    $log.log($scope.formattedname);

    $scope.handle = '';
    $scope.lowercasehandle = function() {
        return $filter('lowercase')($scope.handle);
    }

    var tb = document.getElementById("name");
    tb.addEventListener("keypress", function(event) {
        console.log("Pressed!");
    })
    console.log(tb);

    $scope.$watch('handle', function(newValue, oldValue) {

        console.info('Changed!');
        console.log('Old: ' + oldValue);
        console.log('New: ' + newValue);

    })

    setTimeout(function() {
        // applies $digest cycle so AngularJS know about changes and re-renders DOM
        $scope.$apply(function() {
            $scope.handle = 'newtwitterhandle';
            console.log('Scope changed!');

        })

    }, 3000);

    $scope.characters = 5;
    $scope.rules = [
        {
            rulename: 'Must be 5 characters'
        },
        {   
            rulename: 'Must not be used elsewhere'
        },
        {
            rulename: 'Must be cool'
        }
        
    ];
    console.log($scope.rules);

    $scope.alertClick = function() {
        alert('Clicked!');
    }

}]);