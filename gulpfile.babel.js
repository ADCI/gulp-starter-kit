/**
 * Imports
 */

// common
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import buffer from 'vinyl-buffer';
import runSequence from 'run-sequence';

// styles
import autoprefixer from 'autoprefixer';
import postscss from 'postcss-scss';
import cssMqpacker from 'css-mqpacker';
import postcssNext from 'postcss-cssnext';
import postcssImport from 'postcss-import';
import postcssExtend from 'postcss-extend';
import postcssReporter from 'postcss-reporter';
import cssnano from 'cssnano';

// js
import webpack from 'webpack-stream';

// linters
import friendlyFormatter from 'eslint-friendly-formatter';
import stylelint from 'stylelint';

// Images
import pngquant from 'imagemin-pngquant';

// Browser
import browserSync from 'browser-sync';

// Fonts
import Fontmin from 'fontmin';

/**
 * Variables
 */
const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const stylesType = 'postcss'; // postcss or scss
const stylesExtension = stylesType === 'postcss' ? '.css' : '.scss';

// Paths
const dist = './dist';
const src = './src';

/**
 * Tasks
 */

// Images
gulp.task('images', () => {
  // separate images
  gulp.src(src + '/img/**/*.*')
    .pipe(gulp.dest(dist + '/img'));

  // sprites
  let spriteData = gulp.src(src + '/img/sprite/*.*')
    .pipe($.spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite' + stylesExtension,
      imgPath: dist + '../img/sprite.png'
    }));
  spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest(dist + '/img'));
  spriteData.css
    .pipe(gulp.dest(src + '/' + stylesType));
});

gulp.task('images:prod', () => {
  // separate images
  gulp.src(src + '/img/**/*.*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ],
      use: [pngquant()]
    })))
    .pipe(gulp.dest(dist + '/img'));

  // sprites
  let spriteData = gulp.src(src + '/img/sprite/*.*')
    .pipe($.spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite' + stylesExtension,
      imgPath: dist + '../img/sprite.png'
    }));
  spriteData.img
    .pipe(buffer())
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ],
      use: [pngquant()]
    })))
    .pipe(gulp.dest(dist + '/img'));
  spriteData.css
    .pipe(gulp.dest(src + '/' + stylesType));
});

// Copy all files at the root level (src)
gulp.task('copy', () => {
  // 1st level files
  gulp.src(
    [
      src + '/*',
      '!' + src + '/postcss',
      '!' + src + '/scss',
      '!' + src + '/pug'
    ],
    {
      dot: true
    }
  ).pipe(gulp.dest(dist))
    .pipe($.size({title: 'copy'}));

  // fonts
  gulp.src([
    src + '/fonts/**/*.*',
  ], {
    dot: true
  }).pipe(gulp.dest(dist + '/fonts'));
});

// Fonts
gulp.task('fonts', () => {
  let fontmin = new Fontmin()
    .src(src + '/fonts/**/*.*')
    .use(Fontmin.otf2ttf())
    .use(Fontmin.ttf2woff())
    .dest(dist + '/fonts');

  fontmin.run(function (err, files) {
    if (err) {
      throw err;
    }

    gulp.src(dist + '/fonts/**/*.ttf')
      .pipe($.ttf2woff2())
      .pipe(gulp.dest(dist + '/fonts'));
  });
});

// Styles
const supportedBrowsers = [
  '> 0.5%',
  'last 2 versions'
];
const postcssProcessors = [
  postcssImport,
  postcssExtend,
  postcssNext({ browsers: supportedBrowsers }),
  postcssReporter({ clearReportedMessages: true })
];
const postcssProcessorsProd = [
  postcssImport,
  postcssExtend,
  postcssNext({ browsers: supportedBrowsers }),
  cssMqpacker({ sort: true }),
  cssnano({
    autoprefixer: false
  }),
  postcssReporter({ clearReportedMessages: true })
];
const scssProcessors = [
  postcssExtend,
  autoprefixer({
    browsers: supportedBrowsers,
    cascade: false
  }),
];
const scssProcessorsProd = [
  postcssExtend,
  autoprefixer({
    browsers: supportedBrowsers,
    cascade: false
  }),
  cssMqpacker({ sort: true }),
  cssnano({
    autoprefixer: false
  }),
];
const stylelintScss = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-scss"
  ],
  "rules": {
    "at-rule-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "selector-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,
    "max-nesting-depth": [
      4,
      {
        "ignore": [
          "blockless-at-rules"
        ]
      }
    ],
    "selector-max-compound-selectors": 4,
    "selector-max-specificity": "1,4,1",
    "declaration-no-important": true,
    "selector-no-universal": true,
    "max-line-length": 120,
    "no-eol-whitespace": null
  },
  "ignoreFiles": [
    "node_modules"
  ]
};

gulp.task('postcss', ['postcss:lint'], () => {
  gulp.src(src + '/postcss/*.css')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.postcss(postcssProcessors, {syntax: postscss}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(dist + '/css'));
});

gulp.task('postcss:prod', ['postcss:lint'], () => {
  gulp.src(src + '/postcss/*.css')
    .pipe($.postcss(postcssProcessorsProd, {syntax: postscss}))
    .pipe(gulp.dest(dist + '/css'));
});

gulp.task('postcss:lint', () => {
  gulp.src(src + '/postcss/**/*.css')
  .pipe($.postcss([
    stylelint,
    postcssReporter({ clearReportedMessages: true })
  ], {syntax: postscss}));
});

gulp.task('scss', ['scss:lint'], () => {
  gulp.src(src + '/scss/*.scss')
  .pipe($.plumber())
  .pipe($.sourcemaps.init())
  .pipe($.sass().on('error', $.sass.logError))
  .pipe($.postcss(scssProcessors))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(dist + '/css'))
  .pipe(reload({stream:true}));
});

gulp.task('scss:prod', ['scss:lint'], () => {
  gulp.src(src + '/scss/*.scss')
  .pipe($.sass().on('error', $.sass.logError))
  .pipe($.postcss(scssProcessorsProd))
  .pipe(gulp.dest(dist + '/css'));
});

gulp.task('scss:lint', () => {
  gulp.src(src + '/scss/**/*.scss')
  .pipe($.postcss([
    stylelint({
      config: stylelintScss
    }),
    postcssReporter({ clearReportedMessages: true })
  ], {syntax: postscss}));
});

// Scripts
const webpackConfig = {
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'es2016']
      }
    }]
  },
  entry: {
    main: __dirname + '/src/js/main.js',
  },
  output: {
    path: __dirname + dist + "/js",
    filename: "[name].js"
  }
};

gulp.task('scripts', ['scripts:lint'], () => {
  gulp.src(src + '/js/*.js')
    .pipe($.sourcemaps.init())
    .pipe(webpack(webpackConfig))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(dist + '/js'))
    .pipe(reload({stream:true}));
});

gulp.task('scripts:prod', ['scripts:lint'], () => {
  gulp.src(src + '/js/*.js')
    .pipe(webpack(webpackConfig))
    .pipe($.uglify())
    .pipe(gulp.dest(dist + '/js'))
});

gulp.task('scripts:lint', () => {
  return gulp.src(src + '/js/**/*.js')
  .pipe($.eslint())
  .pipe($.eslint.format(friendlyFormatter));
});

// Markup
gulp.task('markup', () => {
  gulp.src(src + '/pug/*.pug')
    .pipe($.plumber())
    .pipe($.pug())
    .pipe(gulp.dest(dist))
    .pipe(reload({stream:true}));
});

// Clean output directory
gulp.task('clean', () => del([dist], { dot: true }));

// Build dev files
gulp.task('default', ['clean'], cb => {
  runSequence(
    ['markup', stylesType, 'scripts', 'images', 'copy'],
    cb
  );
});

// Build production files
gulp.task('prod', ['clean'], cb => {
  runSequence(
    ['markup', stylesType + ':prod', 'scripts:prod', 'images:prod', 'copy'],
    cb
  );
});

// Watch
gulp.task('watch', ['default'], () => {
  gulp.watch([src + '/' + stylesType + '/**/*' + stylesExtension], [stylesType, reload]);
  gulp.watch([src + '/js/**/*.js'], ['scripts', reload]);
  gulp.watch([src + '/img/**/*'], ['images', reload]);
  gulp.watch([src + '/pug/**/*'], ['markup', reload]);
});

// Build and serve the output from the dist build
gulp.task('serve', ['default'], () => {
  browserSync({
    notify: false,
    server: dist
  });

  gulp.watch([src + '/' + stylesType + '/**/*' + stylesExtension], [stylesType, reload]);
  gulp.watch([src + '/js/**/*.js'], ['scripts', reload]);
  gulp.watch([src + '/img/**/*'], ['images', reload]);
  gulp.watch([src + '/pug/**/*'], ['markup', reload]);
});
