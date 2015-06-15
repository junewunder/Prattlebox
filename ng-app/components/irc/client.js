'use strict';
var irc = require('irc');

module.exports = function (app, mainWindow, clientData) {
  mainWindow.client = new irc.Client(clientData.hostAddr, clientData.nickName, {
    channels: ['#botwar'],
    port: 6667
  });

  mainWindow.client.connect();
  //TODO: try commenting this line to see if the dounble connection issue goes away

  mainWindow.client.addListener('registered', function () {
    mainWindow.send('connect-ready');
  });

  mainWindow.client.addListener('error', function (message) {
    console.log('>  error: \n', message);
  });

  app.on('before-quit', function (event) {
    mainWindow.client.disconnect();
  });
};
