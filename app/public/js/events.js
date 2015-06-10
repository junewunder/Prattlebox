'use strict';
var ipc = require('ipc');
var $ = require('../lib/jquery-1.11.3.min.js');

module.exports = function () {
  var ipc = require('ipc');

  $('#login-form').on('submit', function (e) {
    e.preventDefault();
    // console.log('login submitted');
    // console.log(loginData);
    ipc.send('try-connect', {
      hostAddr: $('#host-address').val(),
      realName: $('#real-name').val(),
      nickName: $('#nick-name').val(),
      nickPass: $('#nick-pass').val()
    });
  });
};
