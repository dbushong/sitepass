if (!window.loaded) {
  chrome.extension.onMessage.addListener(function (req, sndr, resp) {
    var fields = document.querySelectorAll('input[type=password]');
    if (fields.length == 1) {
      fields[0].value = req.password;
      resp();
    }
  });
  window.loaded = true;
}
