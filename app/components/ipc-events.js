'use strict';
var ipc = require('ipc'); //inter protocol communicator
var dialog = require('dialog');
var Client = require('./irc/client.js');
var PopUp = require('./pop-up.js');
var config = require('./config');

console.log(config);

module.exports = function (app, mainWindow) {
  // Bind to events
  ipc.on('connect-try', function (event, clientData) {
    // attach a client to the mainWindow AND bind to its events
    new Client(app, mainWindow, clientData);
    console.log('> trying to connect');
  });

  ipc.on('load-page', function (event, page) {
    mainWindow.loadUrl(`file://${__dirname}/../render/${page}/index.html`);
    console.log(`> loading: ${__dirname}/../render/${page}/index.html`);
  });

  ipc.on('pop-up', function (event, args) {
    new PopUp(args, mainWindow);
  });

  ipc.on('write-setting', function(event, key, value) {
    config.writeSetting(key, value);
  });

  ipc.on('read-setting', function(event, key) {
    mainWindow.send('read-' + key, config.readSetting(key));
  });
};
