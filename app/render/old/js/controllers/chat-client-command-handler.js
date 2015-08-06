module.exports = {

  /*
    PARSING COMMAND ARGUMENTS WITH REGEX
    example: `var args = text.match(/^\/msg\s+([\w\-]+)\s+(.*)$/);`
    breakdown:
    1. `^\/msg\s+` replace `msg` with the command name
    2. `([\w\-]+)` will capture any arguments
    3. `\s+(.*)$` will capture with rest of the text
  */

  'me': {
    match: /^\/me\b.*/,
    func: function($scope, client, text) {
      var finalMsg = text.slice(4, text.length);

      client.action($scope.active.name, finalMsg);
      $scope.action($scope.active.name, client.nick, finalMsg);
    }
  },
  'help': {
    match: /^\/help\b.*/,
    func: function($scope, client, text) {
      $scope.announce($scope.active.name, 'help', ' error... no help 4 u kek 😎');
    }
  },
  'join': {
    match: /^\/join\b.*/,
    func: function($scope, client, text) {
      var args = text.match(/^\/join\s+([\w\-#@]+)\s*.*$/);
      var channelName = args[1];

      $scope.joinChannel(channelName);
    }
  },
  'leave': {
    match: /^\/leave\b.*/,
    func: function($scope, client, text) {
      var args = text.match(/^\/leave\s+([\w\-#@]+)\s*.*$/);
      var channelName = args[1];

      $scope.leaveChannel(channelName);
    }
  },
  'msg': {
    match: /^\/msg\b.*/,
    func: function($scope, client, text) {
      var args = text.match(/^\/msg\s+([\w\-]+)\s+(.*)$/);
      var nick = args[1];
      var string = args[2];

      client.say(nick, string);
      $scope.joinChannel(nick);
      $scope.message(nick, client.nick, string);
    }
  },
  'topic': {
    match: /^\/topic\b.*/,
    func: function($scope, client, text) {
      var args = text.match(/^\/topic\s+(.*)$/);
      var topic = args[1];

      client.send('TOPIC', $scope.active.name, topic);
    }
  },
  'part': {
    match: /^\/part\b.*/,
    func: function($scope, client, text) {
      var args = text.match(/^\/leave\s+([\w\-#@]+)\s*.*$/);
      var channelName = args[1];

      $scope.leaveChannel(channelName);
    }
  },
  'ping': {
    match: /^\/ping\b.*/,
    func: function($scope, client, text) {
      $scope.announce($scope.active.name, 'ping', ' 1.337ms 🚀 SOOPER FAST!');
    }
  },
  'ignore': {
    match: /^\/ignore\b.*/,
    func: function($scope, client, text) {
      $scope.announce($scope.active.name, 'ignore', ' why would you want to do that???? 😱');
    }
  },
  'whois': {
    match: /^\/whois\b.*/,
    func: function($scope, client, text) {
      var args = text.match(/^\/leave\s+([\w\-#@]+)\s*.*$/);
    }
  },
  '': {
    match: / /,
    func: function($scope, client, text) {

    }
  },
};
