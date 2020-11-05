var User = require('../models/user');
var Books = require('../models/books');
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';

module.exports = function(router) {
    //http://localhost:8080/api/users
    //USER REGISTRATION ROUTE
    router.post('/users', function(req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
            res.json({
                success: false,
                message: 'Ensure username, email, and password were provided'
            });

        } else {
            user.save(function(err) {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Username or email already exists.'
                    });
                } else {
                    res.json({
                        success: true,
                        message: 'User successfully created.'
                    });
                }
            });
        }
    });
    // USER LOGIN ROUTE
    // http://localhost:8080/api/authenticate
    router.post('/authenticate', function(req, res) {
        User.findOne({ username: req.body.username }).select('email username password').exec(function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Could not authenticate user' });
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
                    res.json({ success: false, message: 'No password provided' });
                }
                if (!validPassword) {
                    res.json({ success: false, message: 'Could not authenticate password' });
                } else {
                    var token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, secret, { expiresIn: '24h' });
                    res.json({ success: true, message: 'User authenticated', token: token });
                }
            }
        })
    });

    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' });
        }
    });

    // BOOKS ROUTE
    // http://localhost:8080/api/books
    router.post('/books', function(req, res) {
        var books = new Books();
        books.title = req.body.title;
        books.desc = req.body.desc;
        books.librarian_id = req.decoded._id;

        books.save(function(err) {
            if (err) {
                res.json({ success: false, message: "Assigning book failed." })
            } else {
                res.json({ success: true, message: "Assigning book succeeded." })
            }
        })
    });

    // GET BOOKS ROUTE
    // http://localhost:8080/api/getbooks
    router.get('/getbooks', function(req, res) {
        var books = new Books();

        Books.find({}, (function(err, books) {
            if (err) throw err;
            else {
                if (!books) {
                    res.json({ success: false, message: "No books found." })
                } else {
                    res.json({ success: true, books: books })
                }
            }
        }))
    });

    // EDIT ROUTE
    // http://localhost:8080/api/profile/edit/:id
    router.get('/profile/edit/:id', function(req, res) {
        Books.findOne({ _id: req.params.id }, function(err, books) {
            if (err) throw err;
            else {
                if (!books)
                    res.json({ success: false, message: "No book was found." });
                else {
                    res.json({ success: true, books: books });
                }
            }
        });
    });

    // UPDATE ROUTE
    // http://localhost:8080/api/profile/update/:id
    router.post('/profile/update/:id', function(req, res) {
        Books.findOne({ _id: req.params.id }, function(err, books) {
            if (err) throw err;
            else {
                if (!books)
                    res.json({ success: false, message: "No book was found." });
                else {
                    books.title = req.body.title;
                    books.desc = req.body.desc;
                    books.save().then(product => {
                        res.json({ success: true, message: "Book successfully edited." });
                    })
                }
            }
        });
    });

    // DELETE ROUTE
    // http://localhost:8080/api/profile/delete/:id
    router.delete('/profile/delete/:id', function(req, res) {
        Books.findOneAndRemove({ _id: req.params.id }, function(err, books) {
            if (err) throw err;
            else {
                if (!books)
                    res.json({ success: false, message: "No book was found." });
                else {
                    res.json({ success: true, message: "Book successfully deleted." });
                }
            }
        });
    });
    router.post('/me', function(req, res) {
        res.send(req.decoded);
    });


    return router;
}




// jwt.sign({
//     data: 'foobar'
// }, 'secret', { expiresIn: '1h' });