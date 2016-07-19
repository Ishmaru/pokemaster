// Require resource's model(s).
var Pokemon = require("../models/pokemon");

var index = function(req, res){
  Pokemon.find({}, function(err, pokemons) {
    if (err) {
      res.send({message: err});
    } else {
      // res.json('pokemons/index', {pokemons: pokemons});
    res.json(pokemons);
    }
  });
};

// var show = function(req, res, next){
//   Pokemon.findById(req.params.id, function(err, user) {
//     if (err) {
//       res.json({message: 'Could not find user because ' + err});
//     } else if (!user) {
//       res.json({message: 'No pokemon with this id.'});
//     } else {
//       res.send('pokemons/show', {pokemons: pokemons});
//     }
//   });
// };

module.exports = {
  index: index
  // show:  show
};
