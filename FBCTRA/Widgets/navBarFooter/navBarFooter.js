angular.module('NavBarFooterModule', [])
  .controller('NavBarFooterController', ['$scope', 'messageBus',
	function ($scope, messageBus) {
	    'use strict';

	    var privacyPolicy = {
	        titleId: 'LABEL_PRIVACY_POLICY',
	        contentId: 'CONTENT_PRIVACY_POLICY'
	    };

	    $scope.openPrivacyPolicy = function () {
	        messageBus.publish('openPrivacyPolicy', privacyPolicy);
	    };

	}
  ]);