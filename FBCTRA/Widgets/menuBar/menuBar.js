angular.module('MenuBarModule', [])
  .controller('MenuBarController', ['$scope', '$state', '$window', '$translate', 'localStore', 'messageBus',
	function ($scope, $state, $window, $translate, localStore, messageBus) {
	    'use strict';

	    $scope.langKey = 'en';

	    $scope.changeLanguage = function (langKey) {
	        $translate.use(langKey);
	        $scope.langKey = langKey;
	    };

	    $scope.openHelpDeskModal = function () {
	        var metaData = [];
	        metaData.titleId = 'LINK_HELP_TITLE';
	        metaData.templateUrl = 'Widgets/helpdesk/helpdesk.html';
	        messageBus.publish('openHelpDesk', metaData);
	    };

	    $scope.logout = function () {
	        localStore.reset();
	        $state.go("login");
	    };

	    $scope.hideLogout = $state.current.name.indexOf('login') >= 0;

	}
  ]);