angular.module('MenuBarModule', [])
  .controller('MenuBarController', ['$scope', '$translate',
	function ($scope, $translate) {
	    'use strict';

	    $scope.langKey = 'en';

	    $scope.changeLanguage = function (langKey) {
	        $translate.use(langKey);
	        $scope.langKey = langKey;
	    };
	}
  ]);