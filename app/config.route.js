/* 
 File     : config.route.js
 Date     : Sep 24, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('g8tor')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {templateUrl : 'app/views/home.html'})
        .when('/shop', {templateUrl : 'app/views/shop.html', controller : 'Shopping'})
        .when('/about', {templateUrl : 'app/views/about.html'})
        .when('/contact', {templateUrl : 'app/views/contact.html'})
        .when('/cart', {templateUrl : 'app/views/cart.html', controller : 'Cart'})
        .otherwise({templateUrl: 'app/views/404.html'});
    }]);