var _ = require('lodash');

var localEnvVars = {
  TITLE:      'pokemaster',
  SAFE_TITLE: 'pokemaster'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
