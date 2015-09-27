'use strict';
var app = require('app');
var ipc = require('ipc');
var irc = require('irc');
var BrowserWindow = require('browser-window');
var dialog = require('dialog');
var PopUp = require('./popup.js');
var config = require('./config');

module.exports = class PrattleBrowser {
  constructor (app) {
    this.app = app;

    this.windows = {};
    this.clients = {};
  }

  createWindow (args) {

  }

  destroyWindow (window) {
    var browser = BrowserWindow.fromWebContents(window);

    // do other things
  }

  createClient (window, clientData) {
    // instatiate the client
    var client = new irc.Client(clientData.hostAddr, clientData.nickName, {
      userName: clientData.nickName,
      realName: clientData.realName,
      port: config.readSetting('port'),
    });

    var browserWindow = BrowserWindow.fromWebContents(window);
    browserWindow.client = client;

    // put the client into the client registry
    this.clients[window] = client;

    // make the bindings for the client
    require('./client-bindings.js')(window, client);
  }

  getClient(window) {
    return this.clients[window];
  }

  makeBindings () {
    // don't ever call this a second time unless you wanna be seeing double...
    // k punk??

    // Bind to events
    ipc.on('connect-try', (event, clientData) => {
      // attach a client to the mainWindow AND bind to its events
      this.createClient(event.sender, clientData);

      this.app.on('before-quit', (event) => {
        this.getClient(event.sender).disconnect();
      });
    });

    ipc.on('load-page', function (event, page) {
  		console.log(`> loading: ${__base}/app/render/${page}/index.html`);
      event.sender.loadUrl(`file://${__base}/app/render/${page}/index.html`);
    });

    ipc.on('pop-up', (event, args) => {
      new PopUp(args, event.sender);
    });

    ipc.on('write-setting', (event, key, value) => {
      config.writeSetting(key, value);
    });

    ipc.on('read-setting', (event, key) => {
      event.sender.send('read-' + key, config.readSetting(key));
    });

    ipc.on('read-setting-sync', (event, key) => {
      event.returnValue = config.readSetting(key);
    });
  }
};
