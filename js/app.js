var app = angular.module("myApp", ["ngRoute"]);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html"
        })
        .when("/about", {
            templateUrl: "about.html"
        })
        .when("/products", {
            templateUrl: "products.html"
        })
        .when("/products/:productID", {
            templateUrl: "product-single.html"
        })
        .when("/contact", {
            templateUrl: "contact.html"
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller("HeaderController", function($scope, $location) { 
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


