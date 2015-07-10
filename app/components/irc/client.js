'use strict';
var irc = require('irc');
var ipc = require('ipc');

module.exports = function (app, mainWindow, clientData) {
  mainWindow.client = new irc.Client(clientData.hostAddr, clientData.nickName, {
    port: 6667
  });

  /*
   * Here we have to pretty much re-implmet the API for the Client object.
   * It's very bad for the render process to send callbacks to the main process,
   *  SEE: https://github.com/atom/electron/blob/master/docs/api/remote.md#passing-callbacks-to-the-main-process
   * so the rendering process can bind to an event on the mainWindow,
   * which isn't the main process. This is much cleaner.
   *
   * client -> main process -> renderer
   */

  /* You can find the events at:
   * http://node-irc.readthedocs.org/en/latest/API.html#events
   * I haven't implemented all of them, but I've done the important ones
   **/

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

  mainWindow.client.addListener('selfMessage', function (to, text) {
    mainWindow.send('client-selfMessage', to, text);
  });

  mainWindow.client.addListener('names', function (channel, nicks) {
    mainWindow.send('client-names', nicks);
  });

  mainWindow.client.addListener('topic', function (channel, topic, nick, message) {
    mainWindow.send('client-topic', channel, topic, nick, message);
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

  mainWindow.client.addListener('action', function (from, to, text, message) {
    mainWindow.send('client-action', from, to, text, message);
  });
};
