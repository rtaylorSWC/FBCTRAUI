angular.module('GetTagModule', [])
  .controller('GetTagController', ['$scope', '$window',
	function ($scope, $window) {
	    'use strict';
	    $scope.openUrlInTab = function (url) {
	        $window.open(url, '_blank');
	    };
	}
  ]);