angular
  .module('PopUpJoinApp', [])
  .controller('PopUpJoinController', ['$scope', PopUpJoinController]);

function PopUpJoinController($scope) {
  var ipc = require('ipc');
  var remote = require('remote');
  var popup = remote.getCurrentWindow();
  var vm = this;

  vm.channelName = '';
  vm.favoriteChannels = ['#jaywunder', 'aripanda'];
  vm.channelList = ['lel', 'jackv'];
  vm.close = close;
  vm.join = join;

  function close() {
    popup.close();
  }

  function join() {
    prattle.returnValue('channel-join', {
      channelName: vm.channelName
    });
  }
}
