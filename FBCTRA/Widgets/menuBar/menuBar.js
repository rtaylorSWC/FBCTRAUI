angular.module('MenuBarModule', [])
  .controller('MenuBarController', ['$scope', '$state', '$translate',
	function ($scope, $state, $translate) {
	    'use strict';

	    $scope.langKey = 'en';

	    $scope.changeLanguage = function (langKey) {
	        $translate.use(langKey);
	        $scope.langKey = langKey;
	    };

	    $scope.logout = function () {
	        $state.go("logout");
	    };

	    $scope.hideLogout = $state.current.name.indexOf('login') >= 0;

	}
  ]);