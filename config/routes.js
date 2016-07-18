var express = require('express'),
    router  = new express.Router();

// Require controllers.

var usersController = require('../controllers/users');


// root path:
// router.get('/', pagesController.welcome);

// users resource paths:
// router.get('/users',     usersController.index);
// router.get('/users/:id', usersController.show);

module.exports = router;
