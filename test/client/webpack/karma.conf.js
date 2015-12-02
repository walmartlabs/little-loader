"use strict";
/*
 * Karma Configuration
 */
var path = require("path");
var ROOT = path.join(__dirname, "../../..");

module.exports = function (config) {
  config.set({
    frameworks: ["mocha", "phantomjs-shim"],
    reporters: ["spec"],
    browsers: ["PhantomJS"],
    basePath: ROOT,
    preprocessors: {
      "test/client/webpack/main.js": ["webpack"]
    },
    files: [
      { pattern: "test/client/fixtures/**/*.js", included: false },

      "test/client/webpack/main.js"
    ],
    port: 9999,
    singleRun: true,
    client: {
      captureConsole: true,
      mocha: {
        ui: "bdd"
      }
    },
    webpack: {
      cache: true,
      context: path.join(ROOT, "test/client/webpack"),
      entry: "./main",
      output: {
        filename: "main.js",
        publicPath: "/assets/"
      },
      resolve: {
        alias: {
          // Allow root import of `lib/FOO` from ROOT/lib.
          lib: path.join(ROOT, "lib")
        }
      },
      devtool: "source-map"
    },
    webpackServer: {
      port: 3002, // Choose a non-conflicting port (3001 static serve)
      quiet: true,
      noInfo: true
    }
  });
};
