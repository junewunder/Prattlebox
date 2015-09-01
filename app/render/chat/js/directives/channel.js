chat.directive('prattleChannel', function() {
  return {
    restrict: 'E',
    scope: {
      channel:      '=', // Object reference to the channel
      toggleNicks:  '&toggleNicks',  // Function
      leaveChannel: '&leaveChannel', // Function
      makeActive:   '&makeActive',   // Function
    },
    template: `
      <li class="channel channel-active-{{channel.active}}">
        <span class="channel-arrow" ng-click="toggleNicks(channel.name)">
          <i ng-show="!channel.showNicks" class="fa fa-chevron-right"></i>
          <i ng-show="channel.showNicks" class="fa fa-chevron-down"></i>
        </span>
        <span class="channel-name" ng-click="makeActive(channel.name)">{{channel.name}}</span>
        <span class="channel-unread" ng-show="channel.unread > 0">{{channel.unread}}</span>
        <span class="channel-close" ng-click="leaveChannel(channel.name)"><i class="fa fa-times"></i></span>
        <ul class="channel-nick-list" ng-show="channel.showNicks == true">
          <li ng-repeat="nick in channel.nicks">
            <i class="fa fa-user"></i> {{nick}}
          </li>
        </ul>
      </li>
    `
  };
});
