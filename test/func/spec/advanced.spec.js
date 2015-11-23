"use strict";

var base = require("./base.spec");

describe("advanced", function () {
  it("loads advanced scenario", function (done) {
    var url = base.appUrl + "test/func/fixtures/advanced.html";

    base.adapter.client
      .url(url)

      // Check errors
      .getText(".e2e-error").then(function (text) {
        expect(text).to.not.be.ok;
      })

      // Verify load
      .getText(".e2e-script-first").then(function (text) {
        expect(text).to.equal("First Script");
      })
      .getText(".e2e-after-load-first").then(function (text) {
        expect(text).to.equal("After Load First");
      })
      .getText(".e2e-script-second").then(function (text) {
        expect(text).to.equal("Second Script");
      })
      .getText(".e2e-after-load-second").then(function (text) {
        expect(text).to.equal("After Load Second");
      })
      .getText(".e2e-script-third").then(function (text) {
        expect(text).to.equal("Third Script");
      })
      .getText(".e2e-after-load-third").then(function (text) {
        expect(text).to.equal("After Load Third");
      })
      .getText(".e2e-script-fourth").then(function (text) {
        expect(text).to.equal("Fourth Script");
      })
      .getText(".e2e-after-load-fourth").then(function (text) {
        expect(text).to.equal("After Load Fourth");
      })

      .finally(base.promiseDone(done));
  });
});
