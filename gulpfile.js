const { src , dest , watch , series} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss')
function buildStyle() {
    return src('src/public/scss/**/*.scss')
        .pipe(sass())
        .pipe(purgecss({content : ['src/views/**/*.ejs']}))
        .pipe(dest("src/public/css"))
}

function watchTask() {
    watch(["src/public/scss/**/*.scss" , 'src/views/**/*.ejs'],buildStyle)
}

exports.default = series(buildStyle,watchTask)