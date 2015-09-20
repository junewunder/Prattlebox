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

  popup.loadUrl(`file://${__dirname}/../render/popup/${filename}/index.html`);

  if (killOnBlur){
    popup.on('blur', function (event) {
      popup.close();
    });
  }

  ipc.on('close', function(event, args) {
    mainWindow.send(eventName, args.info);
    popup.close();
  });
};
