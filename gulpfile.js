const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const minifycss = require('gulp-minify-css');
const newer = require('gulp-newer');
// const notify = require('gulp-notify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

//development mode
devBuild = (process.env.NODE_ENV !=='production'),

//folders 
src = 'src/',
build = 'build/'
;


// compile sass to css Gulp_4
function style() {
   
    return gulp.src('src/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(build + 'css/'))
    .pipe(browserSync.stream())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(build + 'css/'))
    // .pipe(notify({message: 'Style task complete'}))
    ;
}
exports.style = style;

//watch task
function watch() {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    gulp.watch('src/sass/**/*.scss', style);
    gulp.watch('*.html'). on('change',browserSync.reload);
    gulp.watch('src/js/**/*.js'). on('change',browserSync.reload);
}
exports.watch = watch;

// Image min
function images(){
    // const out = build + 'images/';
    return gulp.src(src + 'images/**/*')
    .pipe(newer(build))
    // .pipe(newer(out))
    .pipe(imagemin({optimizationlevel: 5 }))
    .pipe(gulp.dest(build + 'imagesMIN'));
    // .pipe(gulp.dest(out));
};
exports.images = images;


gulp.task('clean',function(){
    return gulp.src(['build/styles', 'build/scripts', 'build/images'], {read:false}
    .pipe(clean()));
})
exports.clean = clean;





exports.default = gulp.series(exports.watch, exports.images, exports.clean );