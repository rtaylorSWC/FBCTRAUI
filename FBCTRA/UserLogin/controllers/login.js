angular.module('FBCApp')
  .controller('LoginController', ['$scope', '$state', '$filter', 'messageBus', 'AuthenticationFactory', 'localStore', 'configurationService', 'appConstants', 'FlashService',
	function ($scope, $state, $filter, messageBus, AuthenticationFactory, localStore, configurationService, appConstants, FlashService) {
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

	    $scope.openHelpModal = function (url) {
	        var help = {};
	        help.titleId = "FBCTRA Help Portal";
	        help.contentId = url;
	        help.showIFrame = true;
	        messageBus.publish('helpSelected', help);
	    };

	    (function initController() {
	        AuthenticationFactory.clearCredentials();
	        localStore.reset();
	    })();
	}
  ]);