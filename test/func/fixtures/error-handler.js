/**
 * Error handler for all tests.
 */
(function () {
  /*eslint-disable max-params*/
  window.onerror = function (msg, file, line, col, error) {
    var content = document.querySelector(".e2e-error");
    content.innerHTML += "<code>"
      + "msg: " + msg + "<br />\n"
      + "file: " + file + "<br />\n"
      + "line: " + line + "<br />\n"
      + "col: " + col + "<br />\n"
      + "error: " + error + "<br />\n"
      + "</code>";
  };
}());
