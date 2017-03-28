angular.module('FBCApp')
  .controller('LoginController', ['$scope', '$state', '$window', 'AuthenticationFactory', 'localStore', 'configurationService', 'FlashService', 'TranslationService',
	function ($scope, $state, $window, AuthenticationFactory, localStore, configurationService, FlashService, TranslationService) {
	    'use strict';

	    $scope.navigateToLogin = function () {
	        $state.go('login');
	    };

	    $scope.login = function () {
	        $scope.dataLoading = true;
	        AuthenticationFactory.login($scope.noticeNumber, $scope.licensePlate, "TX", function (response) {
	            if (response) {
	                AuthenticationFactory.setCredentials(response.AccountGuid, response.SessionId);
	                $state.go('notices');
	            } else {
	                response.Message ? FlashService.Error(response.Message) : FlashService.Error("Invoice/License Plate are invalid.");
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