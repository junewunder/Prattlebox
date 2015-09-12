angular
  .module('chat')
  .directive('prUsername', prUsername);

function prUsername(scope, el, attr, ctrl) {
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
