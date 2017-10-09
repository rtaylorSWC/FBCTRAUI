angular.module('FBCApp')
  .controller('LoginController', ['$scope', '$state', '$window', '$filter', 'AuthenticationFactory', 'localStore', 'configurationService', 'appConstants', 'FlashService', 'messageBus',
	function ($scope, $state, $window, $filter, AuthenticationFactory, localStore, configurationService, appConstants, FlashService, messageBus) {
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

	    $scope.openHelpDeskModal = function () {
	        var metaData = [];
	        metaData.titleId = 'LINK_HELP_TITLE';
	        metaData.templateUrl = 'Widgets/helpdesk/helpdesk.html';
	        messageBus.publish('openHelpDesk', metaData);
	    };

	    (function initController() {
	        AuthenticationFactory.clearCredentials();
	        localStore.reset();
	    })();
	}
  ]);