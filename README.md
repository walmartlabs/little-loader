Little Loader
=============

A lightweight, IE8+ JavaScript loader that is **actually tested**...

[![Travis Status][trav_img]][trav_site]
[![Coverage Status][cov_img]][cov_site]
![size](http://badges.herokuapp.com/size/npm/little-loader/dist/little-loader.min.js)
![size (gz)](http://badges.herokuapp.com/size/npm/little-loader/dist/little-loader.min.js?gzip=true&label=size%20(gz))

[![Sauce Test Status][sauce_img]][sauce_site]

... with a very narrow set of objectives:

* **Tested** all the way down to IE8
* Reliably **calls back** after script loads
* Captures script load **errors** down to IE8
* Really, really **small** (clocking in at `~474` minified + gzipped bytes)
* ... and **that's it**!

We currently test:

* Karma - _Travis_: PhantomJS, Firefox
* Selenium - _Travis_: PhantomJS, Firefox
* Selenium - _Sauce Labs_:
    * Windows: Firefox, Chrome, IE8-11
    * Mac: Safari

### Usage

Alone, little loader attaches to `window._lload` for loading your Javascript:

```html
<script>
  window._lload("http://example.com/foo.js", function (err) {
    // `err` is script load error.
    // otherwise, foo.js is loaded!
  }/*, [optional context (`this`) variable here] */);
</script>
```

If you use an AMD bundling tool (like RequireJS):

```js
define(["little-loader"], function (load) {
  load("http://example.com/foo.js", function (err) {
    // ... your code ...
  });
});
```

If you use a CommonJS bundling tool (like Webpack):

```js
var load = require("little-loader");

load("http://example.com/foo.js", function (err) {
  // ... your code ...
});
```

### Installation

#### CDN

For the ready-to-use version from CDN, use

```html
<!-- Minified, production version -->
<script src="https://npmcdn.com/little-loader@VERSION/dist/little-loader.min.js"></script>
<!-- Development version -->
<script src="https://npmcdn.com/little-loader@VERSION/lib/little-loader.js"></script>
```

#### NPM

To include `little-loader` as part of your own build, first install from `npm`:

```
$ npm install --save little-loader
```

The library has a UMD wrapper and should work like any other AMD or CommonJS
module with your favorite bundling tool (Webpack, RequireJS, etc.).

If you do not use a CommonJS or AMD loader tool, then little loader will be
exposed as the `window._lload` variable.

### Development

Development requires two installation steps:

```sh
$ npm install
$ npm run install-dev
```

After that, run the full lint + tests:

```sh
$ npm run check
```

You can try out the live functional tests fixtures with our static server:

```sh
$ npm run server
```

and navigate to: http://127.0.0.1:3001/test/func/fixtures/

### Tests

We run both Karma (client-side) and Selenium (functional) tests.

The **Karma** tests are faster and more flexible, but slightly "off" from
real-world use because of their execution environment. We use Karma tests to
kick the tires on our AMD and CommonJS abstractions and little, one-off use
case scenarios.

The **Selenium** tests are slower and klunky, but they are the "real deal"
executing `little-loader` in exactly the same manner as would be used on a
real web page. We use Selenium to test a core set of fundamental use cases
across all browsers in our matrix.

#### Parallel Local Tests

Our CI is setup with a specific optimized parallel workflow. To run parallel
functional tests in development, here are some helper tasks...

**Local Browsers**

```sh
$ TEST_PARALLEL=true \
  builder envs test-func-local \
  --setup=setup-local \
  --buffer \
  '[ { "TEST_FUNC_PORT": 3030, "ROWDY_SETTINGS":"local.phantomjs" },
     { "TEST_FUNC_PORT": 3040, "ROWDY_SETTINGS":"local.firefox" },
     { "TEST_FUNC_PORT": 3050, "ROWDY_SETTINGS":"local.chrome" }
   ]'
```

The `TEST_PARALLEL` flag indicates to not do in-test setup which would conflict
with other test processes. We also rely on setting `TEST_FUNC_PORT` specifically
to non-conflicting ports with at least 3 ports total from the starting number
for the two separate static servers we run during tests.

**Sauce Labs**

To run Sauce Labs tests in parallel from a local machine, you'll need the `sc`
binary, which can be force installed with:

```sh
$ SAUCE_CONNECT_DOWNLOAD_ON_INSTALL=true npm install sauce-connect-launcher
```

After this, the module is available at:
`node_modules/sauce-connect-launcher/sc/*/bin/sc`

From there, you can invoke our helper local commands:

```sh
$ TEST_PARALLEL=true \
  SAUCE_USERNAME=<INSERT_USERNAME> \
  SAUCE_ACCESS_KEY=<INSERT_ACCESS_KEY> \
  builder envs test-func-sauce \
  --setup=setup-sauce \
  --buffer \
  '[ { "TEST_FUNC_PORT": 3030, "ROWDY_SETTINGS":"sauceLabs.IE_8_Windows_2008_Desktop" },
     { "TEST_FUNC_PORT": 3040, "ROWDY_SETTINGS":"sauceLabs.IE_9_Windows_2008_Desktop" },
     { "TEST_FUNC_PORT": 3050, "ROWDY_SETTINGS":"sauceLabs.IE_10_Windows_2012_Desktop" }
   ]'
```


### Releases

**IMPORTANT - NPM**: To correctly run `preversion` your first step is to make
sure that you have a very modern `npm` binary:

```sh
$ npm install -g npm
```

First, you can optionally edit and commit the project history.

```sh
$ vim HISTORY.md
$ git add HISTORY.md
$ git commit -m "Update history for VERSION"
```

Now we're ready to publish. Choose a semantic update for the new version.
If you're unsure, read about semantic versioning at http://semver.org/

```sh
$ npm version VERSION|major|minor|patch -m "Version %s - INSERT_REASONS"
```

Now `postversion` will push to git and publish to NPM.

[trav_img]: https://api.travis-ci.org/walmartlabs/little-loader.svg
[trav_site]: https://travis-ci.org/walmartlabs/little-loader
[sauce]: https://saucelabs.com
[sauce_img]: http://badges.herokuapp.com/sauce/wml-little-loader
<!--[sauce_img]: https://saucelabs.com/browser-matrix/wml-little-loader.svg-->
[sauce_site]: https://saucelabs.com/u/wml-little-loader
[cov]: https://coveralls.io
[cov_img]: https://img.shields.io/coveralls/walmartlabs/little-loader.svg
[cov_site]: https://coveralls.io/r/walmartlabs/little-loader
