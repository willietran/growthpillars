var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var open = require('gulp-open');

// Browserify
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

// Express
gulp.task('server', function(callback) {
  // TODO(ryanrhee): Start express server with live reload configured
});

// Default task
gulp.task('default', ['jsclient', 'server'], function() {
  gutil.log('Opening page');
  gulp.src('index.js')
    .pipe(open('', {
      url: 'http://127.0.0.1:3000'
    }));
});
