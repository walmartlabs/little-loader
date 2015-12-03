/**
 * Test setup for client-side tests.
 */
// TODO: Add expect.js + ie8 compat.
// https://github.com/walmartlabs/little-loader/issues/17

(function () {
  requirejs.config({
    // Karma serves files from '/base'
    baseUrl: "/base",

    paths: {
      "chai": "node_modules/chai/chai"
    }
  });

  require(["chai"], function (chai) {
    /*globals window:false*/

    // ------------------------------------------------------------------------
    // Chai / Mocha configuration.
    // ------------------------------------------------------------------------
    // Exports
    window.expect = chai.expect;

    // Mocha (part of static include).
    window.mocha.setup({
      ui: "bdd",
      bail: false
    });

    // ------------------------------------------------------------------------
    // Bootstrap
    // ------------------------------------------------------------------------
    var tests = [];
    for (var file in window.__karma__.files) {
      if (/\.spec\.js$/.test(file)) {
        tests.push(file);
      }
    }

    require(tests, function () {
      window.__karma__.start();
    });
  });
}());
