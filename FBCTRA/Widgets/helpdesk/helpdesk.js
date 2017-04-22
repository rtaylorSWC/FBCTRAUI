﻿angular.module('HelpDeskModule', [])
  .controller('HelpDeskController', ['$scope', '$filter', 'appConstants', 'FlashService', 'Upload', 'HelpDeskService', 'localStore', 'vcRecaptchaService',
	function ($scope, $filter, appConstants, FlashService, Upload, HelpDeskService, localStore, vcRecaptchaService) {
	    'use strict';

	    $scope.categories = appConstants.CATEGORIES;
	    $scope.priorities = appConstants.PRIORITIES;
	    $scope.authUser = localStore.getCurrentUser();
	    $scope.notice = localStore.getCurrentNotice();
	    $scope.ticket = {};
	    $scope.disputingNotice = $scope.notice ? true : false;
	    $scope.disputingNotice ? ($scope.ticket.Category = $filter('filter')($scope.categories, 'Dispute Violation')[0],
        $scope.ticket.Priority = $filter('filter')($scope.priorities, 'Normal')[0],
        $scope.ticket.NoticeNumber = $scope.notice.NoticeNumber, $scope.ticket.TVNID = $scope.notice.TVNID) : null;
	    $scope.currentToken = '';
	    $scope.captchaResponse = false;
	    $scope.widgetId = null;
	    $scope.captcha = {
	        key: '6LdrGh4UAAAAAO-fepgA7i4zbwBAaUsoAbxpFe13'
	    };

	    $scope.setResponse = function (response) {
	        console.info('Response available');
	        $scope.captchaResponse = response;
	    };

	    $scope.setWidgetId = function (widgetId) {
	        console.info('Created widget ID: %s', widgetId);
	        $scope.widgetId = widgetId;
	    };

	    $scope.cbExpiration = function () {
	        console.info('Captcha expired. Resetting response object');
	        vcRecaptchaService.reload($scope.widgetId);
	        $scope.captchaResponse = false;
	    };

	    $scope.toggleFileTokens = function (token) {
	        !$scope.ticket.fileTokens ? $scope.ticket.fileTokens = [] : null;
	        var idx = $scope.ticket.fileTokens.indexOf(token);
	        (idx > -1) ? ($scope.ticket.fileTokens.splice(idx, 1), $scope.currentToken = ''): ($scope.ticket.fileTokens.push(token), $scope.currentToken = token );
	    };

	    $scope.toggleAttachments = function (uploadFile) {
	        !$scope.attachments ? $scope.attachments = [] : null;
	        var idx = $scope.attachments.indexOf(uploadFile);
	        (idx > -1) ? $scope.attachments.splice(idx, 1) : $scope.attachments.push(uploadFile);
	        localStore.setAttachments($scope.attachments);
	    };

	    $scope.submit = function () {
	        !$scope.ticket.TVNID ? $scope.ticket.TVNID = null : null;
	        //!$scope.ticket.noticeNumbers ? $scope.ticket.noticeNumbers = [] : null;

	        HelpDeskService.submit($scope.ticket, function (response) {
	            if (response) {
	                $scope.ticket = response;
	                FlashService.Success("Ticket sumbitted successfully.");
	            } else {
	                response.Message ? FlashService.Error(response.Message) : FlashService.Error("Unable to submit ticket, please try again.");
	            }
	            vcRecaptchaService.reload($scope.widgetId);
	            $scope.close();
	        });
	    };

	    $scope.uploadFiles = function (file, errFiles) {
	        if (file) {
	            $scope.fileExt = file.name.split(".").pop();
	        }
	        if ($scope.fileExt != "txt" && $scope.fileExt != "pdf" && $scope.fileExt != "png" && $scope.fileExt != "jpg") {
	            FlashService.Error("Unable to Upload Files of type - " + $scope.fileExt, false);
	            return;
	        }
	        var uploadFile = file;

	        var fd = new FormData();
	        fd.append('file', file);

	        if (file) {
	            $scope.uploadFileName = file.name.replace(/\..+$/, '');
	            HelpDeskService.uploadAttachment(fd, $scope.uploadFileName, $scope.currentToken, function (response) {
	                if (response) {
	                    $scope.toggleFileTokens(response.token);
	                    FlashService.Success($scope.uploadFileName + " - Uploaded." + response.Message, false);
	                }
	                else {
	                    FlashService.Error("Unable to Upload - " + $scope.uploadFileName + ". " + response.Message, false);
	                }
	            });
	        }
	    };
	}
  ]);