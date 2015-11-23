"use strict";

var base = require("./base.spec");

describe("basic", function () {
  it("loads basic script", function (done) {
    var url = base.appUrl + "test/func/fixtures/basic.html";

    base.adapter.client
      .url(url)

      // Check errors
      .getText("#error").then(function (text) {
        expect(text).to.not.be.ok;
      })

      // Verify load
      .getText("#content #basic-script").then(function (text) {
        expect(text).to.equal("Basic Script");
      })
      .getText("#content #after-load").then(function (text) {
        expect(text).to.equal("After Load");
      })

      .finally(base.promiseDone(done));
  });
});
