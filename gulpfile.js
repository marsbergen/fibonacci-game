var gulp = require('gulp');
var Server = require('karma').Server;
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var del = require('del');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var jasmine = require('gulp-jasmine');

gulp.task('copy:html', function () {
  return gulp.src('static/**/*.html')
    .pipe(gulp.dest('.tmp'));
});

gulp.task('copy:root', ['copy:html', 'sass', 'js'], function () {
  return gulp.src('.tmp/**')
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('js', function () {
  del('./.tmp/app.js');

  return browserify({entries: 'app/js/app.js', extensions: ['.js'], debug: true})
    .transform(babel)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('default', ['copy:html', 'sass', 'js']);

gulp.task('watch', ['copy:html', 'sass', 'js'], function() {
  gulp.watch('app/js/**/*', ['js']);
  gulp.watch('app/sass/**/*', ['sass']);
  gulp.watch('static/**/*', ['copy:html']);
});

gulp.task('build', ['copy:html', 'sass', 'js', 'copy:root']);

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
