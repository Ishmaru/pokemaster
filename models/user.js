var mongoose = require('mongoose'),
    debug    = require('debug')('app:models'),
    bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
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
  money:            { type: Number, default: 1000 },
  password:    { type: String, required: true, select: false }
});


// exclude password
UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

UserSchema.pre('save', function(next) {
  var user = this;

  // hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) return next();

  // generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});


UserSchema.methods.comparePassword = function(password) {
  var user = this;

  console.log(this);

  return bcrypt.compareSync(password, user.password);
};

UserSchema.methods.pokemons = function(callback) {
  mongoose.model('Pokemon').find({user: this._id}, function(err, pokemon) {
    callback(err, pokemon);
  });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;
