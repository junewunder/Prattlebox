'use strict';

module.exports = class FakeClient {
  constructor (hostAddr, nickName, args) {
    this.hostAddr = hostAddr;
    this.nick = nickName;
    this.port = args.port;
    this.say = () => {};
    this.join = () => {};
    this.part = () => {};
  }
};
