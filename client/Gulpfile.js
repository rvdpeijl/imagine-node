var gulp 		= require('gulp'),
	sass 		= require('gulp-ruby-sass');

gulp.task('styles', function() {
    return gulp.src('styles/scss/main.scss')
    .pipe(sass({ style: 'expanded', }))
    .pipe(gulp.dest('styles/css'));
});

gulp.task('watch', function() {
    gulp.watch(['styles/scss/main.scss',
    'styles/scss/**/*.scss'], ['styles']);
});

gulp.task('default', ['styles', 'watch']);