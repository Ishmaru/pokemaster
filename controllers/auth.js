var User        = require('../models/user.js'),
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    superSecret = env.superSecret;


var userAuth = function (req, res, next) {

  User.findOne({
      email: req.body.email
    }).select('email password name').exec(function(err, user) {
            if (err) res.json(err);

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {

      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });

      } else {
        var token = jwt.sign({
          email: user.email,
          name:        user.name,
          _id:         user._id
        }, superSecret, {
          expiresIn: '30d' // expires in 30 days
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          user: user
        });
      }

    }

  });
};

var tokenVerify = function(req, res, next) {
  // do logging
  console.log('Accessed Data');

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;

        next(); // make sure we go to the next routes and don't stop here
      }
    });

  } else {

    // if there is no token
    // return an HTTP response of 403 (access forbidden) and an error message
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
};
module.exports = {
  userAuth: userAuth,
  tokenVerify:  tokenVerify
};
