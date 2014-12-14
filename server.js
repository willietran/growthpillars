var express = require('express')
  , session = require('express-session')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , browserify = require('browserify-middleware')
  , reactify = require('reactify')
  , sass = require('node-sass-middleware')
  , nunjucks = require('nunjucks')
  , mongodb = require('mongodb')
  , mongoose = require('mongoose')
  , findOrCreate = require('mongoose-findorcreate')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , flash = require('connect-flash')
  , data = require('./data')
  , config = require('./client/config')
  , SALT_WORK_FACTOR = 10;

// set up mongodb connection
uri = 'mongodb://localhost/test';
mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});

// user schema
var userSchema = mongoose.Schema({
  twitter_id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  image_url: { type: String, required: false},
});

userSchema.plugin(findOrCreate);
var User = mongoose.model('User', userSchema);

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
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

// initialise express
var app = express();

// sass will automatically compile matching requests for .css files
app.use(sass({
  src: __dirname + '/private',
  dest: __dirname + '/public',
  debug: true,
}));
// public assets are served before any dynamic requests
app.use(express.static('public'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'derp',
  resave: false,
  saveUninitialized: false,
}));
// initialize passport
app.use(passport.initialize());
// use passport.session() middleware to support persistent login sesisons
app.use(passport.session());
app.use(flash());

// use nunjucks to process view templates in express
nunjucks.configure('server/templates/views', {
  express: app
});

// common packages are precompiled on server start and cached
app.get('/js/' + config.common.bundle, browserify(config.common.packages, {
	cache: true,
	precompile: true
}));

// any file in /client/scripts will automatically be browserified,
// excluding common packages.
app.use('/js', browserify('./client/scripts', {
	external: config.common.packages,
	transform: ['reactify']
}));

/*
	set up any additional server routes (api endpoints, static pages, etc.)
	here before the catch-all route for index.html below.
*/

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

app.get('/', function(req, res) {
  // This used to be '*'.
  //
	// this route will respond to all requests with the contents of your index
	// template. Doing this allows react-router to render the view in the app.
  res.render('base.html', { posts: data.posts, user: req.user});
});

app.get('/post', function(req, res) {
  res.render('post.html');
});

app.get('/view/:post_id', function(req, res) {
  res.render('view.html', data.posts[0]);
});

app.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.post('/register', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.all('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// start the server
var server = app.listen(process.env.PORT || 3000, function() {
	console.log('\nServer ready on port %d\n', server.address().port);
});
