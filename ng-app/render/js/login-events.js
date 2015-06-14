'use strict';
var ipc = require('ipc'); //inter protocol communicator
var $ = require('../lib/jquery-1.11.3.min.js');
var remote = require('remote');

module.exports = function () {
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;

  $('#login-form').on('submit', function (e) {
    e.preventDefault();

    ipc.send('try-connect', {
      hostAddr: $('#host-address').val(),
      realName: $('#real-name').val(),
      nickName: $('#nick-name').val(),
      nickPass: $('#nick-pass').val()
    });
  });

  ipc.on('connect-ready', function () {
    mainWindow.loadUrl(`file://${__dirname}/../pages/chat.html`);
  });
};
