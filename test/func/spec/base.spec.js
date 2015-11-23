"use strict";
/**
 * Base setup, specs.
 *
 * This file _must_ be run in any spec file and thus must be manually
 * `require()`-ed in.
 */
// --------------------------------------------------------------------------
// Selenium (webdriverio/Rowdy) initialization
// --------------------------------------------------------------------------
// We use webdriverio to get a client to Selenium, and Rowdy to help configure
// our client, start a local selenium server if specified and provide a Mocha
// adapter.
// Enable Rowdy with webdriverio.
var rowdy = require("rowdy");
var config = require("rowdy/config");
var promiseDone = rowdy.helpers.webdriverio.promiseDone;

// Patch and re-configure.
config.options.driverLib = "webdriverio";
rowdy(config);

// Mocha adapter.
var Adapter = rowdy.adapters.mocha;
var adapter = new Adapter();

adapter.before();
adapter.beforeEach();
adapter.afterEach();
adapter.after();

before(function (done) {
  // The `adapter.before();` call has the side effect of instantiating a
  // Selenium / webdriver client that we can extract here.
  // Set a global Selenium timeout that is _before_ our test timeout.
  adapter.client
    .timeouts("implicit", 200)
    .finally(promiseDone(done));
});

// --------------------------------------------------------------------------
// Dev. Server
// --------------------------------------------------------------------------
// Magellan passes in a FUNC_PORT option for projects based on rowdy-mocha.
// This allows for individual distinct mocking servers to be set up in parallel,
// each with its own state. If you don't need to have individual mocking servers
// or have started a mock (or a real server) elsewhere, the FUNC_PORT option
// passed in by Magellan can be safely ignored by your suite.
var APP_PORT = process.env.FUNC_PORT || process.env.TEST_FUNC_PORT || 3030;
var APP_HOST = process.env.TEST_FUNC_HOST || "127.0.0.1";
var APP_URL = "http://" + APP_HOST + ":" + APP_PORT + "/";

// Start up (and later stop) a single instance of the server so that we can
// interact with the web application via our tests.
//
// An alternative to this approach is to hit a live running staging or
// production server for "smoke" tests.
//
// For multi-file tests this setup should be extracted to a `base.spec.js`
// file and executed **once** for the entire test suite.
var httpServer = require("http-server");
var enableDestroy = require("server-destroy");
var server;
var realServer;

// ----------------------------------------------------------------------------
// App server
// ----------------------------------------------------------------------------
before(function (done) {
  server = httpServer.createServer();
  server.listen(APP_PORT, APP_HOST, done);

  // `http-server` doesn't pass enough of the underlying server, so we capture it.
  realServer = server.server;

  // Wrap the server with a "REALLY REALLY KILL IT!" `destroy` method.
  enableDestroy(realServer);
});

after(function (done) {
  if (!realServer) { return done(); }

  // Take that server!
  realServer.destroy(done);
});

module.exports = {
  adapter: adapter,
  appUrl: APP_URL,
  promiseDone: promiseDone
};
