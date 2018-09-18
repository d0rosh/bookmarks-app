let gulp           = require('gulp'),
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	rename         = require('gulp-rename'),
	concat      = require('gulp-concat'),
	uglify      = require('gulp-uglifyjs'),
	autoprefixer = require('gulp-autoprefixer'),
	del         = require('del'),
    cleanCSS = require('gulp-clean-css'),
    cssnano     = require('gulp-cssnano');


gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('watch',['start','sass','scripts'] ,function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch(['!app/js/*.js' ,'app/**/*.js'], ['scripts']);
});

gulp.task('css-libs', function() {
    return gulp.src([
            './node_modules/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(cssnano())
        .pipe(rename('libs.min.css'))
        .pipe(gulp.dest('app/css'));
});

gulp.task('scripts', function() {
    return gulp.src(['!app/js/*.js' ,'app/**/*.js'])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js-libs', function(){
    return gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/firebase/firebase.js',
        './node_modules/angularfire/dist/angularfire.js',
        './node_modules/ngstorage/ngStorage.min.js',
        './node_modules/angular-animate/angular-animate.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'sass', 'scripts'], function() {

    let buildCss = gulp.src([
        'app/css/main.min.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    let buildJs = gulp.src([
        'app/js/libs.min.js',
        'app/js/script.min.js'
    ])
    .pipe(gulp.dest('dist/js'))

    let buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'))

    let buildAnotherHtml = gulp.src('app/pages/**/*.html')
    .pipe(gulp.dest('dist/pages'));

    let buildRootHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));



});


gulp.task('start', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});