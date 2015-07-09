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

  $scope.joinChannel = function (name) {
    if (!$scope.channels[name]) { // check if the channel exists
      client.join(name); // have the client join the channel
      $scope.channels[name] = { // add the channel to the $scope.channels object
        name: name,         // name of channel
        messages: [],       // the list of messages
        currentMessage: '', // change back to nothing later
        unread: 0           // int value of unread messages
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
    if ($scope.active.currentMessage !== '') {// prevent sending empty strings
      client.say('' + $scope.active.name, '' + $scope.active.currentMessage); // send message to server
      $scope.active.currentMessage = ''; // clear the current message
    }
  };

  $scope.message = function (name, nick, text) {
    var isSelf = nick === client.nick;
    // push a message to the active channel's messages array
    $scope.channels[name].messages.push({
      self: isSelf,    // the css class the nick will be given: either 'self-true' or 'self-false'
      type: 'message', // the css class the message will be given
      nick: nick,      // nickname of the sender
      text: text       // text in the message
    });
    if(name !== $scope.active.name) $scope.channels[name].unread++;
    if (!isSelf) $scope.$apply();
  };

  $scope.announce = function (name, text) {
    // push a message to the active channel's messages array
    $scope.active.messages.push({
      self: false,        // annoucments don't have a nickname
      type: 'annoucment', // the class the message text will be given
      nick: '',           // annoncments aren't sent by anyone
      text: text          // include the text of the message
    });
    $scope.$apply();
  };

  $scope.testMessage = function () {
    // test the messages
    $scope.message($scope.active.name, 'chester', 'ayy lmao');
  };

  $scope.popUp = function () {
    ipc.send('pop-up', {
      filename: 'join' // will point to /render/pages/popup-{filename}.html
    });
  };

  // the order of channels isn't preserved yet, they'll be in alphabetical order
  $scope.joinChannel('#jaywunder');
  $scope.joinChannel('#jaywunder2');

  ////////////////////////
  // ANGULAR IPC EVENTS //
  ////////////////////////

  ipc.on('channel-join', function(args) {
    $scope.joinChannel(args.channelName);
  });

  ///////////////////
  // CLIENT EVENTS //
  ///////////////////

  // TODO: MOVE THE CLIENT EVENTS TO A SERVICE LATER
  ipc.on('client-error', function (error) {
    $scope.message($scope.active.name, 'error', error);
    console.log(error);
  });

  ipc.on('client-motd', function (motd) {
    $scope.announce(motd);
  });

  ipc.on('client-selfMessage', function (to, text) {
    $scope.message(to, client.nick, text);
  });

  ipc.on('client-message', function (nick, to, text, message) {
    $scope.message(to, nick, text);
  });

  ipc.on('client-names', function (names) {

  });

  ipc.on('client-kill', function (nick, reason, channels, message) {
    // $scope.announce();
  });

  ipc.on('client-pm', function (nick, text, message) {

  });

  ipc.on('client-kick', function () {
    // $scope.announce('You were kicked.. :(');
  });
});
