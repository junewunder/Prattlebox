chat.controller('ChannelController', ['$scope', function ($scope) {
  'use strict';
  var $ = require('../lib/jquery-1.11.3.min.js');
  var ipc = require('ipc');
  var remote = require('remote');
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;

  $scope.currentMessage = '';

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
}]);
