var app = angular.module("myApp", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/home.html"
        })
        .when("/about", {
            templateUrl: "partials/about.html"
        })
        .when("/products", {
            templateUrl: "partials/products.html"
        })
        .when("/products/:productID", {
            templateUrl: "partials/product-single.html"
        })
        .when("/contact", {
            templateUrl: "partials/contact.html"
        })
        .when("/admin", {
            templateUrl: "partials/admin.html"
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller("HeaderController", function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});

app.controller("productsFeaturedCarousel", function ($scope, $http) {
    $http.get("js/products.json").then(function (response) {
        $scope.products = response.data;
        $scope.isFeatured = function (products) {
            return products.featured == true;
        };
    });
});

app.controller("productsList", function ($scope, $http) {
    $http.get("js/products.json").then(function (response) {
        $scope.products = response.data;
        $scope.layout = 'grid';
    });


    // Shopping Cart
    $scope.cart = [];

    var findItemById = function (items, id) {
        return _.find(items, function (item) {
            return item.id === id;
        });
    };

    $scope.getCost = function (item) {
        return item.qty * item.price;
    };

    $scope.addItem = function (itemToAdd) {
        var found = findItemById($scope.cart, itemToAdd.id);
        if (found) {
            found.qty += itemToAdd.qty;
        } else {
            $scope.cart.push(angular.copy(itemToAdd));
        }
    };

    $scope.getTotal = function () {
        var total = _.reduce($scope.cart, function (sum, item) {
            return sum + $scope.getCost(item);
        }, 0);
        return total;
    };

    $scope.clearCart = function () {
        $scope.cart.length = 0;
    };

    $scope.removeItem = function (item) {
        var index = $scope.cart.indexOf(item);
        $scope.cart.splice(index, 1);
    };
});

app.controller("productSingle", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.id = $routeParams.productID;
    $http.get("js/products.json").then(function (response) {
        $scope.products = response.data;
        $scope.selectedProduct = function (products) {
            return products.id == $scope.id;
        };
    });
}]);

app.controller("adminProducts", function ($scope, $http) {
    $http.get("js/products.json").then(function (response) {
        $scope.items = response.data;
    });

    $scope.addItem = function (item) {
        $scope.items.push(item);
        $scope.item = {};
    },

    $scope.removeItem = function (index) {
        $scope.items.splice(index, 1)
    },
    $scope.editItem = function (index) {
        $scope.editing = $scope.items.indexOf(index);
    }

});