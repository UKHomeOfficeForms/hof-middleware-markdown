# hof-middleware-markdown
i18n-compatible markdown rendering for static content into templates

## Usage

First, mount the middleware in your app.

```js
const markdown = require('hof-middleware-markdown');
app.use(markdown());
```

Then you can embed static markdown snippets in your templates as follows.

```
{{#markdown}}file-name{{//markdown}}
```

Snippets will be loaded from within `content` directories inside your express `views` directories. So if you have your express `views` set to `/path/to/my/views` then the markdown snippets will be looked for in `/path/to/my/views/content`.

## i18n

If `req.lang` is set (and it will be in hof-bootstrap apps) then content will be loaded first in directories corresponding to the request langauge.

So if `req.lang` is set to `['en-US', 'en']` then the content will be loaded first from `/path/to/my/views/content/en-us` then `/path/to/my/views/content/en` and finally `/path/to/my/views/content`.

Note: language codes are *always* lower case when mapped to directories.

## Configuration

The markdown middleware can be configured by passing options at initialisation.

```js
const markdown = require('hof-middleware-markdown');
app.use(markdown(options));
```

### Options

* `method` - Default: `markdown` - sets the name of the method exposed to templates.
* `dir` - Default: `content` - sets the subdirectory of `views` in which to find content snippets.
* `fallbackLang` - Default: [''] - sets the directories in which to look for content if no matching language specific directory exists.
