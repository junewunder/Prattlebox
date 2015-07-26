chat.controller('ChatController', function ($scope) {
  'use strict';
  var $ = require('../lib/jquery-1.11.3.min.js');
  var ipc = require('ipc');
  var remote = require('remote');
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;
  var chat = $scope;

  $scope.channels = {}; // { name : { channel-vars } }
  $scope.active = {}; // the name of the channel that is active

  $scope.foo = 'foo'; // test variable

  ///////////////////
  // SCOPE METHODS //
  ///////////////////

  // TODO: move all the buissness logic to the main process
  // all the important stuff shouldn't be done by the renderer

  $scope.joinChannel = function (name) {
    if (!$scope.channels[name]) { // check if the channel exists
      if(name[0] == '#')
        client.join(name);  // have the client join the channel
      $scope.channels[name] = { // add the channel to the $scope.channels object
        name: name,         // name of channel
        messages: [],       // the list of messages
        currentMessage: '', // change back to nothing later
        unread: 0,           // int value of unread messages
        nicks: [],           // String[] - the nicknames of the users
        previouslySent: [],  // String[] - the list of previously sent messages by the user
        topic: 'no topic has been set',           // String the topic for the room
        showNicks: false,    // Boolean - whether or not to show the user list
      };
      $scope.makeActive(name); // make the channel active
      $scope.$apply();
    }
  };

  $scope.leaveChannel = function (name) {
    // client leaves the channel
    client.part(name);
    // delete the channel from the channel object
    delete $scope.channels[name];
  };

  $scope.makeActive = function (name) {
    // assign "active" as a reference to the current channel
    $scope.active.active = false;
    $scope.active = $scope.channels[name];
    $scope.active.active = true;
    $scope.active.unread = 0;
  };

  $scope.submitMessage = function () {
    var currentChannel = $scope.active.name;
    if ($scope.active.currentMessage !== '') { // prevent sending empty strings
      if($scope.active.currentMessage[0] == '/') { // if the message starts with a '/' then it's a command
        console.log($scope.active.currentMessage);
        var msgLength = $scope.active.currentMessage.length;
        var totalmsg = $scope.active.currentMessage;
        var channelName;

        // if (totalmsg.slice(0, 3) == '/me') {
        if (totalmsg.match(/\/me\b.*/)) { // the /me command
          var finalMsg = $scope.active.currentMessage.slice(4, msgLength);
          client.action($scope.active.name, finalMsg);
          $scope.action($scope.active.name, client.nick, finalMsg);

        } else if (totalmsg.match(/\/join\b.*/)) { // the /join command
          channelName = totalmsg.slice(6, msgLength);
          $scope.joinChannel(channelName);

        } else if (totalmsg.match(/\/leave\b.*/)) { // the /leave command
          channelName = totalmsg.slice(7, msgLength);
          $scope.leaveChannel(channelName);

        } else if (totalmsg.match(/\/help\b.*/)) { // the /help command

        }

      } else {
        // send message to server
        client.say('' + $scope.active.name, '' + $scope.active.currentMessage);
        $scope.message($scope.active.name, client.nick, $scope.active.currentMessage);
      }
      $scope.channels[currentChannel].currentMessage = ''; // clear the current message
    }
  };

  $scope.message = function (name, nick, text) {
    // push a message to the active channel's messages array
    var isSelf = nick === client.nick;
    $scope.pushMessage(name, isSelf, 'message', nick, text);
    if (!isSelf) $scope.$apply();
  };

  $scope.action = function(name, nick, text) {
    // push an action to the active channel's messages array
    var isSelf = nick === client.nick;
    $scope.pushMessage(name, isSelf, 'action', nick, text);
    if (!isSelf) $scope.$apply();
  };

  $scope.announce = function (name, nick, text) {
    // push an announcement to the active channel's messages array
    var isSelf = nick === client.nick;
    $scope.pushMessage(name, isSelf, 'announcement', nick, text);
    if (!isSelf) $scope.$apply();
  };

  $scope.pushMessage = function(name, self, type, nick, text) {
    if(name !== $scope.active.name) $scope.channels[name].unread++;
    $scope.channels[name].messages.push({
      self: self,          // Bool - the css class the nick will be given: either 'self-true' or 'self-false'
      type: type,          // String - the css class the message will be given
      nick: nick,          // String - nickname of the sender
      text: text,          // String - text in the message
    });
  };

  $scope.toggleNicks = function(name) {
    // toggle the boolean
    $scope.channels[name].showNicks = !$scope.channels[name].showNicks;
  };

  $scope.testMessage = function () {
    // test the messages
    $scope.action($scope.active.name, 'chester', 'ayy lmao');
  };

  $scope.popUp = function () {
    ipc.send('pop-up', {
      filename: 'join' // will point to /render/pages/popup-{filename}.html
    });
  };

  // channels will be in alphabetical order
  $scope.joinChannel('#jaywunder');
  $scope.joinChannel('#jaywunder2');

  // pop-ups
  ipc.on('channel-join', function(args) {
    $scope.joinChannel(args.channelName);
  });

  // handle all the commands
  var clientCommandHandler = require('./chat-command-handler.js');
  ipc.on('client-raw', function(message) {
    console.log("command: " + message.command);
    console.log("args: " + message.args);
    try {
      clientCommandHandler[message.command]($scope, message);
    } catch(err) {
      $scope.message($scope.current.name, 'error', message.command + ' needs taking care of');
    }
  });

  // client events
  require('../js/controllers/chat-client-events.js')($scope);

});
