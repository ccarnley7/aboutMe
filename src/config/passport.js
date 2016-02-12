var passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });
    
    passport.deserializeUser(function (username, done) {
        //mongo find by id
        done(null, user);
    });
    
    require('./strategies/local.strategy')();
};