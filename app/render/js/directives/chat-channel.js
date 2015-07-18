chat.directive('prattleChannel', function() {
  return {
    restrict: 'E',
    scope: {
      name:         '=', // String
      channel:      '=', // Object
      active:       '=', // Boolean
      unread:       '=', // Int
      nicks:        '=', // Array
      showNicks:    '=', // Boolean
      toggleNicks:  '&toggleNicks',  // Function
      leaveChannel: '&leaveChannel', // Function
      makeActive:   '&makeActive',   // Function
    },
    // __dirname is ./app/render/pages/
    templateUrl: `file://${__dirname}/../templates/chat/channel.html`
  };
});
