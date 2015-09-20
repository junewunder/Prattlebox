angular
  .module('chat')
  .directive('prUsername', prUsername);

function prUsername() {
  return {
    restrict: 'E',
    scope: false,
    template: `
      <span
        class="nick-{{message.type}} self-{{message.self}}"
        ng-click="chat.joinChannel(message.nick)">{{message.nick}}</span>
    `
  };
}
