"use strict";

var base = require("./base.spec");

describe("error", function () {
  it("capture script 404 error", function (done) {
    var url = base.appUrl + "test/func/fixtures/error.html";

    base.adapter.client
      .url(url)

      // Check errors
      .getText(".e2e-error").then(function (text) {
        expect(text).to.not.be.ok;
      })

      // Verify error callback
      .getText(".e2e-after-load").then(function (text) {
        expect(text).to.equal("DOESNT_EXIST.js");
      })

      .finally(base.promiseDone(done));
  });
});
