const gulp = require('gulp');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const paths = {
    scripts: {
        src: 'src/js/main.js',
        dest: 'dist/js/'
    },
    styles: {
        src: 'src/css/style.css',
        dest: 'dist/css/'
    }
};

function minifyJS() {
    return gulp.src(paths.scripts.src)
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scripts.dest));
}

function minifyCSS() {
    return gulp.src(paths.styles.src)
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest));
}

function watchFiles() {
    gulp.watch(paths.scripts.src, minifyJS);
    gulp.watch(paths.styles.src, minifyCSS);
}

const build = gulp.series(gulp.parallel(minifyJS, minifyCSS));
const watch = gulp.series(build, watchFiles);

gulp.task('default', build);

exports.minifyJS = minifyJS;
exports.minifyCSS = minifyCSS;
exports.build = build;
exports.watch = watch;
exports.default = build;