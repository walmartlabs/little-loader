/*global sinon: false */
var load = require("lib/little-loader");

describe("webpack:config", function () {

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
    var setup = sinon.spy();
    var context = {};

    var config = {
      callback: function (err) {
        expect(err).to.not.be.ok;
        expect(setup)
          .to.have.callCount(1).and
          .to.be.calledOn(context);

        done();
      },

      context: context,
      setup: setup
    };

    load("/base/test/client/fixtures/basic/basic.js", config);
  });

});
