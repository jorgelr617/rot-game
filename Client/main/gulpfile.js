const browserify = require('browserify')
const babelify = require('babelify')
const watchify = require('watchify')
const fs = require('fs')
const gulp = require('gulp')
const gulpUtil = require('gulp-util')

var b = watchify(browserify("src/index.js"))
var counter = 0;

gulp.task('watch', bundler)
b.on('update', bundler)
b.on('log', gulpUtil.log)
b.on('error', function(error) {
  console.log(error.toString());
  this.emit("end");
})

function bundler() {
  counter++
  console.log("Bundling " + counter);
  //console.log(gulpUtil.log());
  b.transform("babelify", {presets: ["es2015"]})
      .bundle()
      .pipe(fs.createWriteStream("bundle.js"))
}
