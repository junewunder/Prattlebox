angular.module('chat', [])
.controller('ChatController', function () {
  'use strict';
  var $ = require('../lib/jquery-1.11.3.min.js');

  this.message = function (text) {
    $('#messages').append(
      $('<li>')
        .text(text)
        .addClass('message')
    );
  };

  this.announce = function (text) {
    $('#messages').append(
      $('<li>')
        .text(text)
        .addClass('annoucment')
    );
  };

  this.testMessage = function () {
    this.message('hello world');
  };
});
