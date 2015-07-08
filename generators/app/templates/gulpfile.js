var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');

gulp.task('clean:dist', function () {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('build', ['clean:dist'], function() {
  return gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
