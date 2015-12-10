var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	reactify = require('reactify'),
	uglify = require('gulp-uglify'),
	vinylPaths = require('vinyl-paths'),
	clean = require('del'),
	path = require('path'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	plugin = require('./plugin/tasks/plugin'),
	connect = require('gulp-connect'),
	changed = require('gulp-changed');


gulp.task('scripts', function () {
	gulp.src('components/main/main.js')
		.pipe(browserify({
			insertGlobals: false,
			debug: true,
			transform: [reactify]
		}))
		.pipe(rename('index.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'))
		.pipe(connect.reload());
});


gulp.task('watch', ['clean'], function () {
	gulp.watch(['components/**/*.js', 'components/**/*.jsx'], ['scripts']);
	gulp.watch(['components/**/*.css'], ['css']);
});

gulp.task('templates', function () {
	return gulp.src(['index.html'])
		.pipe(changed('build/index.html'))
		.pipe(gulp.dest('./build'))
		.pipe(connect.reload());

});

gulp.task('css', function () {
	return gulp.src('components/**/*.css')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./build/css'))
		.pipe(connect.reload());
});

gulp.task('fonts', function () {
	return gulp.src('fonts/*')
		.pipe(gulp.dest('./build/fonts'));
});

gulp.task('clean', function () {
	return gulp.src('./build')
		.pipe(vinylPaths(clean));
});

gulp.task('default', ['scripts', 'watch']);

gulp.task('build', ['clean'], function () {
	gulp.start('scripts', 'css', 'fonts', 'templates');
	gutil.log('tasks is completed');
});

gulp.task('dev', ['clean'], function () {
	gulp.start('scripts', 'css', 'fonts', 'server', 'watch', 'templates');
	gutil.log('tasks is completed');
});

gulp.task('iconfont', function () {
	var iconfont = require('gulp-iconfont');
	var svgmin = require('gulp-svgmin'),
		iconFontConfig = {
			codepoints: {
				community: 0xE000,
				games: 0xE001,
				play: 0xE002,
				search: 0xE003
			},
			fontName: 'icons',
			appendUnicode: false,
			formats: ['ttf', 'woff'],
			normalize: true,
			fontHeight: 512,
			descent: 64,
			centerHorizontally: true,
			round: '10e12'
		};

	iconFontConfig.timestamp = Math.round(Date.now() / 1000);
	iconFontConfig.metadataProvider = function (file, callback) {
		var metadata = {};
		metadata.path = file;
		metadata.name = path.basename(file).replace(path.extname(file), '');
		metadata.unicode = [String.fromCharCode(iconFontConfig.codepoints[metadata.name])];
		setImmediate(function () {
			callback(null, metadata);
		});
	};
	return gulp.src(['images/*.svg'])
		.pipe(svgmin())
		.pipe(iconfont(iconFontConfig))
		.pipe(plugin(iconFontConfig))
		.pipe(gulp.dest('./fonts'));
});

gulp.task('server', function () {
	connect.server({
		root: '',
		port: 9090,
		livereload: true
	});
});