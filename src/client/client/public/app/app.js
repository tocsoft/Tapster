/// <reference path="../../../bower_components/angular/angular.js" />
'use strict';

// Declare app level module which depends on views, and components
var tapster = angular.module('tapster', [
  'ngRoute'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: 'drinks' });

    $routeProvider.when('drinks', {
        templateUrl: 'app/drinks/list.html',
        controller: 'List'
    });
}]);