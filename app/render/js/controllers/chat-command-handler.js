module.exports = {
  JOIN: function ($scope, message) {
    var userJoined = message.nick;
    var channelName = message.args[0];

    $scope.channels[channelName].nicks += userJoined;
    $scope.announce(channelName, userJoined, ' has joined the channel');
  },
  PART: function ($scope, message) {
    var userLeft = message.nick;
    var channelName = message.args[0];
    var nicks = $scope.channels[channelName].nicks;

    $scope.announce(channelName, userLeft, ' has left the channel');
  },
  QUIT: function ($scope, message){
    var userLeft = message.nick;
    var channelName = message.args[0];

    $scope.announce(channelName, userLeft, ' has left the channel (quitting)');
  },
  NOTICE: function ($scope, message){
    var channelName = message.args[0];
    var noticeText = message.args[1];

    $scope.announce(channelName, channelName, noticeText);
  },
  TOPIC: function ($scope, message) {
    var channelName = message.args[0];
    var topic = message.args[1];
    var nick = message.nick;

    $scope.announce(channelName, nick, ' has set the topic to: "' + topic + '"');
    $scope.channels[channelName].topic = topic;
    $scope.$apply();
  },
  rpl_topic: function ($scope, message) {
    var channelName = message.args[1];
    var topic = message.args[2];

    $scope.channels[channelName].topic = topic;
    try {
      $scope.$apply();
    } catch (e) {  }
  },
  rpl_namreply: function ($scope, message) {
    var channelName = message.args[2];
    var nickList = message.args[3].split(' ');

    $scope.channels[channelName].nicks = nickList;
  }
};
