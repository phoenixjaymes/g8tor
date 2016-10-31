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
