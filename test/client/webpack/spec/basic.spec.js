var load = require("lib/little-loader");

describe("webpack:basic", function () {

  it("load is a function", function () {
    expect(load).to.be.a("function");
  });

  it("loads basic", function (done) {
    load("/base/test/client/fixtures/basic/basic.js", function (err) {
      expect(err).to.not.be.ok;
      expect(window._LLOAD_TEST).to.be.ok;
      expect(window._LLOAD_TEST.basic).to.equal("basic");
      done();
    });
  });

  it("uses context", function (done) {
    var obj = { greeting: "hi" };

    load("/base/test/client/fixtures/basic/basic.js", function (err) {
      expect(err).to.not.be.ok;
      expect(this.greeting).to.equal("hi");
      done();
    }, obj);
  });

});
