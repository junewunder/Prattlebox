'use strict';
var $ = require('../lib/jquery-1.11.3.min.js');

module.exports = {
  annouce: function (text) {
    $('#messages').append(
      $('<li>')
        .text(text)
        .class('annoucment')
    );
  },
  message: function (text) {
    $('#messages').append(
      $('<li>')
        .text(text)
        .class('message')
    );
  }
};
