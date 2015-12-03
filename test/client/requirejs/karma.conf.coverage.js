"use strict";
/*
 * Karma Configuration: "coverage" version.
 *
 * This configuration is the same as basic one-shot version, just with coverage.
 */
var path = require("path");
var ROOT = path.join(__dirname, "../../..");

module.exports = function (config) {
  /* eslint-disable global-require */
  require("./karma.conf")(config);
  config.set({
    reporters: ["spec", "coverage"],
    preprocessors: {
      "lib/little-loader.js": ["coverage"]
    },
    coverageReporter: {
      reporters: [
        { type: "json", file: "coverage.json" },
        { type: "lcov" },
        { type: "text-summary" }
      ],
      dir: path.join(ROOT, "coverage/client/requirejs")
    }
  });
};
