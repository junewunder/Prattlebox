'use strict';

var nconf = require('nconf').file({file: getUserHome() + '/.prattle/config.json'});
var fs = require('fs.extra');

export function writeSetting(settingKey, settingValue) {
  nconf.set(settingKey, settingValue);
  nconf.save();
}

export function readSetting(settingKey) {
  nconf.load();
  return nconf.get(settingKey.toString());
}

export function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

export function getConfigHome() {
  return getUserHome() + '/.prattle';
}

export function createDotPrattle() {
  // get file list of dot-prattle
  var templateFiles = fs.readdirSync(__base + '/dot-prattle');

  // first check of the ~/.prattle folder exists
  fs.readdir(getUserHome(), (err, files) => {

    // if .prattle doens't exist then make a folder
    if (files.indexOf('.prattle') < 0) {
      fs.mkdir(getUserHome() + '/.prattle');
    }

    // then check if all the necessary config files exist
    fs.readdir(getConfigHome(), (err, targetFiles) => {
      // targetFiles is an array of the files in .prattle

      // iterate through the files to see if any of them don't exist,
      // then create those if they don't exist
      for (var template of templateFiles) {

        if (targetFiles.indexOf(template) < 0) {
          // copy from, copy to
          fs.copy(__base + 'dot-prattle/' + template, getConfigHome() + '/' + template);
        }
      }
    });
  });

}
