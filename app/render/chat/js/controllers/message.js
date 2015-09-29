'use strict';

module.exports = class Message {
  constructor (isSelf, type, nick, text, originalText) {
    this.self = isSelf; // Bool - the css class the nick will be given = either 'self-true' or 'self-false'
    this.type = type;   // String - the css class the message will be given
    this.nick = nick;   // String - nickname of the sender
    this.text = text;   // String - text in the message
    this.original = text; // original text - this hopefully won't be necessary eventually
  }
};
