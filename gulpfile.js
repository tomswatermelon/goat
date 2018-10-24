var gulp = require('gulp');
gulp.task('default', function(){
    console.log('default gulp task...')
});

var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var plumberErrorHandler = { errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
};
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var order = require('gulp-order');
var uglify = require('gulp-uglify');


gulp.task('sass', function () {
    gulp.src('src/css/*.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false,
            remove:false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());

    gulp.src('src/css/vendors/*.css')
        .pipe(concatCss('vendors.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));

});


gulp.task('js', function () {

    gulp.src(['src/js/vendors/*.js','src/js/modules/*.js'])
        .pipe(order([
            'src/js/vendors/*.js',
            'src/js/modules/*.js',
        ], { base: './' }))
        .pipe(concat('common.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    gulp.src('src/js/*.js')
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

});

var imagemin = require('gulp-imagemin');
gulp.task('img', function() {

    gulp.src('src/img/*.{png,jpg,gif,svg,ico}')
        .pipe(imagemin({
        optimizationLevel: 6,
        progressive: true
    }))
        .pipe(gulp.dest('dist/img'))

});

gulp.task('font', function () {
    gulp.src('src/fonts/*.{ttf,eot,svg,woff,woff2,otf}')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('php', function () {
    gulp.src('src/*.php')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['src/css/*.scss','src/css/*/*.scss'], ['sass']);
    gulp.watch(['src/js/*.js','src/js/*/*.js'], ['js']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/*.php', ['php']);
    gulp.watch('src/fonts/*.{ttf,eot,svg,woff,woff2,otf}', ['font']);
    gulp.watch('src/img/*.{png,jpg,gif,svg,ico}', ['img']);
});



gulp.task('default', ['sass','js','img','html','php','font','watch']);
