(function () {
  var content = document.querySelector(".e2e-content");
  content.innerHTML += "<div class='e2e-script-second'>Second Script</div>";

  window._lload("advanced/fourth.js", {
    callback: function () {
      content.innerHTML += "<div class='e2e-after-load-fourth'>After Load Fourth</div>";
    },
    setup: function () {
      content.innerHTML += "<div class='e2e-after-setup-fourth'>After Setup Fourth</div>";
    }
  });
}());
