angular.module('MenuBarModule', [])
  .controller('MenuBarController', ['$scope', '$state', '$translate', 'messageBus', 'localStore',
	function ($scope, $state, $translate, messageBus, localStore) {
	    'use strict';

	    $scope.langKey = 'en';

	    $scope.changeLanguage = function (langKey) {
	        $translate.use(langKey);
	        $scope.langKey = langKey;
	    };

	    $scope.openHelpModal = function (url) {
	        var help = {};
	        help.titleId = "FBCTRA Help Portal";
	        help.contentId = url;
	        help.showIFrame = true;
	        messageBus.publish('helpSelected', help);
	    };

	    $scope.logout = function () {
	        localStore.reset();
	        $state.go("login");
	    };

	    $scope.hideLogout = $state.current.name.indexOf('login') >= 0;

	}
  ]);