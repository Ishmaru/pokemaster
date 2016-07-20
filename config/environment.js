var _ = require('lodash');

var localEnvVars = {
  TITLE:      'pokemaster',
  SAFE_TITLE: 'pokemaster',
  superSecret: "garblegarblewakawaka"
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
