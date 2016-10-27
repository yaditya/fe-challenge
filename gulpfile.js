'use strict';

var gulp       = require('gulp');
var $          = require('gulp-load-plugins')();
var sync       = $.sync(gulp).sync;
var del        = require('del');
var browserify = require('browserify');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');

var bundler = {
	w: null,
	init: function() {
		this.w = watchify(browserify({
			entries: ['./app/scripts/app.js'],
			insertGlobals: true,
			cache: {},
			packageCache: {}
		}));
	},
	bundle: function() {
		return this.w && this.w.bundle()
			.on('error', $.util.log.bind($.util, 'Browserify Error'))
			.pipe(source('app.js'))
			.pipe(gulp.dest('dist/scripts'));
	},
	watch: function() {
		this.w && this.w.on('update', this.bundle.bind(this));
	},
	stop: function() {
		this.w && this.w.close();
	}
};

gulp.task('styles', function() {
	return $.rubySass('app/styles/main.scss', {
			style: 'expanded',
			precision: 10,
			loadPath: ['node_modules/bootstrap-sass/assets/stylesheets']
		})
		.on('error', $.util.log.bind($.util, 'Sass Error'))
		.pipe($.autoprefixer('last 1 version'))
		.pipe(gulp.dest('dist/styles'))
		.pipe($.size());
});

gulp.task('scripts', function() {
	bundler.init();
	return bundler.bundle();
});

gulp.task('html', function() {
	var assets = $.useref.assets();
	return gulp.src('app/*.html')
		.pipe(assets)
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe(gulp.dest('dist'))
		.pipe($.size());
});

gulp.task('images', function() {
	return gulp.src('app/assets/images/**/*')
		.pipe($.cache($.imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
		.pipe($.size());
});

gulp.task('fonts', function() {
	return gulp.src(['app/assets/fonts/**/*'])
		.pipe(gulp.dest('dist/fonts'))
		.pipe($.size());
});

gulp.task('extras', function () {
	return gulp.src(['app/*.txt', 'app/*.ico'])
		.pipe(gulp.dest('dist/'))
		.pipe($.size());
});

gulp.task('serve', function() {
	gulp.src('dist')
		.pipe($.webserver({
			livereload: true,
			port: 9000
		}));
});

gulp.task('clear', function (done) {
  	return $.cache.clearAll(done);
});

gulp.task('set-production', function() {
	process.env.NODE_ENV = 'production';
});

gulp.task('minify:js', function() {
	return gulp.src('dist/scripts/**/*.js')
		.pipe($.uglify())
		.pipe(gulp.dest('dist/scripts/'))
		.pipe($.size());
});

gulp.task('minify:css', function() {
	return gulp.src('dist/styles/**/*.css')
		.pipe($.minifyCss())
		.pipe(gulp.dest('dist/styles'))
		.pipe($.size());
});

gulp.task('minify', ['minify:js', 'minify:css']);

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('bundle', ['html', 'styles', 'scripts', 'images', 'fonts', 'extras']);

gulp.task('clean-bundle', sync(['clean', 'bundle']));

gulp.task('build', ['clean-bundle'], bundler.stop.bind(bundler));

gulp.task('build:production', sync(['set-production', 'build', 'minify']));

gulp.task('serve:production', sync(['build:production', 'serve']));

gulp.task('default', ['build']);

gulp.task('watch', sync(['clean-bundle', 'serve']), function() {
	bundler.watch();
	gulp.watch('app/*.html', ['html']);
	gulp.watch('app/styles/**/*.scss', ['styles']);
	gulp.watch('app/assets/images/**/*', ['images']);
	gulp.watch('app/assets/fonts/**/*', ['fonts']);
});
