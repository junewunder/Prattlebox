angular
  .module('chat')
  .directive('prMessage', prMessage);

function prMessage () {
  return {
    restrict: 'E',
    scope: {
      nick: '=', // String
      self: '=', // Bool
      type: '=', // String
      text: '='  // String
    },
    template: `
      <li class="{{type}}">
        <span class="nick-{{type}} self-{{self}}">{{nick}}</span>
        <span class="message-text">{{text}}</span>
        <pr-username
          nick={{nick}}
          pmUser="">
        </pr-username>
      </li>
    `
  };
}
