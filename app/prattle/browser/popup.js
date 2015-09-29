var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var fs = require('fs');

module.exports = function(args, mainWindow) {
  var width      = args.width || 400;
  var height     = args.height || 200;
  var frame      = args.frame || false;
  var killOnBlur = args.killOnBlur || false;
  var eventName  = args.eventName || '';
  var filename   = args.filename;

  var popup = new BrowserWindow({
    width,
    height,
    frame,
  });

  prattle.loadPage(filename, popup);

  if (killOnBlur){
    popup.on('blur', (event) => {
      popup.close();
    });
  }

  popup.on('close', (event) => {
    console.log('closed');
  });

  ipc.once('popup-return', function (event, eventName, args) {
    mainWindow.send(eventName, args);
    popup.close();
  });
};
