'use strict';
var ipc = require('ipc'); //inter protocol communicator

module.exports = function (app, mainWindow) {
  //Bind to events
  ipc.on('try-connect', function (event, clientData) { //get event from "client"
    console.log('> trying to connect now');
    require('./irc/client.js')(app, mainWindow, clientData);
    require('./client-events.js')(app, mainWindow);

    console.log(mainWindow.client);

    mainWindow.client.addListener('registered', function () {
      mainWindow.send('connect-ready');
    });

    mainWindow.client.addListener('error', function(message) {
        console.log('>  error: \n', message);
    });
  });
};
