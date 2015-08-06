chat.directive('tab', function() {
  console.log(`${__dirname}/../templates/chat/tab.html`);
  return {
    restrict: 'E',
    scope: {

    },
    // __dirname is ./app/render/pages/
    templateUrl: `file://${__dirname}/../templates/chat/tab.html`
  };
});
