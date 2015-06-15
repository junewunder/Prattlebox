'use strict';
var ipc = require('ipc'); //inter protocol communicator
var Client = require('./irc/client.js')

module.exports = function (app, mainWindow) {
  //Bind to events
  ipc.on('connect-try', function (event, clientData) {
    //attach a client to the mainWindow AND bind to its events
    new Client(app, mainWindow, clientData);
    console.log('> trying to connect');
  });

  ipc.on('load-page', function (event, page) {
    console.log('> page: ', page);
    mainWindow.loadUrl(`${__dirname}/../render/pages/${page}.html`);
    console.log(`> loading: ${__dirname}/../render/pages/${page}.html`);
  });
};
