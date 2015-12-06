var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	reactify = require('reactify'),
	uglify = require('gulp-uglify'),
	vinylPaths = require('vinyl-paths'),
	clean = require('del'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat');


gulp.task('scripts', function () {
	gulp.src('components/main/main.js')
		.pipe(browserify({
			insertGlobals: false,
			debug: true,
			transform: [reactify]
		}))
		.pipe(rename('index.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'));
});


gulp.task('watch', function () {
	gulp.watch(['components/**/*.js', 'components/**/*.jsx'], ['scripts']);
});

gulp.task('templates', function () {
	return gulp.src(['index.html'])
		.pipe(gulp.dest('./build'));

});

gulp.task('css', function () {
	return gulp.src('components/**/*.css')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./build/css'));
});

gulp.task('clean', function () {
	return gulp.src('./build')
		.pipe(vinylPaths(clean));
});

gulp.task('default', ['scripts', 'watch']);

gulp.task('build', ['clean'], function () {
	gulp.start('scripts', 'css', 'templates');
	gutil.log('tasks is completed');
});