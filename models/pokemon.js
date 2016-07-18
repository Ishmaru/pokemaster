var mongoose = require('mongoose'),
    User     = require('./user.js');
    debug    = require('debug')('app:models');

var pokemonSchema = new mongoose.Schema({
  name: String,
  id:  String,
  stats: [
    {
      stat: {
        name: String
      },
      base_stat: Number
    },
    {
      stat: {
        name: String
      },
      base_stat: Number
    },
    {
      stat: {
        name: String
      },
      base_stat: Number
    },
    {
      stat: {
        name: String
      },
      base_stat: Number
    },
    {
      stat: {
        name: String
      },
      base_stat: Number
    },
    {
      stat: {
        name: String
      },
      base_stat: Number
    }
  ],
  sprites: {
    back_default: String,
    front_default: String
  },
  base_experience: { type: Number, default: 100 },
  types: [
    {
      classtype: {
        name: String
      },
      classtype: {
        name: String
      }
    }
  ],
  user:    { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  level:   { type: Number, default: 1 },
  exp:     { type: Number, default: 0 },
  next_lv: { type: Number, default: 300 },
  curr_hp: Number
});

var Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
