module.exports = function (chat) {
  var text = chat.active.currentMessage;

  for (var commandName in commands) {
    // iterate through the commands and see if their regex matches the text of the message
    var command = commands[commandName];
    if (text.match(command.match))
      command.func(chat, chat.client, text);
  }
};

var commands = {

  /*
   * PARSING COMMAND ARGUMENTS WITH REGEX
   * example: `var args = text.match(/^\/msg\s+([\w\-]+)\s+(.*)$/);`
   * breakdown:
   * 1. `^\/msg\s+` replace `msg` with the command name
   * 2. `([\w\-]+)` will capture any arguments
   * 3. `\s+(.*)$` will capture with rest of the text
   */

  'me': {
    match: /^\/me\b.*/,
    func: function(chat, client, text) {
      var finalMsg = text.slice(4, text.length);

      client.action(chat.active.name, finalMsg);
      chat.action(chat.active.name, client.nick, finalMsg);
    }
  },
  'help': {
    match: /^\/help\b.*/,
    func: function(chat, client, text) {
      chat.announce(chat.active.name, 'help', ' error... no help 4 u kek 😎');
    }
  },
  'join': {
    match: /^\/join\b.*/,
    func: function(chat, client, text) {
      var args = text.match(/^\/join\s+([\w\-#@]+)\s*.*$/);
      var channelName = args[1];

      chat.joinChannel(channelName);
    }
  },
  'leave': {
    match: /^\/leave\b.*/,
    func: function(chat, client, text) {
      var args = text.match(/^\/leave\s+([\w\-#@]+)\s*.*$/);
      var channelName = args[1];

      chat.leaveChannel(channelName);
    }
  },
  'msg': {
    match: /^\/msg\b.*/,
    func: function(chat, client, text) {
      var args = text.match(/^\/msg\s+([\w\-]+)\s+(.*)$/);
      var nick = args[1];
      var string = args[2];

      client.say(nick, string);
      chat.joinChannel(nick);
      chat.message(nick, client.nick, string);
    }
  },
  'topic': {
    match: /^\/topic\b.*/,
    func: function(chat, client, text) {
      var args = text.match(/^\/topic\s+(.*)$/);
      var topic = args[1];

      client.send('TOPIC', chat.active.name, topic);
    }
  },
  'part': {
    match: /^\/part\b.*/,
    func: function(chat, client, text) {
      var args = text.match(/^\/leave\s+([\w\-#@]+)\s*.*$/);
      var channelName = args[1];

      chat.leaveChannel(channelName);
    }
  },
  'ping': {
    match: /^\/ping\b.*/,
    func: function(chat, client, text) {
      chat.announce(chat.active.name, 'ping', ' 1.337ms 🚀 SOOPER FAST!');
    }
  },
  'ignore': {
    match: /^\/ignore\b.*/,
    func: function(chat, client, text) {
      chat.announce(chat.active.name, 'ignore', ' why would you want to do that???? 😱');
    }
  },
  'whois': {
    match: /^\/whois\b.*/,
    func: function(chat, client, text) {
      var args = text.match(/^\/leave\s+([\w\-#@]+)\s*.*$/);
    }
  },
  '': {
    match: / /,
    func: function(chat, client, text) {

    }
  },
};
