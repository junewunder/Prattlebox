'use strict';
var irc = require('irc');
var ipc = require('ipc');

module.exports = function (app, mainWindow, clientData) {
  mainWindow.client = new irc.Client(clientData.hostAddr, clientData.nickName, {
    channels: ['#botwar'],
    port: 6667
  });


  /*
  Here we have to pretty much re-implmet the API for the Client object.
  It's very bad for the render process to send callbacks to the main process,
    SEE: https://github.com/atom/electron/blob/master/docs/api/remote.md#passing-callbacks-to-the-main-process
  so the rendering process can bind to an event on the mainWindow,
  which isn't the main process. This is much cleaner.
  */

  app.on('before-quit', function (event) {
    mainWindow.client.disconnect();
  });

  mainWindow.client.addListener('registered', function (message) {
    mainWindow.send('connect-ready', message);
  });

  mainWindow.client.addListener('error', function (message) {
    mainWindow.send('client-error', message);
  });

  mainWindow.client.addListener('motd', function (motd) {
    mainWindow.send('client-motd', motd);
  });

  mainWindow.client.addListener('message', function (nick, to, text, message) {
    mainWindow.send('client-message', nick, to, text, message);
  });

  mainWindow.client.addListener('names', function (names) {
    mainWindow.send('client-names', names);
  });

  mainWindow.client.addListener('selfMessage', function (to, text) {
    mainWindow.send('client-selfMessage', to, text);
  });

  mainWindow.client.addListener('kill', function (nick, reason, channels, message) {
    mainWindow.send('client-kill', nick, reason, channels, message);
  });

  mainWindow.client.addListener('pm', function (nick, text, message) {
    mainWindow.send('client-pm', nick, text, message);
  });

  mainWindow.client.addListener('kick', function (channel, nick, by, reason, message) {
    mainWindow.send('client-kick', channel, nick, by, reason, message);
  });

  mainWindow.client.addListener('notice', function (nick, to, text, message) {
    mainWindow.send('client-notice', nick, to, text, message);
  });
};
