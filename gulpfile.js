var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var less = require('gulp-less');
var clean = require('gulp-clean');
var webpack = require('webpack');
var config = require('./webpack.config');

gulp.task('env', function() {
	console.log(process.env)
});

gulp.task('concat', function() {
	gulp.src([
			'src/libs/bootstrap/js/transition.js',
			'src/libs/bootstrap/js/alert.js',
			'src/libs/bootstrap/js/button.js',
			'src/libs/bootstrap/js/carousel.js',
			'src/libs/bootstrap/js/collapse.js',
			'src/libs/bootstrap/js/dropdown.js',
			'src/libs/bootstrap/js/modal.js',
			'src/libs/bootstrap/js/tooltip.js',
			'src/libs/bootstrap/js/popover.js',
			'src/libs/bootstrap/js/scrollspy.js',
			'src/libs/bootstrap/js/tab.js',
			'src/libs/bootstrap/js/affix.js'
		])
		.pipe(concat('bootstrap.js'))
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('src/libs/bootstrap/dist/js'));
});

gulp.task('less', function() {
	return gulp.src('src/libs/bootstrap/less/bootstrap.less')
		.pipe(less())
		.pipe(rename({suffix:'.min'}))
    	.pipe(minifycss())
		.pipe(gulp.dest('src/libs/bootstrap/dist/css'));
});

gulp.task('clean', function() {
	return gulp.src('dist', {
			read: false
		})
		.pipe(clean());
});

gulp.task('webpack', ['clean'], function(cb) {
	webpack(config, cb)
});

gulp.task('default', ['concat', 'less', 'webpack'], function() {
	console.log(process.env.NODE_ENV);
})

gulp.task('bootstrap', ['concat', 'less'], function() {
	console.log(process.env.NODE_ENV);
})