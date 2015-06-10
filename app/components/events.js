'use strict';
var ipc = require('ipc');

module.exports = function (app, mainWindow) {
  //Bind to events
  console.log('> making bindings');
  ipc.on('try-connect', function (event, userData) {
    console.log("> recieved userData: " + userData.nickName);

  });
};
