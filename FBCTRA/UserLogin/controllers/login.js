angular.module('FBCApp')
  .controller('LoginController', ['$scope', '$state', '$window', '$filter', 'AuthenticationFactory', 'localStore', 'configurationService', 'appConstants', 'FlashService',
	function ($scope, $state, $window, $filter, AuthenticationFactory, localStore, configurationService, appConstants, FlashService) {
	    'use strict';

	    $scope.states = appConstants.STATES;
	    $scope.selectedState = $filter('filter')($scope.states, { 'id': 'TX' })[0];

	    $scope.navigateToLogin = function () {
	        $state.go('login');
	    };

	    $scope.login = function () {
	        $scope.dataLoading = true;
	        AuthenticationFactory.login($scope.noticeNumber, $scope.licensePlate, $scope.selectedState.id, function (response) {
	            if (response) {
	                AuthenticationFactory.setCredentials(response.AccountGuid, response.SessionId);
	                $state.go('notices');
	            } else {
	                response.Message ? FlashService.Error(response.Message) : FlashService.Error("Invoice/License Plate/State are invalid.");
	                $scope.dataLoading = false;
	            }
	        });
	    };

	    $scope.openUrlInTab = function (url) {
	        $window.open(url, '_blank');
	    };

	    (function initController() {
	        AuthenticationFactory.clearCredentials();
	        localStore.reset();
	    })();
	}
  ]);