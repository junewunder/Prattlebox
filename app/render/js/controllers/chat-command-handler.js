module.exports = {

  ADMIN: function($scope, message) {

  },
  AWAY: function($scope, message) {

  },
  CNOTICE: function($scope, message) {

  },
  CPRIVMSG: function($scope, message) {

  },
  CONNECT: function($scope, message) {

  },
  DIE: function($scope, message) {

  },
  ENCAP: function($scope, message) {

  },
  ERROR: function($scope, message) {

  },
  HELP: function($scope, message) {

  },
  INFO: function($scope, message) {

  },
  INVITE: function($scope, message) {

  },
  ISON: function($scope, message) {

  },
  JOIN: function($scope, message) {

  },
  KICK: function($scope, message) {

  },
  KILL: function($scope, message) {

  },
  KNOCK: function($scope, message) {

  },
  LINKS: function($scope, message) {

  },
  LIST: function($scope, message) {

  },
  LUSERS: function($scope, message) {

  },
  MODE: function($scope, message) {

  },
  MOTD: function($scope, message) {

  },
  NAMES: function($scope, message) {

  },
  NAMESX: function($scope, message) {

  },
  NICK: function($scope, message) {

  },
  NOTICE: function($scope, message) {

  },
  OPER: function($scope, message) {

  },
  PART: function($scope, message) {

  },
  PASS: function($scope, message) {

  },
  PING: function($scope, message) {

  },
  PONG: function($scope, message) {

  },
  PRIVMSG: function($scope, message) {

  },
  QUIT: function($scope, message) {

  },
  REHASH: function($scope, message) {

  },
  RESTART: function($scope, message) {

  },
  RULES: function($scope, message) {

  },
  SERVER: function($scope, message) {

  },
  SERVICE: function($scope, message) {

  },
  SERVLIST: function($scope, message) {

  },
  SQUERY: function($scope, message) {

  },
  SQUIT: function($scope, message) {

  },
  SETNAME: function($scope, message) {

  },
  SILENCE: function($scope, message) {

  },
  STATS: function($scope, message) {

  },
  SUMMON: function($scope, message) {

  },
  TIME: function($scope, message) {

  },
  TOPIC: function($scope, message) {

  },
  TRACE: function($scope, message) {

  },
  UHNAMES: function($scope, message) {

  },
  USER: function($scope, message) {

  },
  USERHOST: function($scope, message) {

  },
  USERIP: function($scope, message) {

  },
  USERS: function($scope, message) {

  },
  VERSION: function($scope, message) {

  },
  WALLOPS: function($scope, message) {

  },
  WATCH: function($scope, message) {

  },
  WHO: function($scope, message) {

  },
  WHOIS: function($scope, message) {

  },
  WHOWAS: function($scope, message) {

  },

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
