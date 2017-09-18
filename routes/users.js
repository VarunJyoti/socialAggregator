var express = require('express');
var router = express.Router();

var facebook = require('../services/facebook')('117432588928346', '56741a9a486aed0f63aec8449da62a25')
router.use('/', function(req, res, next){
    if(!req.user){
        res.redirect("/")
    }
    next();
})
/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.user);
  if(req.user.facebook){
      facebook.getImage(req.user.facebook.token, function(results){
          req.user.facebook.image = results.url;
          res.render('users', {user: req.user})
      })
  }
  res.render('users', {user: req.user});
});

module.exports = router;
