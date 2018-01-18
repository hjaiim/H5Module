var gulp = require('gulp'),
	less = require('gulp-less');

var paths = {
	litheCss: 'lithe/src/less/*.less'
};

gulp.task('litheCss', function() {
	gulp.src(paths.litheCss)
		.pipe(less())
		.pipe(gulp.dest('lithe'));
});

gulp.task('watch', function() {
	gulp.watch(paths.litheCss, ['litheCss']);
});