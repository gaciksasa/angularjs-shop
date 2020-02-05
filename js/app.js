var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
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
        .when("/contact", {
            templateUrl: "contact.html"
        });
});

app.controller("productsFeaturedCarousel", function ($scope, $http) {
    $http.get("js/products.json")
    .then(function (response) {
        $scope.products = response.data;
        $scope.isFeatured = function(products) {
            return products.featured == true;
        };
    });
});