function $(id) {
  return document.getElementById(id);
}

function genPopupPass() {
  var res      = $('result');
  res.firstChild.nodeValue = 
    hex_md5('<' + $('domain').value + '>' + $('password').value).substr(0, 8);
  res.style.display = '';
  return false;
}

function setPopupDomain() {
  chrome.tabs.getSelected(null, function (tab) {
    var m = tab.url.match(
      /^https?:\/\/[^\/]*?([^.]+\.(?:co\.)?[^.\/:]+)(\/|:|$)/);
    if (!m) return;
    var domain = m[1].replace(/^www\./, '');
    $('domain').value = domain;
  });
  $('password').focus();
  $('result').style.display = 'none';
}
