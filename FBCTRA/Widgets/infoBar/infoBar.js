angular.module('InfoBarModule', [])
  .controller('InfoBarController', ['$scope', '$state', 'messageBus',
	function ($scope, $state, messageBus) {
	    'use strict';

	    $scope.tabs = [{
	        route: 'recieveNotice',
	        titleId: 'LABEL_INFO_RECIEVE_NOTICE',
	        contentId: 'CONTENT_RECIEVE_NOTICE'
	    }, {
	        route: 'violation',
	        titleId: 'LABEL_INFO_VIOLATION',
	        contentId: 'CONTENT_VIOLATION'
	    }, {
	        route: 'howPay',
	        titleId: 'LABEL_INFO_PAY',
	        contentId: 'CONTENT_PAY'
	    }, {
	        route: 'ownVehicle',
	        titleId: 'LABEL_INFO_DONT_OWN_VEHICLE',
	        contentId: 'CONTENT_DONT_OWN_VEHICLE'
	}, {
	        route: 'tollTagNotice',
	        titleId: 'LABEL_INFO_TOLLTAG_NOTICE',
	        contentId: 'CONTENT_TOLLTAG_NOTICE'
	}, {
	        route: 'dontPay',
	        titleId: 'LABEL_INFO_DONT_PAY',
	        contentId: 'CONTENT_DONT_PAY'
	}, {
	        route: 'violator',
	        titleId: 'LABEL_INFO_VIOLATOR',
	        contentId: 'CONTENT_VIOLATOR'
	}, {
	        route: 'tollPlaza',
	        titleId: 'LABEL_INFO_TOLL_PLAZA',
	        contentId: 'CONTENT_TOLL_PLAZA'
	}, {
	        route: 'tollRates',
	        titleId: 'LABEL_INFO_TOLL_RATES',
	        contentId: 'CONTENT_TOLL_RATES'
	    }, {
	        route: 'cusSupportCenter',
	        titleId: 'LABEL_INFO_CUS_SUPPORT_CENTER',
	        contentId: 'CONTENT_CUS_SUPPORT_CENTER'
	    }, {
	        route: 'payInPerson',
	        titleId: 'LABEL_INFO_PAY_IN_PERSON',
	        contentId: 'CONTENT_PAY_IN_PERSON'
	    }, {
	        route: 'roadMaps',
	        titleId: 'LABEL_INFO_ROADMAPS',
	        contentId: 'CONTENT_ROADMAPS'
	    }, {
	        route: 'faqs',
	        titleId: 'LABEL_INFO_FAQS',
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