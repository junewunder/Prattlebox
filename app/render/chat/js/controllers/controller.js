chat.controller('ChatController', function ($scope) {
  'use strict';
  var $ = require('../../static/lib/jquery.min.js');
  var ipc = require('ipc');
  var remote = require('remote');
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;
  var chat = $scope;

  $scope.client = client;
  $scope.channels = {}; // { name : { channel-vars } }
  $scope.active = {}; // the name of the channel that is active
  $scope.notificationSounds = false;

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
      try{
        $scope.$apply();
      } catch (err) {

      }
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

  var clientCommandHandler = require('./js/controllers/client-command-handler.js');
  $scope.submitMessage = function () {
    var currentChannel = $scope.active.name;
    if ($scope.active.currentMessage !== '') { // prevent sending empty strings
      if($scope.active.currentMessage[0] == '/') { // if the message starts with a '/' then it's a command
        var message = $scope.active.currentMessage;

        var cmd;
        for (var cmdName in clientCommandHandler) {
          cmd = clientCommandHandler[cmdName];

          if (message.match(cmd.match)) {
            cmd.func($scope, client, message);
          }
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
    $scope.pushMessage(name, 'message', nick, text);
  };

  $scope.action = function(name, nick, text) {
    // push an action to the active channel's messages array
    $scope.pushMessage(name, 'action', nick, text);
  };

  $scope.announce = function (name, nick, text) {
    // push an announcement to the active channel's messages array
    $scope.pushMessage(name, 'announcement', nick, text);
  };

  $scope.pushMessage = function(name, type, nick, text) {
    var isSelf = nick === client.nick;

    if(!$scope.channels[name]) $scope.joinChannel(name);
    if(name !== $scope.active.name) $scope.channels[name].unread++;

    $scope.channels[name].messages.push({
      self: isSelf,          // Bool - the css class the nick will be given: either 'self-true' or 'self-false'
      type: type,          // String - the css class the message will be given
      nick: nick,          // String - nickname of the sender
      text: text,          // String - text in the message
    });

    if (!isSelf) $scope.$apply();

    // console.log();
    // console.log('scrolling...');
    // console.log($('.messages-container').get(0).scrollHeight);
    // console.log($('.messages-container').scrollTop());

    $('.messages-container').animate({
      scrollTop: $('.messages-container').get(0).scrollHeight + 100
    }, 200);
  };

  $scope.toggleNicks = function(name) {
    // toggle the boolean
    $scope.channels[name].showNicks = !$scope.channels[name].showNicks;
  };

  $scope.popUp = function () {
    // will open /render/popup/{filename}/index.html
    ipc.send('pop-up', {
      filename: 'new-channel'
    });
  };

  // channels will be in alphabetical order
  $scope.joinChannel('#jaywunder');
  // $scope.joinChannel('#jaywunder2');

  // pop-ups
  ipc.on('channel-join', function(args) {
    $scope.joinChannel(args.channelName);
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
    console.log('--');
    console.log("command: " + message.command);
    console.log("args: " + message.args);
    console.log(message);
    try {
      channelCommandHandler[message.command]($scope, message);
      // console.log(channelCommandHandler[message.command]);
    } catch(err) {
      // $scope.message($scope.current.name, 'error', message.command + ' needs taking care of');
    }
  });
});
