angular
  .module('chat.filters', [])
  .filter('sanitize', ['$sce', sanitize]);

function sanitize($sce) {
  return function(text){

    var html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // var html = text;

    html.replace('\n', '<br/>');

    // from: http://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript @Gautam Sharma
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    html = html.replace(urlRegex, function(url) {
      if ((url.indexOf(".jpg") > 0 ) || (url.indexOf(".png") > 0 ) || (url.indexOf(".gif") > 0 )) {
        return '<code>' + url + '</code><br/> <img src="' + url + '">' + '<br/>';
      } else {
        return '<a onclick="prattle.openLink(\'' + url + '\'); return true;">' + url + '</a>';
      }
    });

    // htmlCode += ' | was piped into the sanitize filter';

    return $sce.trustAsHtml(html);
  };
}
