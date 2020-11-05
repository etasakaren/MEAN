angular.module('userApp', ['appRoutes', 'userControllers', 'userServices', 'ngAnimate', 'mainController', 'authServices', 'booksController', 'booksServices'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    });