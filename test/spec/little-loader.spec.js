var base = require("./base");

describe("little-loader", function () {
  var client;

  before(function () {
    client = base.adapter.client;
  });

  // --------------------------------------------------------------------------
  // Mocha
  // --------------------------------------------------------------------------
  // Set a Mocha global timeout of 10 seconds to allow for slow tests/tunnels
  this.timeout(250000);

  // --------------------------------------------------------------------------
  // Suites
  // --------------------------------------------------------------------------
  describe("_lload", function () {
    it("should be exposed on window", function (done) {
      client
        // Get the web application page.
        .url(base.host)
        // Check for our loader
        .then(function () {
          return this
            .execute("return typeof window._lload")
            .then(function (result) {
              expect(result.value).to.be("function");
            });
        })
        // ... and we're done!
        .call(done);
    });
  });

});
