var gulp = require('gulp');
gulp.task('default', function(){
    console.log('default gulp task...')
});

var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var order = require('gulp-order');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var stripdebug = require('gulp-strip-debug');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');

gulp.task('sass', function () {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false,
            remove:false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())

    gulp.src('src/css/vendors/*.css')
        .pipe(concatCss('vendors.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())

});

gulp.task('sass-pro', function () {
    gulp.src('src/css/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false,
            remove:false
        }))
        .pipe(gulp.dest('dist/css'))

    gulp.src('src/css/vendors/*.css')
        .pipe(concatCss('vendors.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function () {

    gulp.src([
        'node_modules/vue/dist/vue.min.js',
        'src/js/vendors/*.js',
        'src/js/modules/*.js'
    ])
        .pipe(order([
            'node_modules/vue/dist/vue.min.js',
            'src/js/vendors/*.js',
            'src/js/modules/*.js',
        ], { base: './' }))
        .pipe(concat('common.js'))
        .pipe(gulp.dest('dist/js'));

    gulp.src([
        'src/js/*.js',
        'src/js/modules/*.js' 
    ])
        .pipe(order([
            'src/js/*.js',
            'src/js/modules/*.js',
        ], { base: './' }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('dist/js'));

});

gulp.task('js-pro', function () {

    gulp.src([
        'node_modules/vue/dist/vue.min.js',
        'src/js/vendors/*.js',
        'src/js/modules/*.js'
    ])
        .pipe(order([
            'node_modules/vue/dist/vue.min.js',
            'src/js/vendors/*.js',
            'src/js/modules/*.js',
        ], { base: './' }))
        .pipe(concat('common.js'))
        .pipe(stripdebug())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    gulp.src([
        'src/js/*.js',
        'src/js/modules/*.js' 
    ])
        .pipe(order([
            'src/js/*.js',
            'src/js/modules/*.js',
        ], { base: './' }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(stripdebug())
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(gulp.dest('dist/js'));

});

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
});

gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('watch', function() {
    browserSync.init({
        server: './dist',
        browser: 'google chrome'
    });
    gulp.watch(['src/css/*.scss','src/css/*/*.scss'], ['sass']);
    gulp.watch(['src/js/*.js','src/js/*/*.js'], ['js','reload']);
    gulp.watch('src/*.html', ['html','reload']);
    gulp.watch('src/fonts/*.{ttf,eot,svg,woff,woff2,otf}', ['font','reload']);
});



gulp.task('dev', ['sass','js','html','font','watch']);
gulp.task('production',['sass-pro','js-pro','html','font'])
