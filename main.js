#! /usr/bin/env electron
'use strict';

var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.

require('crash-reporter').start();

global.__base = __dirname;
global.prattle = require('./app/prattle')(app)


// Quit when all windows are closed.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});

app.on('ready', function () {

	var mainWindow = prattle.createWindow({
		width: 800,
		height: 600,
		title: 'Prattlebox',
		'web-preferences': {
			'allow-displaying-insecure-content': true,
			'java': false,
			'webgl': false
		}
	});

	// create ipc events ONLY CALL THIS ONCE
	prattle.createIpcBindings();

	//load login page
	mainWindow.loadUrl(`file://${__dirname}/app/render/login/index.html`);

});
