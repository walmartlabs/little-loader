define(["lib/little-loader"], function (load) {
  describe("requirejs:advanced", function () {

    beforeEach(function () {
      window._LLOAD_TEST = {};
    });

    it("loads nested scripts", function (done) {
      load("/base/test/client/fixtures/advanced/one.js", function (err1) {
        expect(err1).to.not.be.ok;
        expect(window._LLOAD_TEST.one).to.equal("one");

        load("/base/test/client/fixtures/advanced/two.js", function (err2) {
          expect(err2).to.not.be.ok;
          expect(window._LLOAD_TEST.two).to.equal("two");

          load("/base/test/client/fixtures/advanced/three.js", function (err3) {
            expect(err3).to.not.be.ok;
            expect(window._LLOAD_TEST.three).to.equal("three");

            load("/base/test/client/fixtures/advanced/four.js", function (err4) {
              expect(err4).to.not.be.ok;
              expect(window._LLOAD_TEST.four).to.equal("four");
              done();
            });
          });
        });
      });
    });

    it("loads requirejs callback to load", function (done) {
      load("/base/test/client/fixtures/advanced/one.js", function (err1) {
        expect(err1).to.not.be.ok;
        expect(window._LLOAD_TEST.one).to.equal("one");

        load("/base/test/client/fixtures/advanced/two.js", function (err2) {
          expect(err2).to.not.be.ok;
          expect(window._LLOAD_TEST.two).to.equal("two");

          load("/base/test/client/fixtures/advanced/three.amd.js", function (err3) {
            expect(err3).to.not.be.ok;
            expect(window._LLOAD_TEST.three).to.equal("three");

            window._LLOAD_TEST.getFour(function () {
              expect(window._LLOAD_TEST.four).to.equal("four");
              done();
            });
          });
        });
      });
    });
  });
});
