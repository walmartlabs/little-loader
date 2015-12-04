(function () {
  // These are "live" tests meaning you need an internet connection.
  var load = window._lload;
  var content = document.querySelector(".e2e-content");

  // DOM writing helper
  var output = function (name, err, result) {
    content.innerHTML +=
      "<div class='e2e-" + name + "-error'>" +
        (err ? err.message || err.toString() : "") +
      "</div>" +

      "<div class='e2e-" + name + "-result'>" +
        (result || "") +
      "</div>";
  };

  // Append status information of jQuery noConflict state to DOM content.
  var check = function (host, version, extra) {
    var name = [host, version.replace(/\./g, "-"), extra].join("-");
    var url = host === "google" ?
      "http://ajax.googleapis.com/ajax/libs/jquery/" + version + "/jquery.min.js" :
      "http://code.jquery.com/jquery-" + version + ".min.js";

    load(url, function (err) {
      var results = "";

      if (typeof window.jQuery !== "function") {
        results += "FAIL: jquery function, ";
      }

      // Remove the global.
      var jQuery = window.jQuery.noConflict(true);

      if (typeof jQuery._MARKED !== "undefined") {
        results += "FAIL: jquery marked, ";
      }

      if (jQuery.fn.jquery !== version) {
        results += "FAIL: jquery version ( " +
          jQuery.fn.jquery + " vs. " + version + "), ";
      }

      // Mark the instance with a flag.
      jQuery._MARKED = true;

      // Pass
      if (!results) {
        results = "PASS";
      }

      output(name, err, results);
    });
  };

  // Run a whole bunch of loads.
  check("google", "1.11.3", "1");
  check("jquery", "1.11.3", "1");

  check("google", "1.11.2", "1");
  check("jquery", "1.11.2", "1");

  check("jquery", "1.7.2", "1");

  check("google", "1.11.1", "1");
  check("jquery", "1.11.1", "1");

  check("google", "1.7.2", "1");

  check("google", "1.11.3", "2");
  check("jquery", "1.11.3", "2");
}());
