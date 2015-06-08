'use strict';
var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.
var Menu = require('menu');
var MenuItem = require('menu-item');

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
		title: 'irc chat' });

	mainWindow.on('closed', function () {
		mainWindow = null;
	});

	mainWindow.loadUrl('file://' + __dirname + '/app/pages/login.html');

	// EVERYTHING BELOW THIS COMMENT IS JUST MENU ITEMS
	// DON'T BOTHER WITH THINGS BELOW THIS COMMENT
	// Example of menu from official sample
	// https://github.com/atom/electron/blob/master/atom/browser/default_app/default_app.js
	var template;
	if (process.platform == 'darwin') {
		template = [{
			label: 'Electron',
			submenu: [{
				label: 'About Electron',
				selector: 'orderFrontStandardAboutPanel:'
			}, {
				type: 'separator'
			}, {
				label: 'Services',
				submenu: []
			}, {
				type: 'separator'
			}, {
				label: 'Hide Electron',
				accelerator: 'Command+H',
				selector: 'hide:'
			}, {
				label: 'Hide Others',
				accelerator: 'Command+Shift+H',
				selector: 'hideOtherApplications:'
			}, {
				label: 'Show All',
				selector: 'unhideAllApplications:'
			}, {
				type: 'separator'
			}, {
				label: 'Quit',
				accelerator: 'Command+Q',
				click: function click() {
					app.quit();
				}
			}]
		}, {
			label: 'Edit',
			submenu: [{
				label: 'Undo',
				accelerator: 'Command+Z',
				selector: 'undo:'
			}, {
				label: 'Redo',
				accelerator: 'Shift+Command+Z',
				selector: 'redo:'
			}, {
				type: 'separator'
			}, {
				label: 'Cut',
				accelerator: 'Command+X',
				selector: 'cut:'
			}, {
				label: 'Copy',
				accelerator: 'Command+C',
				selector: 'copy:'
			}, {
				label: 'Paste',
				accelerator: 'Command+V',
				selector: 'paste:'
			}, {
				label: 'Select All',
				accelerator: 'Command+A',
				selector: 'selectAll:'
			}]
		}, {
			label: 'View',
			submenu: [{
				label: 'Reload',
				accelerator: 'Command+R',
				click: function click() {
					mainWindow.restart();
				}
			}, {
				label: 'Toggle Full Screen',
				accelerator: 'Ctrl+Command+F',
				click: function click() {
					mainWindow.setFullScreen(!mainWindow.isFullScreen());
				}
			}, {
				label: 'Toggle Developer Tools',
				accelerator: 'Alt+Command+I',
				click: function click() {
					mainWindow.toggleDevTools();
				}
			}]
		}, {
			label: 'Window',
			submenu: [{
				label: 'Minimize',
				accelerator: 'Command+M',
				selector: 'performMiniaturize:'
			}, {
				label: 'Close',
				accelerator: 'Command+W',
				selector: 'performClose:'
			}, {
				type: 'separator'
			}, {
				label: 'Bring All to Front',
				selector: 'arrangeInFront:'
			}]
		}, {
			label: 'Help',
			submenu: [{
				label: 'Learn More',
				click: function click() {
					require('shell').openExternal('http://electron.atom.io');
				}
			}, {
				label: 'Documentation',
				click: function click() {
					require('shell').openExternal('https://github.com/atom/electron/tree/master/docs#readme');
				}
			}, {
				label: 'Community Discussions',
				click: function click() {
					require('shell').openExternal('https://discuss.atom.io/c/electron');
				}
			}, {
				label: 'Search Issues',
				click: function click() {
					require('shell').openExternal('https://github.com/atom/electron/issues');
				}
			}]
		}];

		menu = Menu.buildFromTemplate(template);
		Menu.setApplicationMenu(menu);
	} else {
		template = [{
			label: '&File',
			submenu: [{
				label: '&Open',
				accelerator: 'Ctrl+O' }, {
				label: '&Close',
				accelerator: 'Ctrl+W',
				click: function click() {
					mainWindow.close();
				}
			}]
		}, {
			label: '&View',
			submenu: [{
				label: '&Reload',
				accelerator: 'Ctrl+R',
				click: function click() {
					mainWindow.restart();
				}
			}, {
				label: 'Toggle &Full Screen',
				accelerator: 'F11',
				click: function click() {
					mainWindow.setFullScreen(!mainWindow.isFullScreen());
				}
			}, {
				label: 'Toggle &Developer Tools',
				accelerator: 'Alt+Ctrl+I',
				click: function click() {
					mainWindow.toggleDevTools();
				}
			}]
		}, {
			label: 'Help',
			submenu: [{
				label: 'Learn More',
				click: function click() {
					require('shell').openExternal('http://electron.atom.io');
				}
			}, {
				label: 'Documentation',
				click: function click() {
					require('shell').openExternal('https://github.com/atom/electron/tree/master/docs#readme');
				}
			}, {
				label: 'Community Discussions',
				click: function click() {
					require('shell').openExternal('https://discuss.atom.io/c/electron');
				}
			}, {
				label: 'Search Issues',
				click: function click() {
					require('shell').openExternal('https://github.com/atom/electron/issues');
				}
			}]
		}];
		var menu = Menu.buildFromTemplate(template);
		mainWindow.setMenu(menu);
	}
});

// fullscreen: false,
// frame: false,
// transparent: true