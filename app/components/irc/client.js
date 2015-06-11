'use strict';
var irc = require('irc');

module.exports = function (clientData) {
  return new irc.Client(clientData.hostAddr, clientData.nickName, {
    channels: [],
    port: 6667
  });
};
