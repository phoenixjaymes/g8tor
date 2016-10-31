/* 
 * Files      : shop.js
 * Date       : 26 Aug 16
 * Author     : Jaymes Young
 */
'use strict';

angular.module('g8tor')
    .controller('Cart', function($scope, shoppingCart, viewed) {
      $scope.msgViewed = '';
      $scope.viewedCount = viewed.getViewedCount();
      $scope.cart = shoppingCart.getCart();
      
      // Message for cart heading
      if (shoppingCart.getCartCount() === 0) {
        $scope.msg = 'Your cart is currently empty';
      } else {
        $scope.msg = 'Here are the items in your cart ';
      }
      
      // Message for viewed heading
      if ($scope.viewedCount !== 0) {
        $scope.msgViewed = 'Your recently viewed items';
      }
      
      // Get recently view
      $scope.viewed = viewed.getViewed();
      
      // Cart total
      $scope.cartTotal = shoppingCart.getCartTotal();
      
      
      // Item quantity change
      $scope.qtyChange = function(index, qty) {
        shoppingCart.quantityChange(index, qty);
      };
      
      // Delete item from cart
      $scope.deleteItem = function(id) {
        shoppingCart.deleteItem(id);
      };
      
      // Change cart total
      $scope.$on('cartTotalChange', function(evt, args) {
        $scope.cartTotal = args;
      });
      
      $scope.$on('cartCountChange', function(evt, args) {
        if(args === 0) {
          $scope.msg = $scope.msg = 'Your cart is currently empty';
        }
      }); 
});