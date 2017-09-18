var OAuth = require('oauth').OAuth2;

var Facebook = function(key, secret){
    var oauth = new OAuth(
        key, secret, 'http://graph.facebook.com', null, 'oauth2/token', null
    );
    
    var getImage = function(userKey, done){
        oauth.get('http://graph.facebook.com/v2.3/me/picture?redirect=false&type=large', userKey, function(error, results, res){
            console.log(results)
            results = JSON.parse(results);
            done(results.data);
        })
    }
    
    return {
        getImage: getImage
    }
}

module.exports = Facebook;