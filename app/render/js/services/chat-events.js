//THIS WILL MOST LIKELY BE IMPLEMENTED WHEN I UNDERSTAND SERVICES AND FACTORIES

chat.service('chatEvents', function($scope) {
  this.bind = function() {
    ipc.on('client-error', function (error) {
      $scope.message($scope.active, 'error: ', error);
      console.log(error);
    });

    ipc.on('client-motd', function (motd) {
      $scope.announce(motd);
    });

    ipc.on('client-selfMessage', function (to, text) {
      $scope.message(to, client.nick, text);
    });

    ipc.on('client-message', function (nick, to, text, message) {
      $scope.message(to, nick, text);
    });

    ipc.on('client-names', function (names) {

    });

    ipc.on('client-kill', function (nick, reason, channels, message) {
      // $scope.announce();
    });

    ipc.on('client-pm', function (nick, text, message) {

    });

    ipc.on('client-kick', function () {
      // $scope.announce('You were kicked.. :(');
    });

    ipc.on('', function () {

    });
  };
});
