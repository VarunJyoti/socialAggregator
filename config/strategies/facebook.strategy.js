var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require("../../models/UserModel");
module.exports = function () {

    passport.use(new FacebookStrategy({
        clientID: '117432588928346',
        clientSecret: '56741a9a486aed0f63aec8449da62a25',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        passReqToCallback: true
    }, function (req, token, tokenSecret, profile, done) {
        var query = {
            'facebook.id': profile.id
        }
        User.findOne(query, function (error, user) {
            if (user) {
                console.log('not found');
                done(null, user)
            } else {
                console.log('found');
                var user = new User;
                user.displayName = profile.displayName;
                user.facebook = {};
                user.facebook.id = profile.id;
                user.facebook.token = token;
                user.save();
                done(null, user);
            }
        })
    }))
}
