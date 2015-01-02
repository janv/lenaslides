'use strict';

var _           = require('lodash-node/modern');
var browserify  = require('browserify');
//var clean       = require('gulp-clean');
//var debug       = require('gulp-debug');
var ecstatic    = require('ecstatic');
var express     = require('express');
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var http        = require('http');
var inject      = require('gulp-inject');
var partialify  = require('partialify');
var source      = require('vinyl-source-stream');
var watchify    = require('watchify');

var src = {
  assets: [
    'public/js/**/*',
    'public/css/**/*'
  ],
  vendor: [
    //'public/vendor/jquery/dist/jquery.js',
    //'public/vendor/jquery-ui/ui/jquery.ui.core.js',
    //'public/vendor/jquery-ui/ui/jquery.ui.position.js',
    //'public/vendor/jquery-ui/ui/jquery.ui.widget.js',
    //'public/vendor/jquery-ui/ui/jquery.ui.mouse.js',
    //'public/vendor/jquery-ui/ui/jquery.ui.sortable.js',
    //'public/vendor/jquery-ui/ui/jquery.ui.draggable.js',
    //'public/vendor/jquery-ui/ui/jquery.ui.autocomplete.js',
    //'public/vendor/jquery-ui/ui/jquery.ui.datepicker.js',
    'public/vendor/angular/angular.js',
    'public/vendor/angular-animate/angular-animate.js',
    //'public/vendor/angular-load/angular-load.js',
    //'public/vendor/angular-sanitize/angular-sanitize.js',
    'public/vendor/angular-route/angular-route.js',
    //'public/vendor/angular-ui-sortable/sortable.js',
    'public/vendor/angular-audio/app/angular.audio.js',
    //'public/vendor/bootstrap/js/tooltip.js',
    'public/vendor/lodash/dist/lodash.min.js',

    //'public/vendor/jquery-ui/themes/base/jquery-ui.css',
    //'public/vendor/jquery-ui/themes/base/jquery.ui.autocomplete.css',
    //'public/vendor/jquery-ui/themes/base/jquery.ui.datepicker.css',
  ],
};

gulp.task('vendor', function () {
  return gulp.src('public/index.html')
    .pipe(inject(gulp.src(src.vendor, {read:false}), {name: 'vendor', relative: 'true'}))
    .pipe(gulp.dest('public'));
});


gulp.task('app', function () {
  var b = createBrowserify();
  return bundleBrowserify(b);
});

gulp.task('inject', function () {
  return gulp.src('public/index.html')
    .pipe(inject(gulp.src(src.assets, {read:false}), {relative: 'true'}))
    .pipe(gulp.dest('public'));
});

gulp.task('all', ['vendor', 'inject', 'app']);

gulp.task('serve', function () {
  gulp.watch(src.vendor, ['vendor']);
  gulp.watch(src.assets , ['inject']);
  var w = watchify(createBrowserify());
  w.on('update', function(){
    bundleBrowserify(w);
    gutil.log('Rebuilt bundle');
  });
  bundleBrowserify(w);

  var app = express();
  app.use(ecstatic({ root: __dirname + '/public', handleError: false, showDir: false }));
  http.createServer(app).listen(3001);
});

function createBrowserify(){
  var b = browserify(_.extend(watchify.args, {basedir: 'public/app', debug: true}));
  b.add('./');
  b.transform('partialify');
  return b;
}

function bundleBrowserify(b){
  return b.bundle()
    .on('error', function(e){
      gutil.log(gutil.colors.red('Bundle error'), e.message);
    })
    .pipe(source('application.js'))
    .pipe(gulp.dest('public'));
}
