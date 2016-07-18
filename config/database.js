var mongoose = require('mongoose');

var env = require('./environment');

// Use different database URIs based on whether an env var exists.
var dbUri = env.MLAB_URI ||
            'mongodb://localhost/' + env.SAFE_TITLE;

if (!env.MLAB_URI) {
  // check that MongoD is running...
  require('net').connect(27017, 'localhost').on('error', function() {
    console.log("YOU MUST BOW BEFORE THE MONGOD FIRST, MORTAL!");
    process.exit(0);
  });
}

if (!mongoose.connection._hasOpened) {
  mongoose.connect(dbUri);
}

module.exports = mongoose;
