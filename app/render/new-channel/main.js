angular.module('PopUpJoinApp', [])
.controller('PopUpJoinController', ['$scope', function($scope) {
  var ipc = require('ipc');
  var remote = require('remote');
  var popup = remote.getCurrentWindow();

  $scope.channelName = '';

  $scope.close = function() {
    popup.close();
  };

  $scope.join = function() {
    prattle.returnValue('channel-join', {
      channelName: $scope.channelName
    });
  };
}]);
