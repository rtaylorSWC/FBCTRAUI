angular.module('UserLoginApp')
  .controller('LoginController', ['$scope', '$location', '$window', 'AuthenticationFactory', 'localStore', 'configurationService', 'FlashService', 'TranslationService',
	function ($scope, $location, $window, AuthenticationFactory, localStore, configurationService, FlashService, TranslationService) {
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

	    //$scope.getTranslationData = function (lang) {
	    //    TranslationService.getTranslationData(lang, function (response) {
	    //        //if (response.Success) {
	    //        if (response) {
	    //            localStore.setTranslatedData(response);
	    //        } else {
	    //            FlashService.Error("Unable to get tranlation data.");
	    //        }
	    //    });
	    //};

	    (function initController() {
	        AuthenticationFactory.clearCredentials();
	        localStore.reset();
	        //$scope.getTranslationData('en');
	    })();
	}
  ]);