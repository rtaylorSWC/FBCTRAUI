angular.module('GetTagModule', [])
  .controller('GetTagController', ['$scope', '$state', 'messageBus',
	function ($scope, $state, messageBus) {
	    'use strict';

	    $scope.tabs = [{
	        route: 'recieveNotice',
	        titleId: 'LABEL_INFO_RECIEVE_NOTICE',
	        contentId: 'CONTENT_RECIEVE_NOTICE'
	    }];

	    $scope.isActive = function (viewRoute) {
	        //return $state.current.name.indexOf(viewRoute) >= 0;
	        return false;
	    };

	    $scope.open = function (tab) {
	        messageBus.publish('itemSelected', tab);
	    };
	}
  ]);