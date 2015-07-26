var ipc = require('ipc');

module.exports = function ($scope) {
  ipc.on('client-error', function (error) {
    $scope.message($scope.active.name, 'error', error);
    console.log(error);
  });

  ipc.on('client-motd', function (motd) {
    $scope.announce(motd);
  });

  ipc.on('client-message', function (nick, to, text, message) {
    $scope.message(to, nick, text);
  });

  ipc.on('client-selfMessage', function (to, text) {
    // this is to handle client messages, but I'm not going to actually
    // handle this event because it's badly done.
  });

  ipc.on('client-names', function (names) {

  });

  ipc.on('client-topic', function(channel, topic, nick, message) {

  });

  ipc.on('client-kill', function (nick, reason, channels, message) {
    // $scope.announce();
  });

  ipc.on('client-pm', function (nick, text, message) {
    //check if the person is already messaing the pm'er
    if(!$scope.channels[nick])
      $scope.joinChannel(nick);
    $scope.message(nick, nick, text);
    //the message variable isn't relevant right now
  });

  ipc.on('client-kick', function (channel, nick, by, reason, message) {
    // $scope.announce('You were kicked.. :(');
  });

  ipc.on('client-notice', function(nick, to, text, message) {
    $scope.message(nick, to, text);
  });

  ipc.on('client-action', function(from, to, text, message) {
    $scope.action(to, from, text);
  });

  // var clientCommandHandler = require('../js/controllers/chat-command-handler.js');
  // ipc.on('client-raw', function(message) {
  //   console.log("command: " + message.command);
  //   console.log("args: " + message.args);
  //   try {
  //     clientCommandHandler[message.command]($scope, message);
  //   } catch(err) {
  //     $scope.message($scope.current.name, 'error', message.command + ' needs taking care of');
  //   }
  // });

  ipc.on('client-', function() {

  });
};
