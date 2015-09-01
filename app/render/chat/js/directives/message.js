chat.directive('prattleMessage', function() {
  return {
    restrict: 'E',
    scope: {
      nick: '=', // String
      self: '=', // Bool
      type: '=', // String
      text: '='  // String
    },
    // __dirname is ./app/render/pages/
    template: `
      <li class="{{type}}">
        <span class="nick-{{type}} self-{{self}}">{{nick}}</span>
        <span class="message-text">{{text}}</span>
      </li>
    `
  };
});
