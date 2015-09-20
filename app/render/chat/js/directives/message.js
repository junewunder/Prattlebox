angular
  .module('chat')
  .directive('prMessage', prMessage);

function prMessage () {
  return {
    restrict: 'E',
    scope: false,
    template: `
      <li class="{{message.type}}">
        <!-- <span class="nick-{{message.type}} self-{{message.self}}">{{message.nick}}</span> -->
        <pr-username></pr-username>
        <span class="message-text">{{message.text}}</span>
      </li>
    `
  };
}
