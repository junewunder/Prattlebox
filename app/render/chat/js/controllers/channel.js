'use strict';

module.exports = class Channel {
  constructor(name) {
    this.name = name;         // name of channel
    this.messages = [];       // the list of messages
    this.currentMessage = ''; // change back to nothing later
    this.unread = 0;          // int value of unread messages
    this.nicks = [];          // String[] - the nicknames of the users
    this.previouslySent = []; // String[] - the list of previously sent messages by the user
    this.topic = 'no topic has been set'; // String the topic for the room
    this.showNicks = false;   // Boolean - whether or not to show the user list
    this.type = (name[0] == '#') ? 'channel' : 'private';
  }
};
