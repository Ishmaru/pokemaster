// Require resource's model(s).
var User = require("../models/user");
var Pokemon = require("../models/pokemon");


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

// var showPoke = function(req, res, next){
//   User.findById(req.params.id, function(err, user) {
//     if (err) {
//       res.json({message: 'Could not find user because ' + err});
//     } else if (!user) {
//       res.json({message: 'No user with this id.'});
//     } else {
//       var show = function(req, res, next){
//       Pokemon.find({user: req.params.user}, function(err, pokemons) {
//         if (err) {
//           res.json({message: 'Could not find pokemon because ' + err});
//         } else if (!pokemons) {
//           res.json({message: 'No pokemon with this user.'});
//         } else {
//           res.json(pokemons);
//         }
//       });
//     };
//     }
//   });
// };

// var create = function(req, res) {
//     var user          = new User();   // create a new instance of the User model
//     user.name         = req.body.name;  // set the users name (comes from the request)
//     user.email        = req.body.email;  // set the users phone number (comes from the request)
//     user.password     = req.body.password;  // set the users password (comes from the request)

//     var pokemon = new Pokemon();





//     user.save(function(err) {
//         if (err) {
//           if (err.code == 11000)
//             return res.json({ success: false, message: 'This email is allready in use.'});
//           else
//             return res.json(err);
//         }

//         res.json({ message: "Time To catch Pokemon" });
//       });

// };


module.exports = {
  index: index,
  show:  show
  // create: create
};
