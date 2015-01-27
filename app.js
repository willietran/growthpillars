var express = require('express')
  , session = require('express-session')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , reactify = require('reactify')
  , sass = require('node-sass-middleware')
  , nunjucks = require('nunjucks')
  , AuthModule = require('./server/auth')
  , backend = require('./server/backend')
;

var server = function(err) {
  // User model from mongodb
  var User = backend.user;

  // initialise express
  var app = express();
  var isProd = app.get('env') === 'production';

  // live reload, only on dev mode
  if (!isProd) {
    console.log('Using live reload');
    app.use(require('connect-livereload')());
  }

  // sass will automatically compile matching requests for .css files
  app.use(sass({
    src: __dirname + '/private',
    dest: __dirname + '/public',
    debug: isProd ? false : true,
    outputStyle: isProd ? 'compressed' : 'expanded',
  }));
  // public assets are served before any dynamic requests
  app.use(express.static('public'));

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'sUp3Rs3Cr3t!',
    resave: false,
    saveUninitialized: false,
  }));
  
  var auth = AuthModule(User);
  auth.setupSession(app);

  // use nunjucks to process view templates in express
  nunjucks.configure('server/templates/views', {
    express: app
  });

  // our auth module
  app.use('/auth', auth.router);

  /*
    set up any additional server routes (api endpoints, static pages, etc.)
    here before the catch-all route for index.html below.
  */

  app.get('/', function(req, res) {
    // This used to be '*'.
    //
    // this route will respond to all requests with the contents of your index
    // template. Doing this allows react-router to render the view in the app.
    res.render('base.html', { posts: backend.fake_posts, user: req.user});
  });

  app.post('/post', function(req, res) {
    if (req.user) {
      var formData = req.body;
      formData['user'] = req.user;
      backend.addPost(formData, function (err, result) {
        if (err) {
          res.status(500).send({error: err});
        } else {
          res.send(result);
        }
      });
    } else {
      // Got create post request but user is not logged in. This shouldn't be
      // possible from the web UI, so it must be a manually crafted request.
      res.sendStatus(403); // Forbidden
    }
  });

  app.get('/view/:post_id', function(req, res) {
    res.render('view.html', backend.fake_posts[0]);
  });

  // start the server
  var server = app.listen(process.env.PORT || 3000, function() {
    console.log('\nServer ready on port %d\n', server.address().port);
  });
};
backend.initialize(server);
