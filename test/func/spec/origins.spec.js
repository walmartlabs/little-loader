"use strict";
/**
 * Origins
 *
 * Reuses the `advanced` scripts to test 3/4 from altnerate origin (different port).
 */
var base = require("./base.spec");

describe("origins", function () {
  it("loads origins scenario", function () {
    var url = base.appUrl + "test/func/fixtures/origins.html";

    return base.adapter.client
      .url(url)

      // Inject dynamic JS (easiest way to get `appUrlOther` information).
      .execute(function (appUrlOther) {
        // CLIENT CODE: This is stringified, sent to browser and executed.
        /*global window:false, document:false*/
        var content = document.querySelector(".e2e-content");

        // Load second (which loads fourth) and third from other orign.
        window._lload(appUrlOther + "test/func/fixtures/advanced/second.js", function () {
          content.innerHTML += "<div class='e2e-after-load-second'>After Load Second</div>";
        });
        window._lload(appUrlOther + "test/func/fixtures/advanced/third.js", function () {
          content.innerHTML += "<div class='e2e-after-load-third'>After Load Third</div>";
        });
      }, base.appUrlOther)

      // Check errors
      .getText(".e2e-error").then(function (text) {
        expect(text).to.not.be.ok;
      })

      // Verify load from same origin.
      .getText(".e2e-script-first").then(function (text) {
        expect(text).to.equal("First Script");
      })
      .getText(".e2e-after-load-first").then(function (text) {
        expect(text).to.equal("After Load First");
      })

      // Verify load from different origin.
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
      .getText(".e2e-after-setup-fourth").then(function (text) {
        expect(text).to.equal("After Setup Fourth");
      });
  });
});
