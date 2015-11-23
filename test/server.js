"use strict";
/**
 * Express web server.
 */
var express = require("express");
var app = module.exports = express();
var PORT = process.env.PORT || 3000;
var _serveRoot = false;

// Custom method: Add public root.
app.serveRoot = function () {
  if (!_serveRoot) {
    // Server static HTML page.
    app.use("/", express.static("test/public"));
    app.use("/lib", express.static("lib"));
    _serveRoot = true;
  }
  return app;
};

// Actually start server if script.
/* istanbul ignore next */
if (require.main === module) {
  // Serve root.
  app.serveRoot();

  // Start application.
  app.listen(PORT);
}
