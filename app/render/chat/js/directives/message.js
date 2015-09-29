angular
  .module('chat')
  .directive('prMessage', [prMessage]);

function prMessage () {
  return {
    restrict: 'E',
    scope: false,
    template: `
      <li class="{{message.type}}">
        <pr-username></pr-username>
        <span class="message-text" ng-bind-html="message.text | sanitize"></span>
      </li>
    `
  };
}

// {{message.text}}
