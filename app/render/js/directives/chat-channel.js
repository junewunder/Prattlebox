chat.directive('prattleChannel', function() {
  return {
    restrict: 'E',
    scope: {
      name:         '=', // String
      channel:      '=', // Object
      active:       '=', // Bool
      unread:       '=', // Int
      names:        '=', // Array
      leaveChannel: '&leaveChannel', // Function
      makeActive:   '&makeActive', // Function
    },
    // __dirname is ./app/render/pages/
    templateUrl: `file://${__dirname}/../templates/chat/channel.html`
  };
});
