var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })
    .when("/about", {
        templateUrl : "about.html"
    })
    .when("/products", {
        templateUrl : "products.html"
    })
    .when("/contact", {
        templateUrl : "contact.html"
    });
});