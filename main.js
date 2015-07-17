#! /usr/bin/env electron
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
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		title: 'Prattlebox'
		// fullscreen: false,
		// frame: false,
		// transparent: true
		});

	mainWindow.on('closed', function () {
		app.quit();
	});

	mainWindow.loadUrl(`file://${__dirname}/app/render/pages/login.html`);

	//add menus
	require('./app/components/menu.js')(app, mainWindow);
	//bind to events
	require('./app/components/ipc-events.js')(app, mainWindow);
});
