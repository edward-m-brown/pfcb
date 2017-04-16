var gulp = require('gulp');
var bower = require('gulp-bower');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    return browserify({entries: 
      ['./app/static/scripts/jsx/CharacterBuilder.js'], extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/static/scripts/js'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./app/static/scripts/jsx/**/*.js', ['build']);

});

gulp.task('bower', function() {
    return bower();
});

gulp.task('default', ['watch']);
