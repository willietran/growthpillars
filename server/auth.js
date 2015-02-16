var express = require('express')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
;

var auth = function(User) {
  // Passport session setup.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // Twitter OAuth
  passport.use(new TwitterStrategy(
    {
      consumerKey: 'fh03JiplqSKfQVFoVbsq3VAVv',
      consumerSecret: 'HT2pxkUCZtUtqT4JwuynE5OW6JHM34ooC2qHxobaKW4vlJoCgE',
      callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
      var name = profile.name;
      // object to be used to uniquely identify a user
      var findObj = {
        twitter_id: profile.id,
      };
      // additional info for user being created, if a user is not found
      var moreInfo = {
        name: profile.displayName,
      };
      // only set profile photo if supplied
      if (profile.photos.length > 0) {
        moreInfo.image_url = profile.photos[0].value;
      }
      User.findOrCreate(findObj, moreInfo, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));

  var setupSession = function(app) {
    // initialize passport
    app.use(passport.initialize());
    // use passport.session() middleware to support persistent login sesisons
    app.use(passport.session());
  };

  var router = express.Router();

  // Redirect the user to Twitter for authentication.  When complete, Twitter
  // will redirect the user back to the application at
  //   /auth/twitter/callback
  router.get('/twitter', passport.authenticate('twitter'));

  // Twitter will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  router.get('/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
                                       failureRedirect: '/login' }));

  router.all('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return {setupSession: setupSession, router: router};
}

module.exports = auth;
