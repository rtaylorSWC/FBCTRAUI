angular.module('FBCApp')
  .controller('LoginController', ['$scope', '$state', '$window', 'AuthenticationFactory', 'localStore', 'configurationService', 'constants', 'FlashService', 'TranslationService',
	function ($scope, $state, $window, AuthenticationFactory, localStore, configurationService, constants, FlashService, TranslationService) {
	    'use strict';

	    $scope.states = constants.STATES;

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

	    (function initController() {
	        AuthenticationFactory.clearCredentials();
	        localStore.reset();
	    })();
	}
  ]);