'use strict';
var $ = require('../lib/jquery-1.11.3.min.js');
var actions = require('./chat-actions.js');

module.exports = function (mainWindow) {
  var client = mainWindow.client;

  client.addListener('error', function(message) {
      console.log('>  error: \n', message);
  });

  client.addListener('motd', function (motd) {
    console.log(`>  motd: ${motd}`);
    mainWindow.send('motd');
  });

  client.addListener('', function () {

  });

  client.addListener('motd', function (motd) {
    $('body').text(motd);
  });

  client.addListener('message', function (nick, to, text, message) {
    actions.message(nick, to, text, message)
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
    console.log('>  owch! I was kicked');
  });

  client.addListener('', function () {

  });
};
