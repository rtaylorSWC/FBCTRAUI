angular.module('FBCApp')
  .controller('LoginController', ['$scope', '$state', '$window', 'AuthenticationFactory', 'localStore', 'configurationService', 'FlashService', 'TranslationService',
	function ($scope, $state, $window, AuthenticationFactory, localStore, configurationService, FlashService, TranslationService) {
	    'use strict';

	    $scope.navigateToLogin = function () {
	        $state.go('login');
	    };

	    $scope.login = function () {
	        $scope.dataLoading = true;
	        AuthenticationFactory.login($scope.invoice, $scope.licensePlate, function (response) {
	            if (response) {
	                AuthenticationFactory.setCredentials($scope.invoice, $scope.licensePlate);
	                $state.go('notices');
	            } else {
	                FlashService.Error("Invoice/License Plate are invalid.");
	                $scope.dataLoading = false;
	                //toDo: remove after service in place
	                $state.go('notices');
	            }
	        });
	    };

	    (function initController() {
	        AuthenticationFactory.clearCredentials();
	        localStore.reset();
	    })();
	}
  ]);