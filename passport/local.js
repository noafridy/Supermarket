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
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    username: 'email',
    password: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
},
    function (req, email, password, done) {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        UserModal.findOne({ 'email': email }, function (err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, { message: 'there is already a user with that name' });
            } else {

                // if there is no user with that email
                // create the user
                var newUser = new UserModal();
                // set the user's local credentials
                // newUser.email = email;
                newUser.ID = req.body.ID;
                newUser.password = newUser.encryptPassword(password);
                newUser.username = req.body.username;
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;
                newUser.city = req.body.city;
                newUser.street = req.body.street;
                newUser.role = 'user';

                // save the user
                newUser.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserModal.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;