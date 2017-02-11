#Gulp starter kit

Gulp-based build set-up for common needs.

#Concepts
- dividing source code from compiled
- modularity
- use of edge web technologies
- code style checking

#Content

Styles: 
- PostCSS: CSSNext, PreCSS and some of Rucksack plugins (not as packs, all plugins separate)

Scripts: 
- Javascript: ES2015, ES2016

Code style checking:
- (Styles) Stylelint (standart config, csslint-missing + some sensible settings)
- (Scripts) ESLint (recommended config + airbnb config)

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

#Browser support

Latest versions of the following:
- Chrome
- Edge
- Firefox
- Safari
- Opera
and
- Internet Explorer 9+ (Support for 9 and 10 version is being considered to drop in near future)
