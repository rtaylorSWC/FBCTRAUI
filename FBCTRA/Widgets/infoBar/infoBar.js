angular.module('InfoBarModule', [])
  .controller('InfoBarController', ['$scope', '$state', 'messageBus',
	function ($scope, $state, messageBus) {
	    'use strict';

	    $scope.tabs = [{
	        route: 'recieveNotice',
	        titleId: 'INFO_RECIEVE_NOTICE',
	        contentId: 'CONTENT_RECIEVE_NOTICE'
	    }, {
	        route: 'violation',
	        titleId: 'INFO_VIOLATION',
	        contentId: 'CONTENT_VIOLATION'
	    }, {
	        route: 'howPay',
	        titleId: 'INFO_PAY',
	        contentId: 'CONTENT_PAY'
	    }, {
	        route: 'ownVehicle',
	        titleId: 'INFO_DONT_OWN_VEHICLE',
	        contentId: 'CONTENT_DONT_OWN_VEHICLE'
	}, {
	        route: 'tollTagNotice',
	        titleId: 'INFO_TOLLTAG_NOTICE',
	        contentId: 'CONTENT_TOLLTAG_NOTICE'
	}, {
	        route: 'dontPay',
	        titleId: 'INFO_DONT_PAY',
	        contentId: 'CONTENT_DONT_PAY'
	}, {
	        route: 'violator',
	        titleId: 'INFO_VIOLATOR',
	        contentId: 'CONTENT_VIOLATOR'
	}, {
	        route: 'tollPlaza',
	        titleId: 'INFO_TOLL_PLAZA',
	        contentId: 'CONTENT_TOLL_PLAZA'
	}, {
	        route: 'tollRates',
	        titleId: 'INFO_TOLL_RATES',
	        contentId: 'CONTENT_TOLL_RATES'
	    }, {
	        route: 'cusSupportCenter',
	        titleId: 'INFO_CUS_SUPPORT_CENTER',
	        contentId: 'CONTENT_CUS_SUPPORT_CENTER'
	    }, {
	        route: 'payInPerson',
	        titleId: 'INFO_PAY_IN_PERSON',
	        contentId: 'CONTENT_PAY_IN_PERSON'
	    }, {
	        route: 'roadMaps',
	        titleId: 'INFO_ROADMAPS',
	        contentId: 'CONTENT_ROADMAPS'
	    }, {
	        route: 'faqs',
	        titleId: 'INFO_FAQS',
	        contentId: 'CONTENT_FAQS'
	    }];

	    $scope.isActive = function (viewRoute) {
	        //return $state.current.name.indexOf(viewRoute) >= 0;
	        return false;
	    };

	    $scope.open = function (tab) {
	        //$state.go(tab.route);
	        messageBus.publish('itemSelected', tab);
	    };
	}
  ]);