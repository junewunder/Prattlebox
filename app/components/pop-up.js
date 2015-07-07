var BrowserWindow = require('browser-window');

module.exports = function(args, cb) {
  console.log(cb);
  var popUp = new BrowserWindow({
    width: 400,
    height: 200,
    // frame: false
  });

  popUp.loadUrl(`file://${__dirname}/../render/pages/${args.filename}.html`);

  popUp.on('closed', function(event) {
    cb();
  });
};
