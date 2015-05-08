var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var open = require('gulp-open');
var sass = require('gulp-sass');
var del = require('del');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var proxy = require('proxy-middleware');
var url = require('url');
var setupApp = require('./server/app.js');

// Paths
var sassGlob = './private/styles/*.scss';
var cssRoot = './public/styles';
var cssGlob = path.join(cssRoot, '*.css');
var jsDestRoot = './public/js'

// Ports & Hostnames
var expressPort = process.env.PORT || 3000;
var webpackPort = 9090;
var liveReloadPort = 35729; // standard LR port
var hostname = '127.0.0.1';

// Webpack
gulp.task('jsclient', function(callback) {
  var config = Object.create(require('./webpack.config.js'))
  config.output.publicPath =
    'http://'+hostname+':'+webpackPort.toString() + '/js/';

  config.debug = true;

  var devServer = new WebpackDevServer(webpack(config), {
    // server & middleware options
    publicPath: '/js/',
    stats: {
      colors: true
    },
  });
  devServer.listen(webpackPort, hostname, function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);

    // Server listening
    gutil.log(
      '[webpack-dev-server]',
      config.output.publicPath + '/js/browser.js'
    );

    callback();
  });
});

// Live Reload
var tinylr;
gulp.task('livereload', function(callback) {
  tinylr = require('tiny-lr')();
  tinylr.listen(liveReloadPort, callback);
});

function notifyLiveReload(event) {
  var fileName = path.relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Sass
gulp.task('sass', function () {
  gulp.src(sassGlob)
    .pipe(sass())
    .pipe(gulp.dest(cssRoot));
});

// Express
gulp.task('server', function(taskCompletionCallback) {
  setupApp(function configCallback(app, configCompletionCallback) {
    // live reload, only on dev mode
    console.log('Using live reload');
    //app.use(require('connect-livereload')({port: liveReloadPort}));
    // proxy js assets to webpack devserver
    var webpackURL = url.parse('http://'+hostname+':'+webpackPort.toString()+'/js/');
    app.use('/js', proxy(webpackURL));
    configCompletionCallback();
  }, function startCallback(app) {
    var server = app.listen(expressPort, function() {
      console.log('\nServer ready on port %d\n', server.address().port);
      taskCompletionCallback();
    });
  });
});

// Watch
gulp.task('watch', ['livereload'], function() {
  gulp.watch(sassGlob, ['sass']);
  gulp.watch(cssGlob, notifyLiveReload);
});

// Default task
gulp.task('default', [
  'sass',
  'jsclient',
  'server',
  'watch'
], function() {
  gutil.log('Opening page');
  gulp.src(__filename)
    .pipe(open('', {
      url: 'http://'+hostname+':'+expressPort.toString()
    }));
});

// Clean - delete all generated files
gulp.task('clean', function(callback) {
  del([
    path.join(cssRoot, '**'),
    path.join(jsDestRoot, '**')
  ], callback);
});
