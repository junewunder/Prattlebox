var BrowserWindow = require('browser-window');
var ipc = require('ipc');

module.exports = function(args, mainWindow) {
  var popUp = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false
  });

  popUp.loadUrl(`file://${__dirname}/../render/pages/popup-${args.filename}.html`);

  popUp.on('blur', function (event) {
    popUp.close();
  });

  ipc.on('close', function(event, args) {
    if (!args) { popUp.close(); return; }
    mainWindow.send(args.eventName, args.info);
    popUp.close();
  });
};
