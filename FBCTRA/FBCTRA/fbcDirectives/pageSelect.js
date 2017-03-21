angular.module('FBCApp')
    .directive('pageSelect', function () {
    return {
        restrict: 'E',
        template: '<input type="text" ng-model="inputPage" ng-change="selectPage(inputPage)">',
        link: function(scope, element, attrs) {
            scope.$watch('currentPage', function(c) {
                scope.inputPage = c;
            });
        }
    }
});