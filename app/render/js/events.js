'use strict';
var ipc = require('ipc'); //inter protocol communicator
var $ = require('../lib/jquery-1.11.3.min.js');

module.exports = function () {
  var ipc = require('ipc');

  $('#login-form').on('submit', function (e) {
    e.preventDefault();

    ipc.send('try-connect', {
      hostAddr: $('#host-address').val(),
      realName: $('#real-name').val(),
      nickName: $('#nick-name').val(),
      nickPass: $('#nick-pass').val()
    });

    ipc.on('connect', function (client) {
      console.log(client);

      // client.addListener('error', function(message) {
      //     console.log('error: ', message);
      // });
    });
  });
};
