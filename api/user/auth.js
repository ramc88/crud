const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('./model');
const userUtils = require('./utils');

/**
 * Strategy for validating Authorization header, checks the token with db
 */ 

passport.use(new BearerStrategy(
    function(token, done) {
      User.findOne({ token: userUtils.hashIt(token) }, function (err, user) {
        if (err) { 
          return done(err); 
        }
        if (!user) { 
          return done(null, false); 
        }
        if (new Date() > user.tokenExpire) { // validates token expiration
          return done(null, false); 
        }

        return done(null, user, { scope: 'all' });
      });
    }
));