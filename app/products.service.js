/* 
 * File       : product-data.js
 * Date       : 22 Aug 16
 * Author     : Jaymes Young
 */

'use strict';

angular.module('g8tor')
    .service('products', function($http) {
  
      // Get products
      this.getProducts = function(callback) {
        var fullDate = new Date();    // Prevent using cached information
        $http.get('mock/products.json?date=' + fullDate)
            .then(callback);
      };
});

