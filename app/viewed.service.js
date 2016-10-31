/* 
 * File       : recently-viewed.js
 * Date       : 22 Aug 16
 * Author     : Jaymes Young
 */

'use strict';

angular.module('g8tor')
    .service('viewed', ['$rootScope', function($rootScope) {
      // Viewed Items array
      var viewed = [];
      
      // Check to see if item is already in viewed array
      // Check that item is not in cart
      var inCart = function(index) {      
        for(var i = 0; i < viewed.length; i++) {
          if (viewed[i].id === index) {
            return true;
          }
        }
          return false;
      };
      
      // Add item to recently viewed array
      this.addViewed = function(index) {
        // Add item to cart if it is not already in it
        if (!inCart($rootScope.products[index].id)) {
           viewed.push({"id"  : index});
        }
      };
      
      // Get viewed count
      this.getViewedCount = function() {
        return viewed.length;
      };
      
      
      // Remove item from recently viewed array
      this.removeItem = function(index) {
        console.log("Removing item from recetly viewed");
      };
      
      
      // Return recently viewed array
      this.getViewed = function() {
        return viewed;
      };
}]);
