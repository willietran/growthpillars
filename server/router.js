/**
 * @jsx
 */

var express = require('express')
  , session = require('express-session')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , nunjucks = require('nunjucks')
  , React = require('react')
  , AuthModule = require('./auth')
  , backend = require('./backend')
  , Post = require('../client/components/Post.react')
;

var server = function(err) {

  // use nunjucks to process view templates
  nunjucks.configure('server/templates/views');

  var router = express.Router();

  // User model from mongodb
  var User = backend.user;

  var isProd = router.get('env') === 'production';

  // public assets are served before any dynamic requests
  router.use(express.static('public'));

  router.use(cookieParser());
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(session({
    secret: 'sUp3Rs3Cr3t!',
    resave: false,
    saveUninitialized: false,
  }));

  // our auth module
  var auth = AuthModule(User);
  var authRouter = auth.router;
  var setupSession = auth.setupSession;
  setupSession(router);
  router.use('/auth', authRouter);

  /*
    set up any additional server routes (api endpoints, static pages, etc.)
    here before the catch-all route for index.html below.
  */

  router.get('/', function(req, res) {
    // This used to be '*'.
    //
    // this route will respond to all requests with the contents of your index
    // template. Doing this allows react-router to render the view in the app.
    var html = nunjucks.render(
      'base.html',
      { posts: backend.fake_posts, user: req.user }
    );
    res.end(html);
  });

  router.post('/post', function(req, res) {
    if (req.user) {
      var formData = req.body;
      formData.user = req.user;
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

  router.get('/view/:post_id', function(req, res) {
    var postProps = backend.fake_posts[0]; // props for Post component
    var innerMarkup = {
      __html: React.renderToString(<Post {...postProps} />)
    };
    var html = React.renderToStaticMarkup(
      <body>
        <div
          id={'content'}
          dangerouslySetInnerHTML={innerMarkup}
        />
      </body>
    );
    res.end(html);
  });

  return router;
};

module.exports = function(callback) {
  backend.initialize(function(err) {
    var router = server(err);
    callback(router);
  });
};
