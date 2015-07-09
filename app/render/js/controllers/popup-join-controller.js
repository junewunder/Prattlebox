angular.module('PopUpJoinApp', [])
.controller('PopUpJoinController', ['$scope', function($scope) {
  var ipc = require('ipc');
  var remote = require('remote');
  var popUp = remote.getCurrentWindow();

  $scope.channelName = '#jaywunder3';

  $scope.close = function() {
    popUp.close();
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
}]);
