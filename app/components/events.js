'use strict';
//THESE TWO ARE EASY TO MIX UP BE CARFUL WITH THEM
var ipc = require('ipc'); //inter protocol communicator
var Client = require('./irc/client.js');

module.exports = function (app, mainWindow) {
  //Bind to events
  ipc.on('try-connect', function (event, clientData) { //get event from "client"
    event.sender.send('connect', new Client(clientData));
  });
};
