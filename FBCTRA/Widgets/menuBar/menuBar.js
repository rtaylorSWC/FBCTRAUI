angular.module('MenuBarModule', [])
  .controller('MenuBarController', ['$scope', '$state', '$window', '$translate', 'localStore',
	function ($scope, $state, $window, $translate, localStore) {
	    'use strict';

	    $scope.langKey = 'en';

	    $scope.changeLanguage = function (langKey) {
	        $translate.use(langKey);
	        $scope.langKey = langKey;
	    };

	    $scope.openUrlInTab = function (url) {
	        $window.open(url, '_blank');
	    };

	    $scope.logout = function () {
	        localStore.reset();
	        $state.go("login");
	    };

	    $scope.hideLogout = $state.current.name.indexOf('login') >= 0;

	}
  ]);