angular
  .module('chat')
  .directive('prattleUsername', PrattleUsername);

function PrattleUsername() {
  return {
    restrict: 'E',
    scope: {
      user:   '=', // User object
      pmUser: '&', // Function
    },
    template: `
      <span
        class="nick-{{type}}
        self-{{self}}"
        ng-click="pmUser(nick)">
        {{nick}}
      </span>
    `
  };
}
