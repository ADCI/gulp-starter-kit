#Gulp starter kit

Gulp-based build set-up for common needs.

#Concepts
- dividing source code from compiled
- separate production task
- modularity
- use of edge web technologies
- code style checking
- browsers liver reload
- dependencies through node modules (you can install libraries through NPM and import them in your styles/scripts)

#Content

Styles: 
- Normalize.css
- PostCSS: CSSNext, PreCSS and some of Rucksack plugins (not as packs, all plugins separate)
- Sourcemaps

Scripts: 
- Javascript: ES2015, ES2016
- Webpack (as module bundler)
- Sourcemaps

Code style checking:
- (Styles) Stylelint (standart config, csslint-missing + some sensible settings)
- (Scripts) ESLint (recommended config + airbnb config)

Images:
- sprites generator
- compress images in production build

Fonts (fallback: it's better to use FontSquirrel for generating fonts):
- generates TTF, WOFF, WOFF2 fonts from OTF, TTF

Browsers liver reload:
- BrowserSync

#Requirements

- Node.js - latest v6.9.x LTS "Boron" is recommended
- NPM - latest version recommended
- (optional) Yarn - to use instead of NPM
- (optional) Gulp globally - latest v3.9.x recommended, if you want to use gulp commands directly

#Installation

`npm install` or `yarn install`

#Usage
- `gulp` / `npm run build` / `yarn build` - build project
- `gulp watch` / `npm run watch` / `yarn watch` - watch changes
- `gulp serve` / `npm run serve` / `yarn serve` - local server that watches your changes (Browsersync)
- `gulp prod` / `npm run prod` / `yarn prod` - build production-ready code
Also, you can see subtasks in gulpfile.

#Browser support

Latest versions of the following:
- Chrome
- Edge
- Firefox
- Safari
- Opera
and
- Internet Explorer 9+ (Support for 9 and 10 version is being considered to drop in near future)
