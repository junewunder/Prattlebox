module.exports = {
  ADMIN: function(chat, message) {

  },
  AWAY: function(chat, message) {

  },
  CNOTICE: function(chat, message) {

  },
  CPRIVMSG: function(chat, message) {

  },
  CONNECT: function(chat, message) {

  },
  DIE: function(chat, message) {

  },
  ENCAP: function(chat, message) {

  },
  ERROR: function(chat, message) {

  },
  HELP: function(chat, message) {

  },
  INFO: function(chat, message) {

  },
  INVITE: function(chat, message) {

  },
  ISON: function(chat, message) {

  },
  JOIN: function (chat, message) {
    var userJoined = message.nick;
    var channelName = message.args[0];

    chat.channels[channelName].nicks.push(userJoined);
    chat.announce(channelName, userJoined, ' has joined the channel');
  },
  KICK: function(chat, message) {

  },
  KILL: function(chat, message) {

  },
  KNOCK: function(chat, message) {

  },
  LINKS: function(chat, message) {

  },
  LIST: function(chat, message) {

  },
  LUSERS: function(chat, message) {

  },
  MODE: function(chat, message) {

  },
  MOTD: function(chat, message) {

  },
  NAMES: function(chat, message) {

  },
  NAMESX: function(chat, message) {

  },
  NICK: function(chat, message) {

  },
  NOTICE: function (chat, message){
    var channelName = message.args[0];
    var noticeText = message.args[1];

    if(channelName === chat.client.nick) channelName = chat.active.name;

    chat.announce(channelName, channelName, ' ' + noticeText);
  },
  OPER: function(chat, message) {

  },
  PART: function (chat, message) {
    var userLeft = message.nick;
    var channelName = message.args[0];
    var nicks = chat.channels[channelName].nicks;

    chat.announce(channelName, userLeft, ' has left the channel');
  },
  PASS: function(chat, message) {

  },
  PING: function(chat, message) {

  },
  PONG: function(chat, message) {

  },
  PRIVMSG: function(chat, message) {
    // can't figure out how to handle actions quite yet, so I'm just going to
    // not do anything
    // if (message.args[1].match(/ACTION\b.*/))
    //   chat.action(message.args[0], message.nick, message.args[1].slice(7, message.args[1].length));
    // else
    //   chat.message(message.args[0], message.nick, message.args[1]);
  },
  QUIT: function (chat, message){
    var userLeft = message.nick;
    var reason = message.args[0];

    for (var channel in chat.channels) {
      if (channel.nickList.indexOf(userLeft) > 1) {
        chat.announce(channel.name, userLeft, reason);
      }
    }
  },
  REHASH: function(chat, message) {

  },
  RESTART: function(chat, message) {

  },
  RULES: function(chat, message) {

  },
  SERVER: function(chat, message) {

  },
  SERVICE: function(chat, message) {

  },
  SERVLIST: function(chat, message) {

  },
  SQUERY: function(chat, message) {

  },
  SQUIT: function(chat, message) {

  },
  SETNAME: function(chat, message) {

  },
  SILENCE: function(chat, message) {

  },
  STATS: function(chat, message) {

  },
  SUMMON: function(chat, message) {

  },
  TIME: function(chat, message) {

  },
  TOPIC: function (chat, message) {
    var channelName = message.args[0];
    var topic = message.args[1];
    var nick = message.nick;

    chat.announce(channelName, nick, ' has set the topic to: "' + topic + '"');
    chat.channels[channelName].topic = topic;
    chat.$apply();
  },
  TRACE: function(chat, message) {

  },
  UHNAMES: function(chat, message) {

  },
  USER: function(chat, message) {

  },
  USERHOST: function(chat, message) {

  },
  USERIP: function(chat, message) {

  },
  USERS: function(chat, message) {

  },
  VERSION: function(chat, message) {

  },
  WALLOPS: function(chat, message) {

  },
  WATCH: function(chat, message) {

  },
  WHO: function(chat, message) {

  },
  WHOIS: function(chat, message) {

  },
  WHOWAS: function(chat, message) {

  },

  rpl_topic: function(chat, message) {
    var channelName = message.args[1];
    var topic = message.args[2];

    chat.channels[channelName].topic = topic;
    try {
      chat.$apply();
    } catch (e) {  }
  },
  rpl_namreply: function(chat, message) {
    var channelName = message.args[2];
    var nickList = message.args[3].split(' ');

    chat.channels[channelName].nicks = nickList;
  },
  rpl_away: function(chat,message) {
    // when a user is away
  },
  err_nosuchchannel: function(chat, message) {
    chat.announce(chat.current.name, 'info', `${message.args[2]} (${message.args[1]})`);
  },
  err_nosuchnick: function(chat, message) {
    chat.announce(chat.current.name, 'info', `${message.args[2]} (${message.args[1]})`);
  },
  err_chanoprivsneeded: function (chat, message) {
    var channelName = message.args[1];
    var text = message.args[2];

    chat.announce(channelName, channelName, text);
  },
  err_cannotsendtochan: function (chat, message) {
    var channelName = message.args[1];
    var text = message.args[2];

    chat.announce(channelName, channelName, text);
  }
};
