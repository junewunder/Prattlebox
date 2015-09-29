angular
  .module('login', [])
  .controller('LoginController', LoginController);

function LoginController ($scope) {
  'use strict';
  var $ = require('../../static/lib/jquery.min.js');
  var ipc = require('ipc');
  var login = this;

  prattle.readSetting('loginDetails').then(details => {
    login.hostAddr = details.hostAddr;
    login.realName = details.realName;
    login.nickName = details.nickName;
    login.nickPass = details.nickPass;
    $scope.$apply();
  });

  // prattle.readSetting('loginDetails.realName').then(details => {
  //   console.log(details);
  // });

  // login.hostAddr = 'irc.freenode.net';
  // login.realName = 'Wunder Bot';
  // login.nickName = 'wunder-bot';
  // login.nickPass = 'bot-pass';

  login.loading = false;

  login.connectionTry = function () {
    login.loading = true;
    if (window.navigator.onLine) {
      ipc.send('connect-try', {
        hostAddr: login.hostAddr,
        realName: login.realName,
        nickName: login.nickName,
        nickPass: login.nickPass
      });
    } else {
      ipc.send('connect-fake', {
        hostAddr: login.hostAddr,
        realName: login.realName,
        nickName: login.nickName,
        nickPass: login.nickPass
      });
    }
  };

  login.openSettings = function() {
    prattle.popup({
      filename: 'settings',
      frame: true,
      width: 600,
      height: 400,
      killOnBlur: false,
    });
  };

  ipc.on('connect-ready', function() {
    prattle.writeSetting('loginDetails', {
      'hostAddr': login.hostAddr,
      'realName': login.realName,
      'nickName': login.nickName,
      'nickPass': login.nickPass
    });

    // after the client is created, load the chatter page
    var mainWindow = require('remote').getCurrentWindow();

    if (login.nickPass) {
      console.log(mainWindow.client);
      mainWindow.client.say('nickserv', 'identify ' + login.nickPass);
    }

    prattle.loadPage('chat');
  });
}
