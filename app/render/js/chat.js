angular.module('chat', [])
.controller('ChatController', function () {
  'use strict';
  var $ = require('../lib/jquery-1.11.3.min.js');
  var ipc = require('ipc');
  var remote = require('remote');
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;
  var chat = this;

  this.pastMessages = [];
  this.currentMessage = '';
  this.channel = '#botwar';

  //////////////////////////
  //CREATE ANGULAR METHODS//
  //////////////////////////

  this.submitMessage = function () {
    if (this.currentMessage !== '') {//don't want to send an empty string now...
      //send message to server
      client.say('#botwar', '' + this.currentMessage);
      //append to message history
      this.pastMessages.push(this.currentMessage);
      //clear the current message
      this.currentMessage = '';
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

  ipc.on('client-message', function (nick, to, text, message) {
    chat.message(`nick:${nick}\nto:${to}\ntext:${text}`);
  });

  ipc.on('client-names', function (names) {

  });

  ipc.on('client-selfMessage', function (to, text) {
    chat.message(`to: ${to} \n text: ${text}`);
  });

  ipc.on('client-kill', function (nick, reason, channels, message) {

  });

  ipc.on('client-pm', function (nick, text, message) {

  });

  ipc.on('client-kick', function () {
    chat.announce('You were kicked.. :(');
  });

  ipc.on('', function () {

  });

});
