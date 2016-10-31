/* 
 * File       : shopping-cart.js
 * Date       : 22 Aug 16
 * Author     : Jaymes Young
 */

'use strict';

angular.module('g8tor')
    .service('shoppingCart', ['$rootScope', function($rootScope, viewed) {
      // Shopping Cart
      var cart = [];
      var cartQty = 0;
      var cartTotal = 0;
      
      // Check to see if item is already in the cart
      var inCart = function(index) {      
        for(var i = 0; i < cart.length; i++) {
          if (cart[i].id === index) {
            return true;
          }
        }
          return false;
      };
      
      
      // Add item to cart
      this.addItem = function(index) {
        
        // Add item to cart if it is not already in it
        if (!inCart(index)) {
           cart.push({"id"  : index, "qty" : 1});
           
           // Remove item from recently viewed
           
           // Broadcast change in cart size
           $rootScope.$broadcast('cartCountChange', this.getCartCount());
        }
      };

      
      // delete item from cart
      this.deleteItem = function(id) {
        cart.splice(id,1);
        
        // Broadcast change in cart size and change in cart total
        this.broadcastUpdates();
      };
      
      
      // Change single item quantity
      this.quantityChange = function(id, qty) {
        cart[id].qty = parseInt(qty);
        
        // Broadcast change in cart size and change in cart total
        this.broadcastUpdates();
      };
      
      
      // Get cart count
      this.getCartCount = function() {
        var count = 0;
        for(var i = 0; i < cart.length; i++) {
          count += cart[i].qty;
        }
        
        // count = NaN make it 0
        if (isNaN(count)) {
          count = 0;
        }
        
        cartQty = count;
        return cartQty;
      };
      
      
      // Get cart
      this.getCart = function() {
        return cart;
      };
      
    
      // Cart total
      this.getCartTotal = function() {
        var total = 0;
                
        for (var i = 0; i < cart.length; i++) {
          total += ($rootScope.products[cart[i].id].price * cart[i].qty);
        }
        
        // totalotal = NaN make it 0
        if (isNaN(total)) {
          total = 0;
        }
        
        cartTotal = total.toFixed(2);
        return cartTotal;
      };
      
      this.broadcastUpdates = function() {
        $rootScope.$broadcast('cartCountChange', this.getCartCount());
        $rootScope.$broadcast('cartTotalChange', this.getCartTotal());
      };
}]);


