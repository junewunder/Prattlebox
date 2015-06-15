'use strict';
var ipc = require('ipc'); //inter protocol communicator
var Client = require('./irc/client.js')

module.exports = function (app, mainWindow) {
  //Bind to events
  ipc.on('connect-try', function (event, clientData) {
    //attach a client to the mainWindow AND bind to its events
    new Client(app, mainWindow, clientData);
    console.log('\n> trying to connect\n');
  });

  ipc.on('load-page', function (event, page) {
    mainWindow.loadUrl(`file://${__dirname}/../render/pages/${page}.html`);
    console.log(`\n> loading: ${__dirname}/../render/pages/${page}.html\n`);
  });
};
