'use strict';
var ipc = require('ipc');
var remote = require('remote');

module.exports = class PrattleRenderer {
  constructor () {

  }

  get client () {
    var mainWindow = remote.getCurrentWindow();
    return mainWindow.client;
  }

  keyBind () {

  }

  returnValue (eventName, args) {
    ipc.send('popup-return', eventName, args);
  }

  openSettings () {

  }

  popup (args) {
    ipc.send('popup', args);
  }

  loadPage (pageName) {
    ipc.send('load-page', pageName);
  }

  writeSetting (key, value) {
    ipc.send('write-setting', key, value);
  }

  readSetting (key) {
    ipc.send('read-setting', key);
    return new Promise((resolve, reject) => {
      ipc.on('read-' + key, (value) => {
        resolve(value);
      });
    });
  }

  readSettingSync (key) {
    return ipc.sendSync('read-setting-sync', key);
  }

  notification (title, body) {
    new Notification(title, {body}); // jshint ignore: line
  }
};
