const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localLogin = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password'},
  function(email, password, done) {
    // Verify this email and password, call done with the user
    // if it is the correct email and password
    // otherwise, call done with false
    User.findOne({ email: email }, function(err, user) {
      if (err) {  return done(err); }
      if(!user) { return done(null, false); }

      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, flase); }

        // Take the user model and assign to req.user
        return done(null, user);
      })
    });
  });

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// Create JWT strategy
// payload is from jwt.encode in tokenForUser
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  console.log('login')
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call done without user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      console.log('true')
      done(null, user);
    } else {
      console.log('false')
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
