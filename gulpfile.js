'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var jsminify = require('gulp-terser');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');

gulp.task('lint', function() {
    gulp.src(['**/*.js','!node_modules/!**'])
        .pipe(eslint({
            rules: {
                "semi": ["error", "always"],
                "quotes": ["error", "double"]
            },
            globals: [
                'jQuery',
                '$'
            ],
            envs: [
                'browser'
            ]
        }))
        .pipe(eslint.formatEach('compact', process.stderr));
});


gulp.task('minify', function(){
    return gulp.src('./src/js/*.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./build'))
        .pipe(jsminify().on('error', function(error){
        console.log( error ); }))
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('./build'))
});

gulp.task('clean', function(){
    return gulp.src('./build', {read: false})
        .pipe(clean())
});

gulp.task('dev', function (){
    browserSync.init({
        server: "./build/"
    });
    gulp.watch('./src/scss/**/*.scss',['sass']).on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js',['minify']).on('change', browserSync.reload);
    gulp.watch('./src/index.html').on('change', function(){
       return gulp.src('./src/index.html').pipe(gulp.dest('./build'))
    });
    gulp.watch('./src/index.html').on('change', browserSync.reload);

});

gulp.task('html', function(){
    gulp.src('./src/index.html').pipe(gulp.dest('./build/'));
});

gulp.task('sass', function(){
    return gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe( sass().on('error', function(error){
            console.log( error );
        }))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('main.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./build/css'))
});

gulp.task('img', function(){
    return gulp.src('./src/img/**/*')
        .pipe(imagemin({
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox:false}],
            })
        )
        .pipe(gulp.dest('./build/img'))
});

gulp.task('build', function() {
    runSequence('clean',
        ['lint', 'img', 'sass', 'minify', 'html']
        );
});

gulp.task('default', ['build'], function(){
    console.log('=== ALL DONE ===')
});