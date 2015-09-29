angular
  .module('chat.filters', [])
  .filter('sanitize', ['$sce', sanitize]);

function sanitize($sce) {
  return function(htmlCode){

    htmlCode += ' | was piped into the sanitize filter';

    return $sce.trustAsHtml(htmlCode);
  };
}
