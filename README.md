# Gulp starter kit

Gulp-based build set-up for common needs.

## Concepts
- divide source code from compiled
- separate production task
- modularity
- modern, future-proof technologies
- linting (code style / syntax errors checking)
- browsers live reload
- dependencies through node modules (you can install libraries through NPM and import them in your styles/scripts)

## Content

Styles:
- Normalize.css
- PostCSS: CSSNext
- Sass + autoprefixer
- Sourcemaps
- Production: mqpacker, cssnano

**Note** You can choose only PostCSS or Sass (default is Sass): just change `stylesType` variable and delete unecessary folder (/src/postcss or /src/scss).

Scripts: 
- Javascript: ES2015, ES2016
- Webpack 2.x (as module bundler)
- Sourcemaps
- Production: UglifyJS

Code style checking:
- (Styles) Stylelint: standard config + some sensible settings
- (Scripts) ESLint: recommended config + Airbnb config

Images:
- sprites generator (spritesmith)
- Production: imagemin

Fonts:
- generates TTF, WOFF, WOFF2 fonts from OTF, TTF

Browsers live reload:
- BrowserSync

## Base structure

**src/**

PostCSS (postcss/) / Sass (scss/):
- main source file (main.css / main.scss)
- base/:
  - vars: variables
  - elements: base html elements styles
- objects/: OOCSS
- components/: BEM, Atomic Design
- tools/: mixins
  
JavaScript (js/):
- main source file (main.js)
- modules/: folder for javascript modules

Images (img/):
- img/ - source images
- img/sprite/ - source images for sprite

Fonts (fonts/) - source fonts

**dist/**

- css/main.css - output css
- js/main.js - output js
- img/ - output images
- img/sprite.png - output sprite
- fonts/ - output fonts

## Requirements

- Node.js - latest v6.x LTS "Boron" is recommended
- (optional) Gulp globally - latest v3.9.x recommended if you want to use gulp commands directly

## Installation

`npm install`

## Usage

- `gulp` / `npm run build` - build project
- `gulp watch` / `npm run watch` - watch changes
- `gulp serve` / `npm run serve` - local server that watches your changes (Browsersync)
- `gulp prod` / `npm run prod` - build production-ready code

Also, you can see subtasks in gulpfile.

## Browser support

- \> 0.5%
- last 2 versions

## Related links

- [nvm](https://github.com/creationix/nvm), [Node.js](https://nodejs.org/en/), [NPM](https://www.npmjs.com/), [Yarn](https://yarnpkg.com/lang/en/)
- [Gulp](http://gulpjs.com/)
- CSS: [Normalize.css](http://necolas.github.io/normalize.css/), [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/), [BEM](http://getbem.com/introduction/), [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/), [CSS MQPacker](https://github.com/hail2u/node-css-mqpacker), [cssnano](http://cssnano.co/)
- [PostCSS](http://postcss.org/): [CSSNext](http://cssnext.io/)
- [Sass (SCSS)](http://sass-lang.com/)
- [Sourcemaps](https://blog.logentries.com/2014/12/what-are-javascript-source-maps/)
- JavaScript: [ES2015](https://babeljs.io/learn-es2015/), [ES2016](http://www.2ality.com/2016/01/ecmascript-2016.html), [JavaScript Modules](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.gckmsqgz5),  [UglifyJS](https://github.com/mishoo/UglifyJS2)
- [Module Bundling](https://medium.freecodecamp.com/javascript-modules-part-2-module-bundling-5020383cf306#.jylmhm5v0): [Webpack](https://webpack.github.io/)
- Linters: [Stylelint](https://stylelint.io/), [ESLint](http://eslint.org/)
- Images: [spritesmith](https://github.com/twolfson/gulp.spritesmith), [imagemin](https://github.com/sindresorhus/gulp-imagemin)
- [BrowserSync](https://browsersync.io/)

## Webpack starter kit

There also exist webpack + npm scripts based build similar to this that is considered as main and has priority above this kit. In the near future, development for gulp starter kit will be stopped and the webpack starter kit will be the only supported build.

https://github.com/ADCI/webpack-starter-kit
