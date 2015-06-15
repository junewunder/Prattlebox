angular.module('login', [])
.controller('LoginController', function () {
  'use strict';
  var ipc = require('ipc'); //inter protocol communicator
  this.hostAddr = 'irc.freenode.net';
  this.realName = 'Wunder Bot';
  this.nickName = 'wunder-bot';
  this.nickPass = 'bot-pass';

  this.connectionTry = function () {
    ipc.send('connect-try', {
      hostAddr: this.hostAddr,
      realName: this.realName,
      nickName: this.nickName,
      nickPass: this.nickPass
    });
  };

  this.connectionReady = function () {
    console.log('the connection is ready');
    ipc.send('load-page', 'chat');
  };

  ipc.on('connect-ready', this.connectionReady);
});
