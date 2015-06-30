var chat = angular.module('chat', []);
chat.controller('ChatController', function ($scope) {
  'use strict';
  var $ = require('../lib/jquery-1.11.3.min.js');
  var ipc = require('ipc');
  var remote = require('remote');
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;
  var chat = $scope;

  $scope.channels = {}; // { name : { channel-vars } }
  $scope.active = ''; // the name of the channel that is active

  $scope.hello = 'world'; // test variable

  $scope.joinChannel = function (name) {
    if (!$scope.channels[name]) { // check if the channel exists
      client.join(name); // have the client join the channel
      $scope.channels[name] = { // add the channel to the $scope.channels object
        messages: [],
        active: false
      };
      $scope.makeActive(name); // make the channel active
    }
  };

  $scope.leaveChannel = function (name) {
    client.part(name); // have the client leave the channel
    delete $scope.channels[name]; // delete the channel from the channel list
  };

  $scope.makeActive = function (name) {
    for (var i = 0; i < Object.keys($scope.channels).length; i++) { // iterate over the keys
      var key = Object.keys($scope.channels)[i]; // get the key
      $scope.channels[key].active = false;// make everything inactive
    }
    $scope.channels[name].active = true; // let the channel know it's active
    $scope.active = name; // point $scope.active to the active channel
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

  /*
   * For right now I'm going to store all the messagin methods in this scope.  I don't
   * like it this way, but the first version is a "good 'nuf" version. So this'll have to do.
   * Maybe it'll get fixed? 😅
   */

  $scope.submitMessage = function () {
    if ($scope.currentMessage !== '') {// prevent sending empty strings
      client.say('' + $scope.active, '' + $scope.currentMessage); // send message to server
      $scope.currentMessage = ''; // clear the current message
    }
  };

  $scope.message = function (name, nick, text) {
    var typeNick = nick === client.nick ? 'self' : 'other';
    // push a message to the active channel's messages array
    $scope.channels[name].messages.push({
      typeNick: typeNick, // the css class the nick will be given: either 'self' or 'other'
      typeMessage: 'text', // the css class the message will be given
      nick: nick, // include the nickname
      text: text // include the text
    });
    if (typeNick !== 'self') $scope.$apply();
    // $('#messages-container').animate({ scrollTop: $(document)[0].scrollHeight }, 100);
  };

  $scope.announce = function (name, text) {
    // push a message to the active channel's messages array
    $scope.channels[name].messages.push({
      typeNick: 'none', // have no nickname
      typeMessage: 'annoucment', // the class the message text will be given
      nick: '', // annoncments aren't sent by anyone
      text: text // include the text of the message
    });
    $scope.$apply();
  };

  $scope.testMessage = function () {
    // test the messages
    $scope.message($scope.active, 'chester', 'ayy lmao');
    $scope.message($scope.active, 'chester', 'ayy lmao');
    $scope.message($scope.active, 'chester', 'ayy lmao');
    $scope.message($scope.active, 'chester', 'ayy lmao');
    $scope.message($scope.active, 'chester', 'ayy lmao');
    $scope.message($scope.active, 'chester', 'ayy lmao');
    $scope.message($scope.active, 'chester', 'ayy lmao');
    $scope.message($scope.active, 'chester', 'ayy lmao');
    $scope.message($scope.active, 'chester', 'ayy lmao');
    // $scope.announce($scope.active, '$scope is something important');
  };

  $scope.testMessage();
  $scope.testMessage();
  $scope.testMessage();
  $scope.testMessage();
})

.controller('ChannelController', function ($scope) {
  'use strict';
  var $ = require('../lib/jquery-1.11.3.min.js');
  var ipc = require('ipc');
  var remote = require('remote');
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;

  $scope.currentMessage = '';

  // $scope.testMessage();

  /////////////////////////
  //BIND TO CLIENT EVENTS//
  /////////////////////////

  ipc.on('client-error', function (error) {
    $scope.message($scope.active, 'error: ', error);
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

  ipc.on('', function () {

  });
})

.directive('nope', function () {
  return {
    template: ''
  };
})

.directive('chatPane', function () {
  return {
    template: '<div class="content wrapper">\n'+
      '<div id="messages-container">\n'+
        '<ul id="messages">\n'+
          '<li class="message" ng-repeat="message in chat.messages">\n'+
            '<span class="nick {{message.typeNick}}">{{message.nick}}</span>\n'+
            '<span class="{{message.typeMessage}}">{{message.text}}</span>\n'+
          '</li>\n'+
        '</ul>\n'+
      '</div>\n'+
      '<div id="input-container">\n'+
        '<form id="input-form" ng-submit="chat.submitMessage()" >\n'+
          '<input type="text" id="input-text" ng-model="chat.currentMessage">\n'+
          '<button type="button" id="input-button" ng-click="chat.submitMessage()">send</button>\n'+
        '</form>\n'+
      '</div>\n'+
    '</div>'
  };
})

.directive('chatTab', function () { //not in use currently
  return {
    template:
    '<button ng-repeat="channel in chat.channels" class="tab tab-active-{{channel.active}}">\n'+
      '<div class="tab-title" data-name="{{channel.name}}"></div>\n'+
      '<div class="tab-close-icon"></div>\n'+
    '</button>'
  };
});
