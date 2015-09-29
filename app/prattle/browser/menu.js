'use strict';
var Menu = require('menu');
var MenuItem = require('menu-item');

module.exports = function (app, window) {
  // Example of menu from official sample
	// https://github.com/atom/electron/blob/master/atom/browser/default_app/default_app.js
  var template;
	if (process.platform == 'darwin') {
		template = [{
			label: 'Prattlebox',
			submenu: [{
				label: 'About Prattlebox',
				selector: 'orderFrontStandardAboutPanel:'
			}, {
				type: 'separator'
			}, {
				label: 'Services',
				submenu: []
			}, {
				type: 'separator'
			}, {
				label: 'Hide Prattlebox',
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
					window.restart();
				}
			}, {
				label: 'Toggle Full Screen',
				accelerator: 'Ctrl+Command+F',
				click: function click() {
					window.setFullScreen(!window.isFullScreen());
				}
			}, {
				label: 'Toggle Developer Tools',
				accelerator: 'Alt+Command+I',
				click: function click() {
					window.toggleDevTools();
				}
			}]
		}, {
			label: 'Window',
			submenu: [{
				label: 'New',
				accelerator: 'Command+N',
        click: function click() {
          var newWindow = prattle.createNewChatWindow();
          newWindow.loadUrl(`file://${__base}/app/render/login/index.html`);
        }}, {
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
					require('shell').openExternal('https://github.com/jaywunder/Prattlebox');
				}
			}, {
				label: 'Documentation',
				click: function click() {
					require('shell').openExternal('https://github.com/jaywunder/Prattlebox/wiki');
				}
			}, {
				label: 'Search Issues',
				click: function click() {
					require('shell').openExternal('https://github.com/jaywunder/Prattlebox/issues');
				}
			}]
		}];

		menu = Menu.buildFromTemplate(template);
		Menu.setApplicationMenu(menu);
	} else {
		template = [{
			label: '&File',
			submenu: [{
				label: '&New',
				accelerator: 'Ctrl+N',
        click: function click() {
          var newWindow = prattle.createNewChatWindow();
          newWindow.loadUrl(`file://${__base}/app/render/login/index.html`);
        }}, {
				label: '&Open',
				accelerator: 'Ctrl+O' }, {
				label: '&Close',
				accelerator: 'Ctrl+W',
				click: function click() {
					window.close();
				}
			}]
		}, {
			label: '&View',
			submenu: [{
				label: '&Reload',
				accelerator: 'Ctrl+R',
				click: function click() {
					window.restart();
				}
			}, {
				label: 'Toggle &Full Screen',
				accelerator: 'F11',
				click: function click() {
					window.setFullScreen(!window.isFullScreen());
				}
			}, {
				label: 'Toggle &Developer Tools',
				accelerator: 'Alt+Ctrl+I',
				click: function click() {
					window.toggleDevTools();
				}
			}]
		}, {
			label: 'Help',
			submenu: [{
				label: 'Learn More',
				click: function click() {
					require('shell').openExternal('https://github.com/jaywunder/Prattlebox');
				}
			}, {
				label: 'Documentation',
				click: function click() {
					require('shell').openExternal('https://github.com/jaywunder/Prattlebox/wiki');
				}
			}, {
				label: 'Search Issues',
				click: function click() {
					require('shell').openExternal('https://github.com/jaywunder/Prattlebox/issues');
				}
			}]
		}];
		var menu = Menu.buildFromTemplate(template);
		window.setMenu(menu);
	}
};
