angular
  .module('PopupJoinApp', [])
  .controller('PopupJoinController', ['$scope', PopupJoinController]);

function PopupJoinController($scope) {
  var ipc = require('ipc');
  var remote = require('remote');
  var popup = remote.getCurrentWindow();
  var mainWindow = remote.getCurrentWindow();
  var client = mainWindow.client;

  $scope.channelName = '';
  $scope.channellist = [];
  $scope.channellistRefreshing = false;

  ipc.on('client-channellist', function(channellist) {
    $scope.channellist = channellist;
    $scope.$apply();
  });

  $scope.refreshChannelList = function() {
    client.list();
    console.log('heyy');
    $scope.channellistRefreshing = true;
  };

  $scope.close = function() {
    popup.close();
  };

  $scope.join = function() {
    // send the event to the ipc NOT the BrowserWindow
    ipc.send('close', {
      eventName: 'channel-join',
      info: {
        channelName: $scope.channelName
      }
    });
  };
}
