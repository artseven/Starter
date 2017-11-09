var myApp = angular.module('myApp', ['ngMessages']);

myApp.controller('mainController', function($log, $scope, $filter) {

    console.log($scope);
    console.log($log);

    $log.log('Hello.');
    $log.info('This is some information');
    $log.warn('Warning!');
    $log.debug('Some debug information');
    $log.error('This was an error!');

    $scope.name = 'John';
    $scope.formattedname = $filter('uppercase')($scope.name)

    $log.log($scope.formattedname);

    

});