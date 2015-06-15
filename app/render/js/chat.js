angular.module('chat', [])
.controller('ChatController', function () {
  'use strict';
  var $ = require('../lib/jquery-1.11.3.min.js');
  var ipc = require('ipc');
  var remote = require('remote');
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;
  var chat = this;

  this.messages = [
    {
      typeNick: 'other',
      typeMessage: 'text',
      nick: 'other-guy123',
      text: 'this is a message'
    },
    {
      typeNick: 'self',
      typeMessage: 'text',
      nick: 'jaywunder',
      text: 'this is another message'
    },
    {
      typeNick: 'self',
      typeMessage: 'text',
      nick: 'jaywunder',
      text: 'this is another message'
    },
    {
      typeNick: 'self',
      typeMessage: 'text',
      nick: 'jaywunder',
      text: 'this is another message'
    },
    {
      typeNick: 'self',
      typeMessage: 'text',
      nick: 'jaywunder',
      text: 'this is another message'
    },
    {
      typeNick: 'self',
      typeMessage: 'annoucment',
      text: 'this is an annoucment'
    }
  ];
  this.currentMessage = '';
  this.channel = '#botwar';

  //////////////////////////
  //CREATE ANGULAR METHODS//
  //////////////////////////

  this.submitMessage = function () {
    if (this.currentMessage !== '') {//don't want to send an empty string now...
      client.say('#botwar', '' + this.currentMessage); //send message to server
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
      // this.announce('this is something important');
    }
  };

  this.testMessage();

  /////////////////////////
  //BIND TO CLIENT EVENTS//
  /////////////////////////

  ipc.on('client-error', function (error) {
    chat.message('error: ' + error);
    console.log(error);
  });

  ipc.on('client-motd', function (motd) {
    chat.message(motd);
  });

  ipc.on('client-selfMessage', function (to, text) {
    chat.message(client.nick, text);
  });

  ipc.on('client-message', function (nick, to, text, message) {
    chat.message(nick, text);
  });

  ipc.on('client-names', function (names) {

  });

  ipc.on('client-kill', function (nick, reason, channels, message) {
    chat.message()
  });

  ipc.on('client-pm', function (nick, text, message) {

  });

  ipc.on('client-kick', function () {
    chat.announce('You were kicked.. :(');
  });

  ipc.on('', function () {

  });

});
