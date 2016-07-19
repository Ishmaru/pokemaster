var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  name:             String,
  email:            String,
  avatar:           String,
  trainer_lv:       { type: Number, default: 1 },
  trainer_exp:      { type: Number, default: 100 },
  trainer_next:     { type: Number, default: 1000 },
  pokeballs:        { type: Number, default: 25 },
  greatballs:       { type: Number, default: 1 },
  masterballs:      { type: Number, default: 0},
  fullrestore:      { type: Number, default: 5 },
  evolution_stone:  { type: Number, default: 0 },
  money:            { type: Number, default: 1000 }
});

var User = mongoose.model('User', userSchema);

userSchema.methods.pokemons = function(callback) {
  Pokemon.find({user: this._id}, function(err, pokemon) {
    callback(err, pokemon);
  });
};

module.exports = User;
