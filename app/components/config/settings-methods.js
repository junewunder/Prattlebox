// courtesy of bojzi, thanks open source!
// https://github.com/bojzi/sound-machine-electron-guide/blob/master/configuration.js
var nconf = require('nconf').file({file: getUserHome() + '/.prattle/config.json'});

function saveSetting(settingKey, settingValue) {
  nconf.set(settingKey, settingValue);
  nconf.save();
}

function readSetting(settingKey) {
  nconf.load();
  return nconf.get(settingKey.toString());
}

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function getConfigHome() {
  return getUserHome() + '/.prattle';
}

module.exports = {
  saveSetting,
  readSetting,
  getUserHome,
  getConfigHome,
};
