'use strict';

var gulp = require('gulp');

var scp = require('gulp-scp2');

gulp.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

var paths = gulp.paths;

require('require-dir')('./gulp');

gulp.task('build', ['clean'], function () {
    gulp.start('buildapp');
});

gulp.task('deploy', function() {
  return gulp.src(gulp.paths.dist+'/**/*')
  .pipe(scp({
    host: 'ec2-52-32-73-108.us-west-2.compute.amazonaws.com',
    username: 'circuit',
    password: 'limalinks1234',
    dest: '/var/www/html/',
    watch: function(client) {
      client.on('write', function(o) {
        console.log('write %s', o.destination);
      });
    }
  }))
  .on('error', function(err) {
    console.log(err);
  });
});


gulp.task('ngdocs', [], function () {
  var gulpDocs = require('gulp-ngdocs');
  var options = {
    //options
  }
  return gulpDocs.sections({
    Documentation: {
      glob:['src/**/*.js', '!src/**/*.spec.js'],
      api: true,
      title: 'Web App Documentation'
    }
  }).pipe(gulpDocs.process(options)).pipe(gulp.dest('./docs'));
});
