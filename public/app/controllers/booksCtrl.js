angular.module('booksController', ['userServices', 'booksServices', 'authServices'])
    .controller('booksCtrl', function($http, $location, $timeout, User, Auth, Books, $rootScope, $scope) {
        var app = this;

        app.editBook = false;
        app.deleteBook = false;
        Auth.getUser().then(function(data) {
            app.user = data.data._id;
            app.title = data.data.title;
            app.desc = data.data.desc;
        })

        Books.getBooks().then(function(data) {
            if (data.data.success) {
                app.editBook = true;
                app.deleteBook = true;
                app.books = data.data.books;
                app.array_books = [];
                for (var i = 0; i < app.books.length; i++) {
                    app.array_books.push({
                        title: app.books[i].title,
                        desc: app.books[i].desc,
                        editing: false,
                    });
                }
                console.log(app.array_books);
            } else {
                app.errorMsg = 'No books'
            }
        })

        this.doBooks = function(booksData) {
            app.loading = true;
            app.errorMsg = false;
            app.successMsg = false;

            Books.books(app.booksData).then(function(data) {
                if (data.data.success) {
                    app.loading = false;
                    app.successMsg = data.data.message + '...Redirecting';
                    $timeout(function() {
                        $location.path('/profile');
                    }, 2000);
                } else {
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            });
        };
        app.doEdit = function(id_books) {
            app.errorMsg = false;
            Books.editBooks(id_books).then(function(data) {
                if (data.data.success) {
                    console.log("Clicked.");
                    app.edit_books = data.data.books;
                    $scope.updateData = {
                        title: app.edit_books.title,
                        desc: app.edit_books.desc
                    }
                }
            })
        };
        app.doUpdate = function(id_data) {
            var app = this;
            app.errorMsg = false;
            app.successMsg = false;
            app.loading = true;
            console.log("hello update");
            Books.updateData($scope.updateData, id_data).then(function(data) {
                if (data.data.success) {
                    app.successMsg = data.data.message;
                    app.loading = false;
                    getBooks();
                } else {
                    app.errorMsg = data.data.message;
                    app.loading = false;
                }
            })
        };

        $scope.editItem = function(item, id_books) {
            app.doEdit(id_books);
            item.editing = true;
        }

        app.doDeletion = function(id_books) {
            app.errorMsg = false;
            app.successMsg = false;
            app.loading = true;
            Books.delBooks(id_books).then(function(data) {
                if (data.data.success) {
                    app.successMsg = data.data.message;
                    app.loading = false;
                    getBooks();
                    app.successMsg = false;
                    app.loading = false;
                } else {
                    app.errorMsg = data.data.message;
                    app.loading = false;
                }
            })
        };

        function getBooks() {
            Books.getBooks().then(function(data) {
                if (data.data.success) {
                    app.editBook = true;
                    app.deleteBook = true;
                    app.books = data.data.books;
                    app.array_books = [];
                    for (var i = 0; i < app.books.length; i++) {
                        app.array_books.push({
                            title: app.books[i].title,
                            desc: app.books[i].desc,
                            editing: false,
                        });
                    }
                    console.log(app.array_books);
                } else {
                    app.errorMsg = 'No books'
                }
            })
        }
    });