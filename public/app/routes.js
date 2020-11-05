angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
        templateUrl: 'app/views/pages/home.html'
    })

    .when('/register', {
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register'
    })

    .when('/login', {
        templateUrl: 'app/views/pages/users/login.html',
    })

    .when('/logout', {
        templateUrl: 'app/views/pages/users/logout.html',
    })

    .when('/profile', {
        templateUrl: 'app/views/pages/users/profile.html',
        controller: 'booksCtrl',
        controllerAs: 'books',
    })

    .when('/books', {
            templateUrl: 'app/views/pages/books/books.html',
            controller: 'booksCtrl',
            controllerAs: 'books',
        })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }); // Required to remove AngularJS hash from URL (no base is required in index file)
});