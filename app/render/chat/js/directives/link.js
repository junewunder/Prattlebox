angular
  .module('chat')
  .directive('prattleLink', PrattleLink);

function PrattleLink() {
  return {
    restrict: 'E',
    scope: {
      href: '=',    // String
      openLink: '&' // Function
    },
    template: `
      <span class="link" ng-click="open">{{href}}</span>
    `
  };
}
