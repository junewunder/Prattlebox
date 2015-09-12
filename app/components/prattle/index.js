var ipc = require('ipc');

module.exports = {
  popup: function(args) {
    ipc.send('pop-up', args);
  },
  loadPage: function(pageName) {
    ipc.send('load-page', pageName);
  },
  writeSetting: function(key, value) {
    ipc.send('write-setting', key, value);
  },
  readSetting: function(key) {
    ipc.send('read-setting', key);
    return new Promise((resolve, reject) => {
      ipc.on('read-' + key, (value) => {
        resolve(value);
      });
    });
  }
};
