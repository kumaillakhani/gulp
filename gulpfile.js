var gulp = require('gulp'),
    settings = require('./settings'),
    webpack = require('webpack'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    rgba = require('postcss-hexrgba'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins'),
    colorFunctions = require('postcss-color-function');

// gulp.task('styles', function() {
//   return gulp.src(settings.themeLocation + 'css/style.css')
//     .pipe(postcss([cssImport, mixins, cssvars, nested, rgba, colorFunctions, autoprefixer]))
//     .on('error', (error) => console.log(error.toString()))
//     .pipe(gulp.dest(settings.themeLocation));
// });

// compile sass into css
function style() {
  // 1. where is my scss file
  return gulp.src(settings.themeLocation + 'css/style.css')
      // 2. pass that file through scss compiler
      .pipe(postcss([cssImport, mixins, cssvars, nested, rgba, colorFunctions, autoprefixer]))
      // 3. where do I save the compiled css?
      .pipe(gulp.dest(settings.themeLocation))
      // .pipe(gulp.dest('./css'))
      // 4. stream changes to all browser
      .pipe(browserSync.stream());
}



// gulp.task('scripts', function(callback) {
//   webpack(require('./webpack.config.js'), function(err, stats) {
//     if (err) {
//       console.log(err.toString());
//     }

//     console.log(stats.toString());
//     callback();
//   });
// });

function scripts(cb) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
}





// gulp.task('watch', function() {
//   browserSync.init({
//     notify: false,
//     proxy: settings.urlToPreview,
//     ghostMode: false
//   });

//   gulp.watch('./**/*.php', function() {
//     browserSync.reload();
//   });
//   gulp.watch(settings.themeLocation + 'css/**/*.css', gulp.parallel('waitForStyles'));
//   gulp.watch([settings.themeLocation + 'js/modules/*.js', settings.themeLocation + 'js/scripts.js'], gulp.parallel('waitForScripts'));
// });

function watch() {
    browserSync.init({
      notify: true,
      proxy: settings.urlToPreview,
      ghostMode: false
    });
    // for loading scss files
    gulp.watch(settings.themeLocation + 'css/**/*.css', style);
    // for loading html files
    gulp.watch('./*.html').on('change', browserSync.reload);
    // for loading php files
    gulp.watch('./**/*.php').on('change', browserSync.reload);
    // for loading js files
    gulp.watch([settings.themeLocation + 'js/modules/*.js', settings.themeLocation + 'js/scripts.js']).on('change', browserSync.reload);
}







// gulp.task('waitForStyles', gulp.series('styles', function() {
//   return gulp.src(settings.themeLocation + 'style.css')
//     .pipe(browserSync.stream());
// }))

// gulp.task('waitForScripts', gulp.series('scripts', function(cb) {
//   browserSync.reload();
//   cb()
// }))




exports.style = style;
exports.scripts = scripts;
exports.watch = watch;