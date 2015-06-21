var chat = angular.module('chat', []);
chat.controller('ChatController', function ($scope) {
  'use strict';
  var $ = require('../lib/jquery-1.11.3.min.js');
  var ipc = require('ipc');
  var remote = require('remote');
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;
  var chat = $scope;

  $scope.channels = {};

  $scope.hello = 'world';

  $scope.joinChannel = function (name) {
    client.join(name);
    $scope.channels[name] = {
      messages: [],
      active: false
    };
    // $scope.makeActive(name);
  };

  $scope.makeActive = function (name) {
    for (var i = 0; i < Object.keys($scope.channels).length; i++) {
      var key = Object.keys($scope.channels)[i];
      $scope.channels[key].active = false;
    }
    $scope.channels[name].active = true;

  };

  $scope.joinChannel('#botwar');
  $scope.joinChannel('#botwar2');
  $scope.joinChannel('#botwar3');
  $scope.joinChannel('#botwar4');

  $scope.makeActive('#botwar');
})

.directive('chatTab', function () { //not in use currently
  return {
    template:
    '<button ng-repeat="channel in chat.channels" class="tab tab-active-{{channel.active}}">\n'+
      '<div class="tab-title" data-name="{{channel.name}}"></div>\n'+
      '<div class="tab-close-icon"></div>\n'+
    '</button>'
  };
})

.controller('ChannelController', function ($scope) {
  'use strict';
  var $ = require('../lib/jquery-1.11.3.min.js');
  var ipc = require('ipc');
  var channel = $scope;
  var remote = require('remote');
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;

  $scope.name = '';
  $scope.currentMessage = '';

  $scope.submitMessage = function () {
    if ($scope.currentMessage !== '') {//can't send empty strings
      client.say('' + $scope.name, '' + $scope.currentMessage); //send message to server
      $scope.currentMessage = ''; //clear the current message
    }
  };

  $scope.message = function (nick, text) {
    var typeNick = nick === client.nick ? 'self' : 'other';
    $scope.messages.push({
      typeNick: typeNick,
      typeMessage: 'text',
      nick: nick,
      text: text
    });
  };

  $scope.announce = function (text) {
    $scope.messages.push({
      typeNick: 'none',
      typeMessage: 'annoucment',
      nick: '',
      text: text
    });
  };

  $scope.testMessage = function () {
    var numTests = 3;
    for (var i = 0; i <= numTests; i++) {
      $scope.message('chester', 'ayy lmao');
      $scope.announce('$scope is something important');
    }
  };

  // $scope.testMessage();

  /////////////////////////
  //BIND TO CLIENT EVENTS//
  /////////////////////////

  ipc.on('client-error', function (error) {
    channel.message('error: ', error);
    console.log(error);
  });

  ipc.on('client-motd', function (motd) {
    channel.announce(motd);
  });

  ipc.on('client-selfMessage', function (to, text) {
    channel.message(client.nick, text);
  });

  ipc.on('client-message', function (nick, to, text, message) {
    channel.message(nick, text);
  });

  ipc.on('client-names', function (names) {

  });

  ipc.on('client-kill', function (nick, reason, channels, message) {
    channel.message();
  });

  ipc.on('client-pm', function (nick, text, message) {

  });

  ipc.on('client-kick', function () {
    channel.announce('You were kicked.. :(');
  });

  ipc.on('', function () {

  });
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
});
