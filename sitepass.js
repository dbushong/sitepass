var first_time = true;

function $(id) {
  return document.getElementById(id);
}

function genPopupPass(e) {
  e.preventDefault();
  var res  = $('result')
    , pass = hex_md5('<' + $('domain').value + '>'
                     + $('password').value).substr(0, 8);

  res.firstChild.nodeValue = pass;
  res.style.display = '';

  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendMessage(tab.id, { password: pass }, function (resp) {
      window.close();
    });
  });
  return false;
}

function setPopupDomain() {
  chrome.tabs.getSelected(null, function (tab) {
    var m = tab.url.match(
      /^https?:\/\/[^\/]*?([^.]+\.(?:co\.)?[^.\/:]+)(\/|:|$)/);
    if (!m) return;
    var domain = m[1].replace(/^www\./, '');
    $('domain').value = domain;
    $('password').focus();
  });

  if (first_time) {
    chrome.tabs.executeScript(null, { file: 'contentscript.js' });
    $('pass-form').addEventListener('submit', genPopupPass);
    first_time = false;
  }

  $('result').style.display = 'none';
}

window.addEventListener('load', setPopupDomain);
