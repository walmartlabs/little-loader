var load = require("lib/little-loader");

describe("webpack:advanced", function () {

  beforeEach(function () {
    window._LLOAD_TEST = {};
  });

  it("loads nested scripts", function (done) {
    load("/base/test/client/fixtures/advanced/one.js", function () {
      expect(window._LLOAD_TEST.one).to.equal("one");

      load("/base/test/client/fixtures/advanced/two.js", function () {
        expect(window._LLOAD_TEST.two).to.equal("two");

        load("/base/test/client/fixtures/advanced/three.js", function () {
          expect(window._LLOAD_TEST.three).to.equal("three");

          load("/base/test/client/fixtures/advanced/four.js", function () {
            expect(window._LLOAD_TEST.four).to.equal("four");
            done();
          });
        });
      });
    });
  });

});
