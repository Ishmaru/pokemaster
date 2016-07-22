var express = require('express'),
    router  = new express.Router();

// Require controllers.

var usersController = require('../controllers/users');
var pokemonController = require('../controllers/pokemons');
var authController = require('../controllers/auth');

// router.post('/users/register', usersController.create);
router.post('/login', authController.userAuth);
router.get('/users', usersController.index);
router.get('/users/:id', usersController.show, authController.tokenVerify);

router.get('/pokemon/get', pokemonController.get);
router.get('/pokemon', pokemonController.index);
router.get('/pokemon/:user', pokemonController.show, authController.tokenVerify);
router.post('/pokemon', pokemonController.create, authController.tokenVerify);
router.put('/pokemon/:_id', pokemonController.update, authController.tokenVerify);


module.exports = router;
