var myApp = angular.module('myApp', []);

myApp.controller('mainController', function($scope, $log) {
    console.log($log);
    console.log($scope);
});