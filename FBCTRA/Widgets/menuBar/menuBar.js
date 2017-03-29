angular.module('MenuBarModule', [])
  .controller('MenuBarController', ['$scope', '$state', '$translate', 'localStore',
	function ($scope, $state, $translate, localStore) {
	    'use strict';

	    $scope.langKey = 'en';

	    $scope.changeLanguage = function (langKey) {
	        $translate.use(langKey);
	        $scope.langKey = langKey;
	    };

	    $scope.logout = function () {
	        localStore.reset();
	        $state.go("login");
	    };

	    $scope.hideLogout = $state.current.name.indexOf('login') >= 0;

	}
  ]);