var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require("../../models/UserModel");

module.exports = function () {
    passport.use(new TwitterStrategy({
        consumerKey: 'u23U0gfvDSS34hAMzMQVKn3N0',
        consumerSecret: '1mm1yxQAxNmAj6Dy1DhsOY8RDMQikRxarq12y3honm7AtzFRLc',
        callbackURL: 'http://localhost:3000/auth/twitter/callback',
        passReqToCallback: true
    }, function (req, token, tokenSecret, profile, done) {
        var query = {
            'twitter.id': profile.id
        }
        User.findOne(query, function (error, user) {
            if (user) {
                console.log('not found');
                done(null, user)
            } else {
                console.log('found');
                var user = new User;
                user.displayName = profile.displayName;
                user.twitter = {};
                user.twitter.id = profile.id;
                user.twitter.token = token;
                user.save();
                done(null, user);
            }
        })
    }))
}
