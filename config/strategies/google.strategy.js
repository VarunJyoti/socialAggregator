var passport = require('passport');
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("../../models/UserModel");
module.exports = function () {
    passport.use(new googleStrategy({
        clientID: '111806435968-blrq6fqcbva2ke7i30k639jk4ncds3bm.apps.googleusercontent.com',
        clientSecret: 'HRuXu0qlmhYJicRTFb0UXer-',
        callbackURL: 'http://localhost:3000/auth/google/callback',

    }, function (req, accessToken, refreshToken, profile, done) {
        var query = {
            'google.id' : profile.id
        }
        User.findOne(query, function (error, user) {
            if (user) {
                console.log('not found');
                done(null, user)
            } else {
                console.log('found');
                var user = new User;
                user.email = profile.emails[0].value;
                user.image = profile._json.image.url;
                user.displayName = profile.displayName;
                user.google = {};
                user.google.id = profile.id;
                user.google.token = accessToken;
                user.save();
                done(null, user);
            }
        })

       
    }));
}
