"use strict";
/*
 * Karma Configuration
 */
var path = require("path");
var ROOT = path.join(__dirname, "../../..");

module.exports = function (config) {
  config.set({
    frameworks: ["mocha", "phantomjs-shim", "requirejs", "sinon"],
    reporters: ["spec"],
    browsers: ["PhantomJS"],
    basePath: ROOT,
    files: [
      { pattern: "node_modules/chai/chai.js", included: false },
      { pattern: "lib/**/*.js", included: false },
      { pattern: "test/client/fixtures/**/*.js", included: false },
      { pattern: "test/client/requirejs/**/*.spec.js", included: false },

      "test/client/requirejs/main.js"
    ],
    port: 9999,
    singleRun: true,
    client: {
      captureConsole: true,
      mocha: {
        ui: "bdd"
      }
    }
  });
};
