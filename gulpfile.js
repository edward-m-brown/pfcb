var gulp = require('gulp')

var gulpBrowser = require("gulp-browser");
var reactify = require('reactify');
var size = require('gulp-size');
var del = require('del');

// tasks

gulp.task('default', function() {
  gulp.start('transform');
});


gulp.task('transform', function() {
  var stream = gulp.src('./app/static/scripts/jsx/*.js')
    .pipe(gulpBrowser.browserify({transform: ['reactify']}))
    .pipe(gulp.dest('./app/static/scripts/js/'))
    .pipe(size());
  return stream;
});


gulp.task('del', function() {
});
