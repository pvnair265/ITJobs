const passport = require('passport'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      User = require('../models/user-model'),
      config = require('./database');

module.exports= function(passport) {
    var opts  = {};
        opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
        opts.secretOrKey = config.secret;

        passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
            User.findById(jwt_payload._doc._id, (err,user) => {
                if(err) {
                    return done(err, false);
                }
                if(user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }));
}
