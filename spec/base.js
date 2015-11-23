var app = require("../server");

// Magellan passes in a FUNC_PORT option for projects based on rowdy-mocha.
// This allows for individual distinct mocking servers to be set up in parallel,
// each with its own state. If you don't need to have individual mocking servers
// or have started a mock (or a real server) elsewhere, the FUNC_PORT option
// passed in by Magellan can be safely ignored by your suite.
var PORT = process.env.FUNC_PORT || 3003;
var HOST = process.env.TEST_HOST || "http://127.0.0.1:" + PORT;

var server;

var wdio = require("webdriverio");

// Rowdy helpers and adapter.
var config = require("../rowdy-config.js");
var rowdy = require("rowdy")(config);
var MochaAdapter = rowdy.adapters.mocha;

var adapter = new MochaAdapter();

// --------------------------------------------------------------------------
// Selenium (webdriverio/Rowdy) initialization
// --------------------------------------------------------------------------
// We use webdriverio to get a client to Selenium, and Rowdy to help configure
// our client, start a local selenium server if specified and provide a Mocha
// adapter.

adapter.before();
adapter.beforeEach();
adapter.afterEach();
adapter.after();

before(function (done) {
  // The `adapter.before();` call has the side effect of instantiating a
  // Selenium / WD.js client that we can extract here.
  var client = adapter.client;

  // Set a global Selenium timeout that is _before_ our test timeout.
  client
    .timeouts("implicit", 200)
    .call(done);
});

// --------------------------------------------------------------------------
// Dev. Server
// --------------------------------------------------------------------------
// Start up (and later stop) a single instance of the server so that we can
// interact with the web application via our tests.
//
// An alternative to this approach is to hit a live running staging or
// production server for "smoke" tests.
//
// For multi-file tests this setup should be extracted to a `base.spec.js`
// file and executed **once** for the entire test suite.
before(function (done) {
  // Start the dev. server.
  app.serveRoot();
  server = app.listen(PORT, done);
});

after(function (done) {
  if (!server) { return done(); }
  server.close(done);
});

module.exports = {
  adapter: adapter,
  host: HOST
}
