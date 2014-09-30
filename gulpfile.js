// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var cssmin = require('gulp-cssmin');



// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}));

});

gulp.task('cssMinify', function () {
  return gulp.src('css/*.css')
    //.pipe(cssmin())
    .pipe(gulp.dest('dist/css/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        //.pipe(rename('all.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Copy fonts from a module outside of our project (like Bower)
gulp.task('copyfiles', function() {
    gulp.src('./images/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('./images'));
});


// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});



// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Default Task
gulp.task('default',  ['lint', 'sass', 'scripts',  'browser-sync'], function (){
   
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
       gulp.watch("*.html", ['bs-reload']);
});