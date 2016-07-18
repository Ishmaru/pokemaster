var welcome = function(req, res, next) {
  res.render('pages/welcome');
};

module.exports = {
  welcome: welcome
};
