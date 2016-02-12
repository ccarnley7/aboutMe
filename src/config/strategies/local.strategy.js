var = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (arguments) {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password',
    }));
};