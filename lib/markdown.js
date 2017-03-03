'use strict';

const markdown = require('markdown').markdown;
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const cache = {};

module.exports = config => {
  config = config || {};
  config.dir = config.dir || 'content';
  config.method = config.method || 'markdown';
  config.fallbackLang = config.fallbackLang || [''];
  config.ext = config.ext || 'md';
  return (req, res, next) => {
    const View = req.app.get('view');
    res.locals[config.method] = () => {
      return file => {
        if (!file) {
          throw new Error('markdown: filename must be specified');
        }
        const views = req.app.get('views');
        const languages = _.uniq([].concat(req.lang).concat(config.fallbackLang)).filter(a => typeof a === 'string');
        const paths = views.map(dir => {
          return languages.map(lang => path.resolve(dir, config.dir, lang.toLowerCase()));
        });

        // use express' `View` class to shortcut looking up files
        const view = new View(file, {
          defaultEngine: config.ext,
          root: _.flatten(paths),
          engines: { [`.${config.ext}`]: {} }
        });

        if (!view.path) {
          throw new Error(`Could not find content: ${file}`);
        }

        const md = cache[view.path] || fs.readFileSync(view.path).toString('utf8');
        cache[view.path] = md;

        return markdown.toHTML(md);
      };
    };
    next();
  };
};
