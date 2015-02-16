var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var open = require('gulp-open');
var setupApp = require('./server/app.js');

// Browserify
// TODO(ryanrhee): use webpack instead of browserify to get react-hot-loader
var bundler = watchify(browserify('./client/scripts/index.js', watchify.args));
bundler.transform('6to5ify');
// TODO(ryanrhee): Split out vendor bundle so incremental builds are faster
bundler.require(['react', 'react-bootstrap']);
function bundle() {
  gutil.log('Building browserify bundle');
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'));
}
gulp.task('jsclient', bundle);
bundler.on('update', bundle);

// Live Reload
var tinylr;
gulp.task('livereload', function(callback) {
  // standard LiveReload port
  var port = 35729;
  tinylr = require('tiny-lr')().listen(port, callback);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Express
gulp.task('server', function(callback) {
  setupApp(function(app, callback) {
    // live reload, only on dev mode
    console.log('Using live reload');
    app.use(require('connect-livereload')());
    callback();
  }, function(app) {
    var server = app.listen(process.env.PORT || 3000, function() {
      console.log('\nServer ready on port %d\n', server.address().port);
    });
  });
});

// Watch
gulp.task('watch', function() {
  // TODO(ryanrhee): Watch for static resource changes
});

// Default task
gulp.task('default', ['jsclient', 'server'], function() {
  gutil.log('Opening page');
  gulp.src('index.js')
    .pipe(open('', {
      url: 'http://127.0.0.1:3000'
    }));
});
