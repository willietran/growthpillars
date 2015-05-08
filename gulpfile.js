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
var setupApp = require('./server/app.js');

// Paths
var sassGlob = './private/styles/*.scss';
var cssRoot = './public/styles';
var cssGlob = path.join(cssRoot, '*.css');
var jsDestRoot = './public/js'

// standard LiveReload port
var liveReloadPort = 35729;

// Webpack
gulp.task('jsclient', function(callback) {
  var hostname = 'localhost';
  var port = '9090';
  var config = Object.create(require('./webpack.config.js'))
  config.debug = true;
  config.output.publicPath = 'http://'+hostname+':'+port+'/';

  var devServer = new WebpackDevServer(webpack(config), {
    // server & middleware options
    stats: {
      colors: true
    }
  });
  devServer.listen(8080, '127.0.0.1', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);

    // Server listening
    gutil.log(
      '[webpack-dev-server]',
      'http://localhost:9090/webpack-dev-server/index.html'
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
    app.use(require('connect-livereload')({port: liveReloadPort}));
    configCompletionCallback();
  }, function startCallback(app) {
    var server = app.listen(process.env.PORT || 3000, function() {
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
      url: 'http://127.0.0.1:3000'
    }));
});

// Clean - delete all generated files
gulp.task('clean', function(callback) {
  del([
    path.join(cssRoot, '**'),
    path.join(jsDestRoot, '**')
  ], callback);
});
