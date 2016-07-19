var mongoose = require('./database');

var User = require('../models/user');
var Pokemon = require('../models/pokemon');


var users = [
  { // 0
    name: "Ash",
    email:   "ketchumall@gmail.com",
    trainer_lv: 12,
    trainer_exp: 100,
    trainer_next: 150,
    pokeballs: 100,
    greatballs: 50,
    masterballs: 1,
    fullrestore: 20,
    evolution_stone: 1
  },

  { // 1
    name: "Gary",
    email:   "imtherival@yahoo.com",
    trainer_lv: 22,
    trainer_exp: 1000,
    trainer_next: 1050,
    pokeballs: 100,
    greatballs: 50,
    masterballs: 1,
    fullrestore: 20,
    evolution_stone: 1
  }
];


Pokemon.remove({}, function(err) {
  if (err) console.log(err);

  User.remove({}, function(err) {
    if (err) console.log(err);
    User.create(users, function(err, users) {

      var pokemons = [
        { // 0
          name: "Pikachu",
          id: 25,
          stats: [
            {
              stat: {
                name: "speed"
              },
              base_stat: 90
            },
            {
              stat: {
                name: "special-defense"
              },
              base_stat: 50
            },
            {
              stat: {
                name: "special-attack"
              },
              base_stat: 50
            },
            {
              stat: {
                name: "defense"
              },
              base_stat: 40
            },
            {
              stat: {
                name: "attack"
              },
              base_stat: 55
            },
            {
              stat: {
                name: "hp"
              },
              base_stat: 35
            }
          ],
          sprites: {
            back_default: "http://pokeapi.co/media/sprites/pokemon/back/25.png",
            front_default: "http://pokeapi.co/media/sprites/pokemon/25.png"
          },
          base_experience: 112,
          types: [
            {
              classtype: {
                name: "electric"
              }
            }
          ],
          user: users[0]._id,
          curr_hp: 35
        },
        { // 0
          name: "Eevee",
          id: 133,
          stats: [
            {
              stat: {
                name: "speed"
              },
              base_stat: 55
            },
            {
              stat: {
                name: "special-defense"
              },
              base_stat: 65
            },
            {
              stat: {
                name: "special-attack"
              },
              base_stat: 45
            },
            {
              stat: {
                name: "defense"
              },
              base_stat: 50
            },
            {
              stat: {
                name: "attack"
              },
              base_stat: 55
            },
            {
              stat: {
                name: "hp"
              },
              base_stat: 55
            }
          ],
          sprites: {
            back_default: "http://pokeapi.co/media/sprites/pokemon/back/133.png",
            front_default: "http://pokeapi.co/media/sprites/pokemon/133.png"
          },
          base_experience: 65,
          types: [
            {
              classtype: {
                name: "normal"
              }
            }
          ],
          user: users[1]._id,
          curr_hp: 55
        }
      ];
      // create default Pokemon
      Pokemon.create(pokemons, function(err, pokemons) {

        if (err) {
          console.log(err);
        } else{
          console.log(`Database seeded with ${users.length} users and ${pokemons.length} pokemon`);

          // disconnect db
          mongoose.connection.close();
        }
        process.exit();
      });
    });
  });
});
