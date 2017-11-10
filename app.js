var myApp = angular.module('myApp', ['ngMessages', 'ngResource']);

// myApp.controller('mainController', function($log, $scope, $filter, $resource) {
   myApp.controller('mainController', ['$scope', '$log','$filter','$resource', function($scope, $log, $filter, $resource) {
        
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

    $log.log($scope.formattedname);



}]);