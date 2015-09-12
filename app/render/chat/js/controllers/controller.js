'use strict';

angular // jshint ignore:line
  .module('chat')
  .controller('ChatController', ChatController);

// new Notification("dude...", {body:"Woahhhhhhh"}); // jshint ignore:line

function ChatController($scope) {
  var $ = require('../../static/lib/jquery.min.js');
  var ipc = require('ipc');
  var remote = require('remote');
  var shell = require('shell');
  var Channel = require('./js/controllers/channel.js');
  var Message = require('./js/controllers/message.js');
  // var prattle = require('../../components/prattle');

  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;
  var chat = this;

  prattle.readSetting('foo').then((value) => {
    console.log(value);
  });

  // prattle.saveSetting('notificationSounds', true);

  chat.client = client; // reference to client
  chat.channels = {}; // { name : { channel-vars } }
  chat.active = {}; // pointer to the active channel
  chat.foo = 'foo';
  chat.notificationSounds = false; //prattle.readSetting('notificationSounds');
  chat.joinChannel = joinChannel;
  chat.leaveChannel = leaveChannel;
  chat.makeActive = makeActive;
  chat.submitMessage = submitMessage;
  chat.message = message;
  chat.action = action;
  chat.announce = announce;
  chat.pushMessage = pushMessage;
  chat.toggleNicks = toggleNicks;
  chat.popUp = popUp;
  chat.openLink = openLink;

  function joinChannel(name) {
    if (!chat.channels[name]) { // check if the channel exists
      if (name[0] == '#')
        client.join(name); // have the client join the channel
      chat.channels[name] = new Channel(name);
      makeActive(name); // make the channel active
    }
  }

  function leaveChannel(name) {
    // client leaves the channel
    client.part(name);
    // delete the channel from the channel object
    delete chat.channels[name];
  }

  function makeActive(name) {
    // assign "active" as a reference to the current channel
    chat.active.active = false;
    chat.active = chat.channels[name];
    chat.active.active = true;
    chat.active.unread = 0;
  }

  var clientCommandHandler = require('./js/controllers/client-command-handler.js');

  function submitMessage() {
    var currentChannel = chat.active.name;
    if (chat.active.currentMessage !== '') { // prevent sending empty strings
      if (chat.active.currentMessage[0] == '/')
        // if the text is a command, call the command handler
        clientCommandHandler(chat);

      else {
        // send message to server
        client.say('' + chat.active.name, '' + chat.active.currentMessage);
        chat.message(chat.active.name, client.nick, chat.active.currentMessage);
      }
      chat.channels[currentChannel].currentMessage = ''; // clear the current message
    }
  }

  function message(name, nick, text) {
    // push a message to the active channel's messages array
    chat.pushMessage(name, 'message', nick, text);
  }

  function action(name, nick, text) {
    // push an action to the active channel's messages array
    chat.pushMessage(name, 'action', nick, text);
  }

  function announce(name, nick, text) {
    // push an announcement to the active channel's messages array
    chat.pushMessage(name, 'announcement', nick, text);
  }

  function pushMessage(name, type, nick, text) {
    var isSelf = nick === client.nick;

    if (!chat.channels[name]) chat.joinChannel(name);
    if (name !== chat.active.name) chat.channels[name].unread++;

    chat.channels[name].messages.push(new Message(isSelf, type, nick, text));

    $('.messages-container').animate({
      scrollTop: $('.messages-container').get(0).scrollHeight + 100
    }, 200);
  }

  function toggleNicks(name) {
    // toggle the boolean
    chat.channels[name].showNicks = !chat.channels[name].showNicks;
  }

  function popUp() {
    // will open /render/popup/{filename}/index.html
    ipc.send('pop-up', {
      filename: 'new-channel'
    });
  }

  function openLink(href) {
    if (href.indexOf('http://') !== 0 || href.indexOf('https://') !== 0)
      href = 'https://' + href;
    shell.openExternal(href);
  }

  chat.joinChannel('#jaywunder');

  for (var channelName in client.channels)
    if (!chat.channels[channelName])
      chat.joinChannel(channelName);

    // pop-ups
  ipc.on('channel-join', function(args) {
    chat.joinChannel(args.channelName);
    $scope.$apply();
  });

  // PRIVMSG is hard, so let's not do it right now
  ipc.on('client-message', function(nick, to, text, message) {
    chat.message(to, nick, text);
  });

  ipc.on('client-pm', function(nick, text, message) {
    chat.message(nick, nick, text);
  });

  ipc.on('client-action', function(from, to, text, message) {
    chat.action(to, from, text);
  });

  // handle all the commands from the server
  var channelCommandHandler = require('./js/controllers/channel-command-handler.js');
  ipc.on('client-raw', function(message) {
    // everything commented is for bug testing
    // console.log('--');
    // console.log("command: " + message.command);
    // console.log("args: " + message.args);
    // console.log(message);
    try {
      channelCommandHandler[message.command](chat, message);
    } catch (err) {
      // chat.message(chat.current.name, 'error', message.command + ' needs taking care of');
    }
  });
}
