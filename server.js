var express = require('express'),
	browserify = require('browserify-middleware'),
	reactify = require('reactify'),
	sass = require('node-sass-middleware'),
	nunjucks = require('nunjucks'),
  data = require('./data')
	config = require('./client/config');

// initialise express
var app = express();

// use nunjucks to process view templates in express
nunjucks.configure('server/templates/views', {
    express: app
});

// sass will automatically compile matching requests for .css files
app.use(sass({
  src: __dirname + '/public/styles',
  dest: __dirname + '/public/styles',
}));
// public assets are served before any dynamic requests
app.use(express.static('public'));

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

app.get('/', function(req, res) {
  // This used to be '*'.
  //
	// this route will respond to all requests with the contents of your index
	// template. Doing this allows react-router to render the view in the app.
  res.render('base.html', data.main);
});

app.get('/post', function(req, res) {
  res.render('post.html');
});

app.get('/view/:post_id', function(req, res) {
  console.log('post id: ' + req.params['post_id']);
  res.render('view.html', data.view);
});

// start the server
var server = app.listen(process.env.PORT || 3000, function() {
	console.log('\nServer ready on port %d\n', server.address().port);
});
