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
var source      = require('vinyl-source-stream');
var watchify    = require('watchify');

var src = {
  assets: [
    'public/js/**/*',
    'public/css/**/*'
  ],
  vendor: [
    //'bower_components/jquery/dist/jquery.js',
    //'bower_components/jquery-ui/ui/jquery.ui.core.js',
    //'bower_components/jquery-ui/ui/jquery.ui.position.js',
    //'bower_components/jquery-ui/ui/jquery.ui.widget.js',
    //'bower_components/jquery-ui/ui/jquery.ui.mouse.js',
    //'bower_components/jquery-ui/ui/jquery.ui.sortable.js',
    //'bower_components/jquery-ui/ui/jquery.ui.draggable.js',
    //'bower_components/jquery-ui/ui/jquery.ui.autocomplete.js',
    //'bower_components/jquery-ui/ui/jquery.ui.datepicker.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    //'bower_components/angular-load/angular-load.js',
    //'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-route/angular-route.js',
    //'bower_components/angular-ui-sortable/sortable.js',
    'bower_components/angular-audio/app/angular.audio.js',
    //'bower_components/bootstrap/js/tooltip.js',
    'bower_components/lodash/dist/lodash.min.js',

    //'bower_components/jquery-ui/themes/base/jquery-ui.css',
    //'bower_components/jquery-ui/themes/base/jquery.ui.autocomplete.css',
    //'bower_components/jquery-ui/themes/base/jquery.ui.datepicker.css',
  ],
};

gulp.task('vendor', function () {
  var vendorFiles = gulp.src(src.vendor)
    .pipe(gulp.dest('public/vendor'));

  return gulp.src('public/index.html')
    .pipe(inject(vendorFiles, {name: 'vendor', relative: 'true'}))
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
