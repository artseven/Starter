

var myApp = angular.module('myApp', ['ngMessages', 'ngResource', 'ngRoute']);

    myApp.config(function ($routeProvider, $locationProvider) {
        //best practice
        $routeProvider
        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })
        .when('/second', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        });
    });
// myApp.controller('mainController', function($log, $scope, $filter, $resource) {
   myApp.controller('mainController', 
            ['$scope','$log','$filter','$resource','$timeout', '$http', '$location', 'nameService',
    function ($scope, $log, $filter, $resource, $timeout, $http, $location, nameService ) {
    
        
    // console.log($scope);
    // console.log($log);
    // console.log($resource);

    $log.log('Hello.');
    $log.info('This is some information');
    $log.warn('Warning!');
    $log.debug('Some debug information');
    $log.error('This was an error!');

    $scope.name = 'Tony';
    $scope.formattedname = $filter('uppercase')($scope.name);

    $timeout(function() {
    }, 3000);

    $log.log($scope.formattedname);

    $scope.handle = '';
    $scope.lowercasehandle = function() {
        return $filter('lowercase')($scope.handle);
    };

    var tb = document.getElementById("name");
    tb.addEventListener("keypress", function(event) {
        console.log("Pressed!");
    });
    console.log(tb);

    $scope.$watch('handle', function(newValue, oldValue) {

        console.info('Changed!');
        console.log('Old: ' + oldValue);
        console.log('New: ' + newValue);

    });

    setTimeout(function() {
        // applies $digest cycle so AngularJS know about changes and re-renders DOM
        $scope.$apply(function() {
            $scope.handle = 'newtwitterhandle';
            console.log('Scope changed!');

        });

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
    };

    // $http.get('/api')
    //     .success(function (result) {
    //         $scope.rules = result;
    //     })
    //     .error(function (data, status) {
    //         console.log(data);
    //     });

    $log.info($location.path());

    $scope.name = nameService.name;
    // manual watch to detect changes to service variable
    $scope.$watch('name', function() {
        nameService.name = $scope.name;
    });
    $log.log(nameService.name);
    $log.log(nameService.nameLength());

    $scope.people = [
        {
            name: 'John Doe',
            address: '555 Main St.',
            city: 'New York',
            state: 'NY',
            zip: '11111'
        },
        {
            name: 'Jane Doe',
            address: '333 Second St.',
            city: 'Buffalo',
            state: 'NY',
            zip: '22222'
        },
        {
            name: 'George Doe',
            address: '111 Third St.',
            city: 'Miami',
            state: 'FL',
            zip: '33130'
        }
    ];

    $scope.formattedAddress = function(person) {
        return person.address + ', ' + person.city + ', ' + person.state + ' ' + person.zip;
    };


}]);

myApp.service('nameService', function(){
    
    var self = this;
    this.name = 'John Doe';

    this.nameLength = function() {
        return self.name.length;
    };


});

myApp.controller('secondController', [
            '$scope','$routeParams','nameService','$log',
    function($scope, $routeParams, nameService, $log) {

    $scope.name = nameService.name;
        
    $scope.num = $routeParams.num || 1;
    


}]);

myApp.directive("searchResults", function() {
    return {
        // Attribute <div search-results> 
        // Element  <search-results> 
        // Class <div class="search-results">
        // coMment <!-- directive: search-results -->
        restrict: 'AECM',
        // template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">Doe, John</h4><p class="list-group-item-text">555 Main St., New York, NY 11111</p></a>',
        templateUrl: 'directives/searchresults.html',
        // to delete <search-results></search-results> from DOM
        // and insert just a template
        replace: true,
        // isolate the scope from page model
        scope: {
            // = is two way binding allowing passing an object
            personObject: "=",
            // @ sign is for text
            personName: "@",
            personAddress: "@",
            // & is for function
            formattedAddressFunction: "&" 
        },
        compile: function(elem, attrs) {

            console.log('Compiling...');
            // removes all the classes in the template HTML output
            elem.removeAttr('class');
            console.log(elem.html());

            return {
                pre: function(scope, elements, attrs) {
                    console.log('Pre-linking...');
                    console.log(elements);
                },
                post: function(scope, elements, attrs) {
                    console.log('Post-linking...');
                    console.log(elements);
                }
            };
        }
    };
});