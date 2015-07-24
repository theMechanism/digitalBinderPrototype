var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var rev = require('gulp-rev'); // adds hash to suffix to avoid caching problems
var del = require('del'); // to delete old files and replace with hashed names
var vinylPaths = require('vinyl-paths');
var debug = require('gulp-debug');
var es = require('event-stream'); // node module
var fs = require('fs');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  CSS_OUT: 'styles.css',
  SASS_IN: './src/sass/manifest.scss',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js'
};

gulp.task('hashify-assets', function () {
    return gulp.src('dist/src/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/src'));
});

gulp.task('build-css', function() {
  
  return gulp.src(path.SASS_IN)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(rename(path.CSS_OUT)) 
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);
  gulp.watch('src/sass/**/*.scss', ['build-css']);


  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(streamify(rev()))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('getFileNames', function(){
  var dir = path.DEST_SRC;
  var results = [];
  fs.readdirSync(dir).forEach(function(file) {
      // console.log(file);
      file = dir+'/'+file;
      console.log(file);
      // var stat = filesystem.statSync(file);
      // console.log(stat);
      // if (stat && stat.isDirectory()) {
      //     results = results.concat(_getAllFilesFromFolder(file))
      // } else results.push(file);
      // results.push(file);
  });
  // return results;
  // gulp.src(path.DEST_BUILD + '/*')
  // .pipe( log.data(data.path)

})

gulp.task('clearOld:builds.min', function () {
  del([
    path.DEST_BUILD + '/*'
  ]);
});

gulp.task('production', ['clearOld:builds.min', 'build', 'replaceHTML']);

gulp.task('default', ['watch']);