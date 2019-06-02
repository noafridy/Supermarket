//Strategy
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var UserModal = require('../models/user');  //אני מחפשת את המשתמש בדאטה בייס 


passport.use(new LocalStrategy(
    function (username, password, done) {
        UserModal.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password !== password) { // todo: fix passwored to password and clean all users in database
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserModal.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;