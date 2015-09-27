var fs = require('fs.extra');

var getUserHome = require('./settings-methods.js').getUserHome;
var getConfigHome = require('./settings-methods.js').getConfigHome;

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
