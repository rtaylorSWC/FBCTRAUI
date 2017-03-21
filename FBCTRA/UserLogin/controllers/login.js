angular.module('UserLoginApp')
  .controller('LoginController', ['$scope', '$location', '$window', 'AuthenticationFactory', 'localStore', 'configurationService', 'FlashService',
	function ($scope, $location, $window, AuthenticationFactory, localStore, configurationService, FlashService) {
	    'use strict';

	    $scope.navigateToLogin = function () {
	        $state.go('login');
	    };

	    $scope.login = function () {
	        $scope.dataLoading = true;
	        AuthenticationFactory.login($scope.invoice, $scope.licensePlate, function (response) {
	            if (response) {
	                AuthenticationFactory.setCredentials($scope.invoice, $scope.licensePlate);
	                $window.location.href = configurationService.getBaseUrl() + '/fbctra/#!/summary';
	            } else {
	                FlashService.Error("Invoice/License Plate are invalid.");
	                $scope.dataLoading = false;
	                //toDo: remove after service in place
	                $window.location.href = configurationService.getBaseUrl() + '/fbctra/#!/summary';
	            }
	        });
	    };

	    (function initController() {
	        AuthenticationFactory.clearCredentials();
	        localStore.reset();
	    })();
	}
  ]);