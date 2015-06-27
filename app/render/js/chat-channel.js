angular.module('chat', [])
.controller('ChannelController', function () {
  'use strict';
  var $ = require('../lib/jquery-1.11.3.min.js');
  var ipc = require('ipc');
  var channel = this;

  this.name = '';
  this.currentMessage = '';

  this.submitMessage = function () {
    if (this.currentMessage !== '') {//don't want to send an empty string now...
      client.say(''+this.name, ''+this.currentMessage); //send message to server
      this.currentMessage = ''; //clear the current message
    }
  };

  this.message = function (nick, text) {
    var typeNick = nick === client.nick ? 'self' : 'other';
    this.messages.push({
      typeNick: typeNick,
      typeMessage: 'text',
      nick: nick,
      text: text
    });
  };

  this.announce = function (text) {
    this.messages.push({
      typeNick: 'none',
      typeMessage: 'annoucment',
      nick: '',
      text: text
    });
  };

  this.testMessage = function () {
    var numTests = 3;
    for (var i = 0; i <= numTests; i++) {
      this.message('chester', 'ayy lmao');
      this.announce('this is something important');
    }
  };

  this.testMessage();

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
