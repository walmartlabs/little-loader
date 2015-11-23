Little Loader
=============

A lightweight, IE8+ JavaScript loader.

[![Travis Status][trav_img]][trav_site]

[![Sauce Test Status][sauce_img]][sauce_site]

<!--
[![Coverage Status][cov_img]][cov_site]
-->

### Goals

* Crafted to be inlined tightly in a page.
* Tested all the way down to IE8, but not further to keep the script as small
  as possible.
* Reliably calls back after script loads.
* ... and **that's it**!

### Usage

Little loader attaches to `window._lload` for use in your JavaScript.

```html
<script>
  window._lload("http://example.com/foo.js", function () {
    // foo.js is loaded!
  }/*, [optional context variable here] */);
</script>
```

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


[trav_img]: https://api.travis-ci.org/walmartlabs/little-loader.svg
[trav_site]: https://travis-ci.org/walmartlabs/little-loader
[sauce]: https://saucelabs.com
[sauce_img]: https://saucelabs.com/browser-matrix/wml-little-loader.svg
[sauce_site]: https://saucelabs.com/u/wml-little-loader
[cov]: https://coveralls.io
[cov_img]: https://img.shields.io/coveralls/walmartlabs/little-loader.svg
[cov_site]: https://coveralls.io/r/walmartlabs/little-loader
