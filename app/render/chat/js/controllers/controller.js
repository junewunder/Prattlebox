chat.controller('ChatController', function ($scope) {
  'use strict';
  var $ = require('../../static/lib/jquery.min.js');
  var ipc = require('ipc');
  var remote = require('remote');
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;
  var chat = $scope;

  $scope.client = client; // reference to client
  $scope.channels = {};   // { name : { channel-vars } }
  $scope.active = {};     // pointer to the active channel
  $scope.notificationSounds = false;

  ///////////////////
  // SCOPE METHODS //
  ///////////////////

  require('./js/controllers/scope-methods.js')($scope, client);

  $scope.joinChannel('#jaywunder');
  // $scope.joinChannel('#jaywunder2');

  for(var channelName in client.channels)
    if (!$scope.channels[channelName])
      $scope.joinChannel(channelName);

  // pop-ups
  ipc.on('channel-join', function(args) {
    $scope.joinChannel(args.channelName);
    $scope.$apply();
  });

  // handle all the commands
  var channelCommandHandler = require('./js/controllers/channel-command-handler.js');

  // PRIVMSG is hard, so let's not do it right now
  ipc.on('client-message', function (nick, to, text, message) {
    $scope.message(to, nick, text);
  });

  ipc.on('client-pm', function (nick, text, message) {
    $scope.message(nick, nick, text);
  });

  ipc.on('client-action', function(from, to, text, message) {
    $scope.action(to, from, text);
  });

  ipc.on('client-raw', function(message) {
    // console.log('--');
    // console.log("command: " + message.command);
    // console.log("args: " + message.args);
    // console.log(message);
    try {
      channelCommandHandler[message.command]($scope, message);
      // console.log(channelCommandHandler[message.command]);
    } catch(err) {
      // $scope.message($scope.current.name, 'error', message.command + ' needs taking care of');
    }
  });
});
