#! /usr/bin/env electron
'use strict';

var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.

require('crash-reporter').start();

global.__base = __dirname;
global.prattle = require('./app/components/prattle')(app);


// Quit when all windows are closed.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});

app.on('ready', function () {
	var mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		title: 'Prattlebox',
		'web-preferences': {
			'allow-displaying-insecure-content': true,
			'java': false,
			// 'text-areas-are-resizable': true,
			'webgl': false
		}
	});

	mainWindow.on('closed', function () {
		app.quit();
	});

	//add menus
	require('./app/components/menu.js')(app, mainWindow);

	// create ipc events ONLY CALL THIS ONCE
	prattle.makeBindings();
	//load login page
	mainWindow.loadUrl(`file://${__dirname}/app/render/login/index.html`);
});
