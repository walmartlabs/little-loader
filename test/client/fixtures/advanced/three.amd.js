(function () {
  var test = window._LLOAD_TEST = window._LLOAD_TEST || {};
  test.three = "three";
  test.getFour = function (callback) {
    require(["lib/little-loader"], function (load) {
      load("/base/test/client/fixtures/advanced/four.js", callback);
    });
  };
}());
