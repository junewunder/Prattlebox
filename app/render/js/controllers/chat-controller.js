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

  $scope.joinChannel = function (name) {
    if (!$scope.channels[name]) { // check if the channel exists
      client.join(name); // have the client join the channel
      $scope.channels[name] = { // add the channel to the $scope.channels object
        name: name,         // name of channel
        messages: [],       // the list of messages
        currentMessage: '', // change back to nothing later
        numUnread: 0        // int value of unread messages
      };
      $scope.makeActive(name); // make the channel active
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
    console.log(`making ${name} active`);
    $scope.active.active = false;
    $scope.active = $scope.channels[name];
    $scope.active.active = true;
  };

  $scope.popUp = function () {
    ipc.send('pop-up', {
      filename: 'join'
    }, function () {
      console.log('this is a callback');
    });
  };

  // $scope.joinChannel('jaywunder');
  $scope.joinChannel('#botwar'); // the order of channels isn't preserved yet, they'll be in alphabetical order
  $scope.joinChannel('#jaywunder');

  /*
   * For right now I'm going to store all the messaging methods in this scope.  I don't
   * like it this way, but the first version is a "good 'nuf" version. So this'll have to do.
   * Maybe it'll get fixed? 😅
   **/

  $scope.submitMessage = function () {
    if ($scope.active.currentMessage !== '') {// prevent sending empty strings
      client.say('' + $scope.active.name, '' + $scope.active.currentMessage); // send message to server
      $scope.active.currentMessage = ''; // clear the current message
    }
  };

  $scope.message = function (name, nick, text) {
    var isSelf = nick === client.nick;
    // push a message to the active channel's messages array
    console.log(name);
    $scope.channels[name].messages.push({
      self: isSelf,    // the css class the nick will be given: either 'self-true' or 'self-false'
      type: 'message', // the css class the message will be given
      nick: nick,      // nickname of the sender
      text: text       // text in the message
    });
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

  $scope.testMessage();
  // $scope.testMessage();
  // $scope.testMessage();
  // $scope.testMessage();
  // $scope.testMessage();

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
