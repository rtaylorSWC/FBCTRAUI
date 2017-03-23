angular.module('FBCApp')
  .controller('TabBarController', ['$scope', '$state', 
	function ($scope, $state) {
	    'use strict';

	    $scope.tabs = [{
	        route: 'notices',
	        titleId: 'TAB_NOTICES'
	    }];

	    $scope.isActive = function (viewRoute) {
	        return $state.current.name.indexOf(viewRoute) >= 0;
	    };

	    $scope.onTabSelected = function (tab) {
	        $state.go(tab.route);
	    };
	}
  ]);