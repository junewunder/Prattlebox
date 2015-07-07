chat.directive('prattleMessage', function() {
  return {
    restrict: 'E',
    scope: {
      nick: '=', // String
      self: '=', // Bool
      type: '=', // String
      text: '='  // String
    },
    // __dirname is ./app/render/pages/
    templateUrl: `file://${__dirname}/../templates/chat/message.html`
  };
});
