'use strict';
module.exports = function (window, client) {
  /*
   * Here we have to pretty much re-implement the API for the Client object.
   * It's very bad for the render process to send callbacks to the main process,
   *  SEE: https://github.com/atom/electron/blob/master/docs/api/remote.md#passing-callbacks-to-the-main-process
   * so the rendering process can bind to an event on the window,
   * which isn't the main process. This is much cleaner.
   *
   * client -> main process -> renderer
   */

  /* You can find the events at:
   * http://node-irc.readthedocs.org/en/latest/API.html#events
   **/

  client.addListener('registered', function (message) {
    window.send('connect-ready', message);
  });

  client.addListener('error', function (message) {
    window.send('client-error', message);
  });

  client.addListener('motd', function (motd) {
    window.send('client-motd', motd);
  });

  client.addListener('message', function (nick, to, text, message) {
    window.send('client-message', nick, to, text, message);
  });

  client.addListener('selfMessage', function (to, text) {
    window.send('client-selfMessage', to, text);
  });

  client.addListener('names', function (channel, nicks) {
    window.send('client-names', nicks);
  });

  client.addListener('topic', function (channel, topic, nick, message) {
    window.send('client-topic', channel, topic, nick, message);
  });

  client.addListener('kill', function (nick, reason, channels, message) {
    window.send('client-kill', nick, reason, channels, message);
  });

  client.addListener('pm', function (nick, text, message) {
    window.send('client-pm', nick, text, message);
  });

  client.addListener('kick', function (channel, nick, by, reason, message) {
    window.send('client-kick', channel, nick, by, reason, message);
  });

  client.addListener('notice', function (nick, to, text, message) {
    window.send('client-notice', nick, to, text, message);
  });

  client.addListener('action', function (from, to, text, message) {
    window.send('client-action', from, to, text, message);
  });

  client.addListener('raw', function (message) {
    window.send('client-raw', message);
  });

  client.addListener('ctcp', function (from, to, text, type, message) {
    window.send('client-ctcp', from, to, text, type, message);
  });
};
