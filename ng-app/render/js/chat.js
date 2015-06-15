angular.module('chat', [])
.controller('ChatController', function () {
  'use strict';
  var $ = require('../lib/jquery-1.11.3.min.js');
  var ipc = require('ipc');

  this.pastMessages = [];
  this.currentMessage = '';

  this.submitMessage = function () {
    if (this.currentMessage !== '') {
      this.message(this.currentMessage); //show current message
      this.pastMessages.push(this.currentMessage); //append to message history
      this.currentMessage = ''; //clear the current message
    }
  };

  this.message = function (text) {
    //create an li.message element
    $('#messages').append(
      $('<li>')
        .text(text)
        .addClass('message')
    );
  };

  this.announce = function (text) {
    //create an li.annoucment element
    $('#messages').append(
      $('<li>')
        .text(text)
        .addClass('annoucment')
    );
  };

  this.testMessage = function () {
    this.message('hello, world');
  };

  /////////////////////////
  //BIND TO CLIENT EVENTS//
  /////////////////////////
  var remote = require('remote');
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;
  var chat = this;

  client.addListener('error', function (error) {
    chat.message('error: ' + error);
    console.log(error);
  });

  client.addListener('motd', function (motd) {
    chat.message(motd);
  });

  client.addListener('message', function (nick, to, text, message) {
    // chat.message(`from:${from}\nto:${to}\ntext:${text}\nmessage:${message}`);
    console.log('> got a message');
  });

  client.addListener('names', function (names) {

  });

  client.addListener('say', function () {

  });

  client.addListener('kill', function (nick, reason, channels, message) {

  });

  client.addListener('selfMessage', function (to, text) {

  });

  client.addListener('pm', function (nick, text, message) {

  });

  client.addListener('kick', function () {
    chat.announce('You were kicked.. :(');
  });

  client.addListener('', function () {

  });

});
