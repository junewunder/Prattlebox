chat.directive('prattleChannel', function() {
  return {
    restrict: 'E',
    scope: {
      channel:      '=', // Object reference to the channel
      toggleNicks:  '&toggleNicks',  // Function
      leaveChannel: '&leaveChannel', // Function
      makeActive:   '&makeActive',   // Function
    },
    // __dirname is ./app/render/pages/
    templateUrl: `file://${__dirname}/../templates/chat/channel.html`
  };
});
