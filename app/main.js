/* 
 * Files      : main.js
 * Date       : 25 Aug 16
 * Author     : Jaymes Young
 */

'use strict';

angular.module('g8tor')
    .controller('Main', function($scope, shoppingCart) {
      $scope.cartCount = shoppingCart.getCartCount();
      //$scope.cart = [];
     
      $scope.$on('cartCountChange', function(evt, cnt) {
        $scope.cartCount = cnt;
      });
      
      
      // Add item to cart and update cart count
      $scope.$on('updateCart', function(evt, args) {
        // Add item to cart if it is not already in it
        if (!$scope.inCart($scope.products[args.item].id)) {
           $scope.cart.push({"id"  : $scope.products[args.item].id, "qty" : 1});
        }
      });
});
