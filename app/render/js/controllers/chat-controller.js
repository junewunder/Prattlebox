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
      // $scope.$apply();
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
    if ($scope.active.currentMessage !== '') {// prevent sending empty strings
      if($scope.active.currentMessage[0] == '/') {
        // if the message starts with a '/' then it's a command
        var msgLength = $scope.active.currentMessage.length;
        var totalmsg = $scope.active.currentMessage;
        var channelName;

        if (totalmsg.slice(0, 3) == '/me') {
          var finalMsg = $scope.active.currentMessage.slice(4, msgLength);
          client.action($scope.active.name, finalMsg);
          $scope.action($scope.active.name, client.nick, finalMsg);

        } else if (totalmsg.slice(0, 5) == '/join') {
          channelName = totalmsg.slice(6, msgLength);
          $scope.joinChannel(channelName);

        } else if (totalmsg.slice(0, 6) == '/leave') {
          channelName = totalmsg.slice(7, msgLength);
          $scope.leaveChannel(channelName);
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

  ipc.on('client-message', function (nick, to, text, message) {
    $scope.message(to, nick, text);
  });

  ipc.on('client-selfMessage', function (to, text) {
    // this is to handle client messages, but I'm not going to actually
    // handle this event because it's badly done.

    // self-message has to handle ACTIONs and messsages
    // if(text.slice(1, 7) === 'ACTION') {
    //   $scope.action(to, client.nick, text.slice(7, text.length));
    // } else {
    //   $scope.message(to, client.nick, text);
    // }
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

  ipc.on('client-raw', function(message) {
    console.log(message);
    var channelName, userLeft, userList; // for the linter
    $scope.message($scope.active.name, message.command, message.args);
    switch (message.command) {
      case 'JOIN':
        var userJoined = message.nick;
        channelName = message.args[0];
        // var users = message.args[3].split(' ');
        // $scope.channels[channelName].users = users;

        $scope.announce(channelName, userJoined, ' has joined the channel');
        break;

      case 'PART':
        userLeft = message.nick;
        channelName = message.args[0];

        $scope.announce(channelName, userLeft, ' has left the channel');
        break;

      case 'QUIT':
        userLeft = message.nick;
        channelName = message.args[0];

        $scope.announce(channelName, userLeft, ' has left the channel (quitting)');
        break;

      case 'NOTICE':
        var sender = message.args[0];
        channelName = message.args[0];
        var noticeText = message.args[1];

        $scope.announce(channelName, sender, noticeText);
        break;

      case 'rpl_topic':
        channelName = message.args[1];
        var topic = message.args[2];

        $scope.channels[name].topic = topic;
        break;

      case 'rpl_namreply':
        channelName = message.args[2];
        var nickList = message.args[3].split(' ');
        console.log('Users:' + userList);
        // $scope.message(channelName, 'name list', userList);
        $scope.channels[channelName].nicks = nickList;
        break;
    }
  });

  ipc.on('client-', function() {

  });
});
