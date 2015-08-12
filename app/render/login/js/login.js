angular.module('login', [])
.controller('LoginController', function ($scope) {
  'use strict';
  var $ = require('../../static/lib/jquery-1.11.3.min.js');
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
    ipc.send('load-page', 'chat');
  });
});
