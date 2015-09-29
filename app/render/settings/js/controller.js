angular
  .module('SettingsApp', [])
  .controller('SettingsController', SettingsController);

function SettingsController ($scope) {
  var settings = this;
  settings.showAdvanced = false;
  settings.toggleAdvanced = toggleAdvanced;
  settings.showPassword = false;

  function toggleAdvanced() {
    settings.showAdvanced = !settings.showAdvanced;
  }

  function saveSettings() {
    prattle.writeSetting('defaultChannels', settings.defaultChannels);
    prattle.writeSetting('friendList', settings.friendList);
    prattle.writeSetting('port', settings.port);
    prattle.writeSetting('sounds', settings.sounds);
    prattle.writeSetting('loginDetails', {
      hostAddr: settings.hostAddr,
      realName: settings.realName,
      nickName: settings.nickName,
      nickPass: settings.nickPass
    });
  }

  prattle.readSetting('defaultChannels').then((value) => {
    settings.defaultChannels = value;
    $scope.$apply();
  });

  prattle.readSetting('friendList').then((value) => {
    settings.friendList = value;
    $scope.$apply();
  });

  prattle.readSetting('port').then((value) => {
    settings.port = value;
    $scope.$apply();
  });

  prattle.readSetting('loginDetails').then((details) => {
    settings.hostAddr = details.hostAddr;
    settings.realName = details.realName;
    settings.nickName = details.nickName;
    settings.nickPass = details.nickPass;
    $scope.$apply();
  });

  prattle.readSetting('sounds').then((value) => {
    settings.sounds = value;
    $scope.$apply();
  });
}
