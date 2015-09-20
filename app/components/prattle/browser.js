'use strict';
// var app = require('app');
var ipc = require('ipc');
var irc = require('irc');
var BrowserWindow = require('browser-window');
var dialog = require('dialog');
var makeClientBindings = require('./client-bindings.js');
var PopUp = require('../pop-up.js');
var config = require('../config');

module.exports = class PrattleBrowser {
  constructor () {
    // this.windows = {};
    this.clients = {};

    this.makeBindings();
  }

  createWindow (args) {

  }

  destroyWindow(window) {
    var browser = BrowserWindow.fromWebContents(window);

    // do other things
  }

  createClient(window, clientData) {
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
    makeClientBindings(window, client);
  }

  makeBindings () {
    // don't ever call this a second time unless you wanna be seeing double...
    // k punk??

    // Bind to events
    // ipc.on('connect-try', (event, clientData) => {
    //   // attach a client to the mainWindow AND bind to its events
    //   this.createClient(event.sender, clientData);
    //
    //   app.on('before-quit', function (event) {
    //     this.clients[event.sender].disconnect();
    //   });
    // });

    ipc.on('load-page', (event, page) => {
      event.sender.loadUrl(`file://${__dirname}/../render/${page}/index.html`);
      // console.log(`> loading: ${__dirname}/../render/${page}/index.html`);
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
