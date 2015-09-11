angular
  .module('chat')
  .directive('prattleMessage', PrattleMessage);

function PrattleMessage () {
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
        <prattle-username
          nick={{nick}}
          pmUser="">
        </prattle-username>
      </li>
    `
  };
}
