/* 
 File     : config.js
 Date     : Sep 24, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('g8tor')
    .run(function($rootScope, products) {
      // Get products
      products.getProducts(function(response) {
        $rootScope.products = response.data;
      });
    });
