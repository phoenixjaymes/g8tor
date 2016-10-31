/* 
 * File       : app.js
 * Date       : 22 Aug 16
 * Author     : Jaymes Young
 * 
 * Main AngularJS Web Application
 */
'use strict';

angular.module('g8tor', ['ngRoute']);

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



/* 
 * Files      : shop.js
 * Date       : 25 Aug 16
 * Author     : Jaymes Young
 */
'use strict';

angular.module('g8tor')
    .controller('Shopping', function($scope, shoppingCart, viewed) {
      $scope.showProduct = false;

      // Show item details
      $scope.$on('showDetail', function(evt, args) {
        $scope.showProduct = true;
        $scope.productName = $scope.products[args.item].name;
        $scope.productPrice = $scope.products[args.item].price;
        $scope.productImg = $scope.products[args.item].image;
      });
      
      // Hide item details
      $scope.$on('hideDetail', function() {
        $scope.showProduct = false;
      });
      
      // Send to shopCtrl form ng-repeat scope
      $scope.showItemDetail = function(index) {
        $scope.$emit('showDetail', {item : index});
      };
      
      // Send to shopCtrl form ng-repeat scope
      $scope.hideItemDetail = function() {
        $scope.$emit('hideDetail');
      };

      // Add item to cart
      $scope.addItem = function(index) {
        shoppingCart.addItem(index);
      };
      
      // Add item to recentlyViewed
      $scope.addViewed = function(index) {
        viewed.addViewed(index);
      };
      
      
      $scope.logConsole = function(price) {
        console.log('Price: ' + price);
      };
    });

/* 
 * File       : recently-viewed.js
 * Date       : 22 Aug 16
 * Author     : Jaymes Young
 */

'use strict';

angular.module('g8tor')
    .service('viewed', ['$rootScope', function($rootScope) {
      // Viewed Items array
      var viewed = [{"id" : 0}, {"id" : 1}, {"id" : 3}, {"id" : 4}, {"id" : 5}];
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

//# sourceMappingURL=app.js.map
