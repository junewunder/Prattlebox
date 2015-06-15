var ipc = require('ipc'); //inter protocol communicator

angular.module('login', [])
.controller('LoginController', function () {
  'use strict';
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
    console.log('> trying to connect here');
  };

  this.connectionReady = function () {
    mainWindow.loadUrl(`file://${__dirname}/../pages/chat.html`);
  };
});
