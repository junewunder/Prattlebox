'use strict';

if (process.type == 'renderer'){
  var PrattleRenderer = require('./renderer.js');
  module.exports = new PrattleRenderer();
}
else if (process.type == 'browser'){
  var PrattleBrowser = require('./browser.js');
  module.exports = (app) => new PrattleBrowser(app);
}
