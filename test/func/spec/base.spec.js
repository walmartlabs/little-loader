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
APP_PORT = parseInt(APP_PORT, 10);
var APP_HOST = process.env.TEST_FUNC_HOST || "127.0.0.1";
var APP_URL = "http://" + APP_HOST + ":" + APP_PORT + "/";

// Magellan guarantees FUNC_PORT + a mocking port at +2.
// https://github.com/walmartlabs/little-loader/issues/6#issuecomment-159065329
var APP_PORT_OTHER = APP_PORT + 2;
var APP_URL_OTHER = "http://" + APP_HOST + ":" + APP_PORT_OTHER + "/";

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

// To test multiple origins, we spawn two servers.
var realServer1;
var realServer2;

// ----------------------------------------------------------------------------
// Code Coverage
// ----------------------------------------------------------------------------
var path = require("path");
var fs = require("fs");
var uuid = require("node-uuid");
var istanbul = require("istanbul");
var collector = new istanbul.Collector();

var PROJECT_ROOT = path.resolve(__dirname, "../../..");
var middleware = [];

// Instrument library for middleware insertion.
var _covered = function (filePath) {
  var fileName = path.relative(PROJECT_ROOT, filePath);
  var code = fs.readFileSync(filePath);
  var instrumenter = new istanbul.Instrumenter();
  return instrumenter.instrumentSync(code.toString(), fileName);
};

if (global.USE_COVERAGE) {
  // Custom Instrumentation middleware.
  middleware.push(function (req, res) {
    if (/lib\/little-loader\.js/.test(req.url)) {
      var covered = _covered(path.resolve(PROJECT_ROOT, "lib/little-loader.js"));

      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(covered);
      return;
    }

    res.emit("next");
  });

  afterEach(function (done) {
    adapter.client
      // Coverage.
      .execute(function () {
        // Client / browser code.
        /*globals window:false */
        return JSON.stringify(window.__coverage__);
      }).then(function (ret) {
        // Gather data into collector.
        // Note: `JSON.parse` exception will get caught in `.finally()`
        var covObj = JSON.parse(ret.value);
        collector.add(covObj);
      })

      .finally(promiseDone(done));
  });

  after(function (done) {
    // Load configuration.
    // **Note**: We're tying to a known istanbul configuration file that in the
    //           general should come from a shell flag.
    var cfg = istanbul.config.loadFile(".istanbul.func.yml");

    // TODO: rimraf `coverage/func`

    // Patch reporter to output our GUID-driven incremental coverage files.
    cfg.reporting.reportConfig = function () {
      return {
        json: {
          file: "coverage-" + uuid.v4() + ".json"
        }
      };
    };

    var reporter = new istanbul.Reporter(cfg);

    // Manually add desired output reports.
    var reports = cfg.reporting.config.reports;
    reporter.add("json");

    // Write out results.
    reporter.write(collector, false, done);
  });
}

// ----------------------------------------------------------------------------
// App server
// ----------------------------------------------------------------------------
// Primary server
before(function (done) {
  var server1 = httpServer.createServer({
    before: middleware
  });
  server1.listen(APP_PORT, APP_HOST, done);

  // `http-server` doesn't pass enough of the underlying server, so we capture it.
  realServer1 = server1.server;

  // Wrap the server with a "REALLY REALLY KILL IT!" `destroy` method.
  enableDestroy(realServer1);
});

after(function (done) {
  if (!realServer1) { return done(); }

  // Take that server!
  realServer1.destroy(done);
});

// Other server
before(function (done) {
  var server2 = httpServer.createServer();
  server2.listen(APP_PORT_OTHER, APP_HOST, done);
  realServer2 = server2.server;
  enableDestroy(realServer2);
});

after(function (done) {
  if (!realServer2) { return done(); }
  realServer2.destroy(done);
});

module.exports = {
  adapter: adapter,
  appUrl: APP_URL,
  appUrlOther: APP_URL_OTHER,
  promiseDone: promiseDone
};
