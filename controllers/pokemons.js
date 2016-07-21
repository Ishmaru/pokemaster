var request = require('request');
// Require resource's model(s).
var Pokemon = require("../models/pokemon");

var index = function(req, res, next){
  Pokemon.find({}, function(err, pokemons) {
    if (err) {
      res.send({message: err});
    } else {
    res.json(pokemons);
    }
  });
};
var show = function(req, res, next){
  Pokemon.find({user: req.params.user}, function(err, pokemons) {
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!pokemons) {
      res.json({message: 'No pokemon with this user.'});
    } else {
      res.json(pokemons);
    }
  });
};

var create = function(req, res) {
  var capture    = new Pokemon(req.body);
  capture.save(function(err, savedPokemon) {
    if (err) {
      res.send(err);
    }
    console.log(savedPokemon);
    res.json(savedPokemon);
  });
};

var get = function(req, res, next){
  var pokeId = Math.floor(Math.random() * (649 + 1));{
  request.get(`http://pokeapi.co/api/v2/pokemon/${pokeId}/`, function(err, response) {
      if (err) {
      res.send({message: err});
      } else {
      res.json(response);
      }
    });
  };
}

var update = function(req, res) {
    // console.log(req.body);
  // var id = req.params.id;
  console.log("FUCCVCCVKVKHVLUVJKHGVKVKHJVJKVHKJVHJAVHJVHJVHJVC HJZBCVHJSCVHKCBVCKECEKEBCV")
  var id = req.body._id;
    // $log.warn(id);
    console.log(req.body);
  Pokemon.findById(id, function(err, pokemon) {
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")

    console.log(pokemon);

    if (err) {
      res.send(err);
    }
    if (req.body.stats.length > 0) pokemon.stats = req.body.stats;
    if (req.body.curr_hp !== undefined) pokemon.curr_hp = req.body.curr_hp;
    if (req.body.exp !== undefined) pokemon.exp = req.body.exp;
    if (req.body.next_lv !== undefined) pokemon.next_lv = req.body.next_lv;
    if (req.body.level !== undefined) pokemon.level = req.body.level;

    pokemon.save(function(err, response) {
    console.log("xxcddjkvbfsb zkfb zkjb zjzxbvzfbnmvzbf,b,jfb");
    console.log(response);
      if (err) {
        res.send(err);
      }
      console.log("Update");
      res.json(response);
    });
  });
}


module.exports = {
  index: index,
  show:  show,
  create: create,
  update: update,
  get: get
};
