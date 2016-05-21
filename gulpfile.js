(function() {
  'use strict';

  var gulp = require('gulp');
  var minifyCSS = require('gulp-minify-css');
  var compass = require('gulp-compass');
  var sass = require('gulp-sass');
  var browserSync = require('browser-sync').create();
  var rename = require('gulp-rename');
  var autoprefixer = require('gulp-autoprefixer');

  gulp.task('compileStyle', function(){
    gulp.src('./scss/*.scss')
      .pipe(sass())
      // .pipe(autoprefixer({
      //   browsers: ['last 2 versions'],
      //   cascade: false
      // }))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
  });

  gulp.task('server', ['compileStyle'], function() {
    browserSync.init({
        server: {
          baseDir: './'
        }
    });
    gulp.watch(['./scss/*.scss'], ['compileStyle']);
    gulp.watch(['./*.html']).on('change', browserSync.reload);
  });

  gulp.task('default', ['server']);

})();