var load = require("lib/little-loader");

describe("webpack:error", function () {

  it("errs on 404", function (done) {
    load("DOESNT_EXIST.js", function (err) {
      expect(err).to.be.ok;
      expect(err.message || err.toString()).to.contain("DOESNT_EXIST.js");
      done();
    });
  });

  it("errs on undefined url", function (done) {
    load(undefined, function (err) {
      expect(err).to.be.ok;
      expect(err.message || err.toString()).to.contain("EMPTY");
      done();
    });
  });

});
