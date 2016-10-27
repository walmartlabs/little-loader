/*global sinon: false */

define(["lib/little-loader"], function (load) {
  describe("requirejs:config", function () {

    it("load is a function", function () {
      expect(load).to.be.a("function");
    });

    it("loads basic", function (done) {
      var config = {
        callback: function (err) {
          expect(err).to.not.be.ok;
          expect(window._LLOAD_TEST).to.be.ok;
          expect(window._LLOAD_TEST.basic).to.equal("basic");
          done();
        }
      };

      load("/base/test/client/fixtures/basic/basic.js", config);
    });

    it("uses context", function (done) {
      var config = {
        callback: function (err) {
          expect(err).to.not.be.ok;
          expect(this.greeting).to.equal("hi");
          done();
        },

        context: { greeting: "hi" }
      };

      load("/base/test/client/fixtures/basic/basic.js", config);
    });

    it("calls setup", function (done) {
      var callback = sinon.spy();
      var context = { };

      var config = {
        callback: function (err) {
          expect(err).to.not.be.ok;
          expect(callback.calledOnce);
          expect(callback.calledOn(context));
          done();
        },

        context: context,
        setup: callback
      };

      load("/base/test/client/fixtures/basic/basic.js", config);
    });

  });
});
