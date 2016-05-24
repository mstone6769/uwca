(function() {
  'use strict';

  var gulp = require('gulp');
  var minifyCSS = require('gulp-minify-css');
  var compass = require('gulp-compass');
  var sass = require('gulp-sass');
  var browserSync = require('browser-sync').create();
  var rename = require('gulp-rename');
  var autoprefixer = require('gulp-autoprefixer');
  var fileInclude = require('gulp-file-include');

  gulp.task('compileStyle', function(){
    gulp.src('./scss/*.scss')
      .pipe(sass())
      // .pipe(autoprefixer({
      //   browsers: ['last 2 versions'],
      //   cascade: false
      // }))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./site/css'))
      .pipe(browserSync.stream());
  });

  gulp.task('fileInclude', function() {
    return gulp.src(['./*.html'])
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./site/'));
  });

  gulp.task('copyAssets', function() {
    gulp.src(['./images/*', './images/**/*', './js/*', './documents/*'], { 'base' : '.' })
      .pipe(gulp.dest('./site/'));
  });

  gulp.task('server', ['compileStyle','fileInclude','copyAssets'], function() {
    browserSync.init({
        server: {
          baseDir: './site/'
        }
    });
    gulp.watch(['./scss/*.scss'], ['compileStyle']);
    gulp.watch(['./*.html', './includes/*.html'], ['fileInclude'], browserSync.reload);
  });

  gulp.task('default', ['server']);

})();