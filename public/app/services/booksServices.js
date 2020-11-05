angular.module('booksServices', [])
    .factory('Books', function($http) {
        booksFactory = {};
        booksFactory.books = function(booksData) {
            return $http.post('/api/books', booksData);
        };
        booksFactory.getBooks = function() {
            return $http.get('/api/getbooks');
        };
        booksFactory.editBooks = function(id_books) {
            return $http.get('/api/profile/edit/' + id_books);
        };
        booksFactory.updateData = function(updateData, id_books) {
            return $http.post('/api/profile/update/' + id_books, updateData);
        };
        booksFactory.delBooks = function(id_books) {
            return $http.delete('/api/profile/delete/' + id_books);
        };

        return booksFactory;
    })