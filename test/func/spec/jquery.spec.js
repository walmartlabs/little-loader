"use strict";

var base = require("./base.spec");

describe("error", function () {
  it("handles multiple jqueries", function (done) {
    var url = base.appUrl + "test/func/fixtures/jquery.html";

    base.adapter.client
      .url(url)

      // Check errors
      .getText(".e2e-error").then(function (text) {
        expect(text).to.not.be.ok;
      })

      // Verify error and result callbacks
      .getText(".e2e-google-1-11-3-1-error").then(function (text) {
        expect(text).to.equal("");
      })
      .getText(".e2e-google-1-11-3-1-result").then(function (text) {
        expect(text).to.equal("PASS");
      })

      .getText(".e2e-jquery-1-11-3-1-error").then(function (text) {
        expect(text).to.equal("");
      })
      .getText(".e2e-jquery-1-11-3-1-result").then(function (text) {
        expect(text).to.equal("PASS");
      })

      .getText(".e2e-google-1-11-2-1-error").then(function (text) {
        expect(text).to.equal("");
      })
      .getText(".e2e-google-1-11-2-1-result").then(function (text) {
        expect(text).to.equal("PASS");
      })

      .getText(".e2e-jquery-1-11-2-1-error").then(function (text) {
        expect(text).to.equal("");
      })
      .getText(".e2e-jquery-1-11-2-1-result").then(function (text) {
        expect(text).to.equal("PASS");
      })

      .getText(".e2e-google-1-7-2-1-error").then(function (text) {
        expect(text).to.equal("");
      })
      .getText(".e2e-google-1-7-2-1-result").then(function (text) {
        expect(text).to.equal("PASS");
      })

      .getText(".e2e-google-1-11-1-1-error").then(function (text) {
        expect(text).to.equal("");
      })
      .getText(".e2e-google-1-11-1-1-result").then(function (text) {
        expect(text).to.equal("PASS");
      })

      .getText(".e2e-jquery-1-11-1-1-error").then(function (text) {
        expect(text).to.equal("");
      })
      .getText(".e2e-jquery-1-11-1-1-result").then(function (text) {
        expect(text).to.equal("PASS");
      })

      .getText(".e2e-jquery-1-7-2-1-error").then(function (text) {
        expect(text).to.equal("");
      })
      .getText(".e2e-jquery-1-7-2-1-result").then(function (text) {
        expect(text).to.equal("PASS");
      })

      .getText(".e2e-google-1-11-3-2-error").then(function (text) {
        expect(text).to.equal("");
      })
      .getText(".e2e-google-1-11-3-2-result").then(function (text) {
        expect(text).to.equal("PASS");
      })

      .getText(".e2e-jquery-1-11-3-2-error").then(function (text) {
        expect(text).to.equal("");
      })
      .getText(".e2e-jquery-1-11-3-2-result").then(function (text) {
        expect(text).to.equal("PASS");
      })


      .finally(base.promiseDone(done));
  });
});
