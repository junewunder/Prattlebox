'use strict';
var ipc = require('ipc');
var remote = require('remote');
var currentWindow = remote.getCurrentWindow();

module.exports = class PrattleRenderer {
  constructor() {

  }

  popup (args) {
    ipc.send('pop-up', args);
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
};
