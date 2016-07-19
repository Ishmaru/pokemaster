// Require resource's model(s).
var User = require("../models/user");

var index = function(req, res){
  User.find({}, function(err, users) {
    if (err) {
      res.json({message: err});
    } else {
      // res.json('users/index', {users: users});
      res.json(users);

    }
  });
};

var show = function(req, res, next){
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!user) {
      res.json({message: 'No user with this id.'});
    } else {
      res.json(user);
    }
  });
};

var showPoke = function(req, res, next){
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!user) {
      res.json({message: 'No user with this id.'});
    } else {
      var show = function(req, res, next){
      Pokemon.find({user: req.params.user}, function(err, pokemons) {
        if (err) {
          res.json({message: 'Could not find pokemon because ' + err});
        } else if (!pokemons) {
          res.json({message: 'No pokemon with this user.'});
        } else {
          res.json(pokemons);
        }
      });
    };
    }
  });
};

module.exports = {
  index: index,
  show:  show
};
