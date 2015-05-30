'use strict';

var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.

require('crash-reporter').start();
var mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') app.quit();
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // require('./app/main.js')(app, mainWindow);
});