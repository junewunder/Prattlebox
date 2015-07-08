chat.directive('prattleChannel', function() {
  return {
    restrict: 'E',
    scope: {
      name:   '=', // String
      active: '=', // Bool
      names:  '='  // Array
    },
    // __dirname is ./app/render/pages/
    templateUrl: `file://${__dirname}/../templates/chat/channel.html`
  };
});
