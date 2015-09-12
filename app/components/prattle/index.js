var ipc = require('ipc');

module.exports = {
  popup: function(args) {
    ipc.send('pop-up', args);
  },
  loadPage: function(pageName) {
    ipc.send('load-page', pageName);
  },
  saveSetting: function(key, value) {
    ipc.send('save-setting', key, value);
  },
  readSetting: function(key) {
    console.log('requested ' + key);
    ipc.send('read-setting', key);
    return new Promise((resolve, reject) => {
      ipc.on('read-' + key, (value) => {
        resolve(value);
      });
    });
  }
};
