angular.module('FBCApp')
  .controller('TabBarController', ['$scope', '$state', 
	function ($scope, $state) {
	    'use strict';

	    $scope.tabs = [{
	        route: 'summary',
	        titleId: 'TAB_SUMMARY'
	    }, {
	        route: 'invoice',
	        titleId: 'TAB_INVOICE'
	    }, {
	        route: 'reporting',
	        titleId: 'TAB_REPORTING'
	    }];

	    $scope.isActive = function (viewRoute) {
	        return $state.current.name.indexOf(viewRoute) >= 0;
	    };

	    $scope.onTabSelected = function (tab) {
	        $state.go(tab.route);
	    };
	}
  ]);