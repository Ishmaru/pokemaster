var express = require('express'),
    router  = new express.Router();

// Require controllers.

var usersController = require('../controllers/users');
var pokemonController = require('../controllers/pokemons');


router.get('/users', usersController.index);
router.get('/users/:id', usersController.show);

router.get('/pokemon', pokemonController.index);
router.get('/pokemon/:user', pokemonController.show);
router.post('/pokemon', pokemonController.create);

// router.get('/pokemons/:id', pokemonController.show);


module.exports = router;
