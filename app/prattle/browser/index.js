'use strict';
var app = require('app');
var ipc = require('ipc');
var irc = require('irc');
var BrowserWindow = require('browser-window');
var dialog = require('dialog');
var Popup = require('./popup.js');
var Menus = require('./menu.js');
var FakeClient = require('./fake-client.js');

module.exports = class PrattleBrowser {
  constructor (app) {
    this.app = app;

    this.windows = {};
    this.clients = {};

    this.config = require('./config.js');
  }

  createMenus (app, window) {
    new Menus(app, window);
  }

  broadcast (eventName) {
    // send event to all windows
  }

  createPopup (args, mainWindow) {
    new Popup(args, mainWindow);
  }

  createWindow (args) {
    var window = new BrowserWindow(args);

    this.createMenus(this.app, window);

    return window;
  }

  createNewChatWindow () {
    return prattle.createWindow({
  		width: 800,
  		height: 600,
  		title: 'Prattlebox',
  		'web-preferences': {
  			'allow-displaying-insecure-content': true,
  			'java': false,
  			'webgl': false
  		}
  	});
  }

  destroyWindow (window) {
    var browser = BrowserWindow.fromWebContents(window);
    browser.close();
  }

  createClient (window, clientData) {
    // instatiate the client
    var client = new irc.Client(clientData.hostAddr, clientData.nickName, {
      userName: clientData.nickName,
      realName: clientData.realName,
      port: this.config.readSetting('port'),
    });

    var browserWindow = BrowserWindow.fromWebContents(window);
    browserWindow.client = client;

    // put the client into the client registry
    this.clients[window] = client;

    // make the bindings for the client
    require('./client-bindings.js')(window, client);
  }

  createFakeClient(window, clientData) {
    var client = new FakeClient(clientData.hostAddr, clientData.nickName, {
      userName: clientData.userName,
      realName: clientData.realName,
      port: this.config.readSetting('port')
    });
    var browserWindow = BrowserWindow.fromWebContents(window);
    browserWindow.client = client;

    // put the client into the client registry
    this.clients[window] = client;
    window.send('connect-ready');
  }

  getClient(window) {
    return this.clients[window];
  }

  loadPage(page, window) {
    window.loadUrl(`file://${__base}/app/render/${page}/index.html`);
  }

  createIpcBindings () {
    // don't ever call this a second time unless you wanna be seeing double...
    // k punk??

    // Bind to events
    ipc.on('connect-try', (event, clientData) => {
      // attach a client to the mainWindow AND bind to its events
      this.createClient(event.sender, clientData);

      event.sender.on('close', (event) => {
        this.getClient(event.sender).disconnect();
      });
    });

    ipc.on('connect-fake', (event, clientData) => {
      this.createFakeClient(event.sender, clientData);
    });

    ipc.on('load-page', (event, page) => {
      this.loadPage(page, event.sender);
    });

    ipc.on('popup', (event, args) => {
      this.createPopup(args, event.sender);
    });

    ipc.on('write-setting', (event, key, value) => {
      this.config.writeSetting(key, value);
    });

    ipc.on('read-setting', (event, key) => {
      event.sender.send('read-' + key, this.config.readSetting(key));
    });

    ipc.on('read-setting-sync', (event, key) => {
      event.returnValue = this.config.readSetting(key);
    });
  }
};
