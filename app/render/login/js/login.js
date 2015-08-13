angular.module('login', [])
.controller('LoginController', function ($scope) {
  'use strict';
  var $ = require('../../static/lib/jquery.min.js');
  var ipc = require('ipc'); //inter protocol communicator
  $scope.hostAddr = 'irc.freenode.net';
  $scope.realName = 'Wunder Bot';
  $scope.nickName = 'wunder-bot';
  $scope.nickPass = 'bot-pass';

  $scope.loading = false;

  $scope.connectionTry = function () {
    $scope.loading = true;
    ipc.send('connect-try', {
      hostAddr: $scope.hostAddr,
      realName: $scope.realName,
      nickName: $scope.nickName,
      nickPass: $scope.nickPass
    });
  };

  $scope.openSettings = function() {

  };

  ipc.on('connect-ready', function() {
    // after the client is created, load the chatter page
    var mainWindow = require('remote').getCurrentWindow();

    if ($scope.nickPass) {
      mainWindow.client.say('nickserv', 'identify ' + $scope.nickPass);
    }

    ipc.send('load-page', 'chat');
  });
});
