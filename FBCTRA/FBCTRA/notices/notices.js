angular.module('FBCApp')
  .controller('NoticesController', ['$window', '$scope', '$filter', 'localStore', 'messageBus', 'FlashService', 'AccountService', 'NoticesService', 'VehicleService',
    function ($window, $scope, $filter, localStore, messageBus, FlashService, AccountService, NoticesService, VehicleService) {
        'use strict';

        $scope.open = function (payItem) {
            messageBus.publish('payItemSelected', payItem);
        };
        ///
        var currentUser = localStore.getCurrentUser();
        currentUser = currentUser.currentUser;
        $scope.paymentMethod = $scope.paymentTotal = false;
        //var accountGuid = localStore.getCurrentUser().currentUser.accountGuid;

        $scope.getViolationList = function () {
            AccountService.getViolationsByAccountGuid(currentUser.AccountGuid, function (response) {
                if (response) {
                    $scope.violationData = response;
                } else {
                    FlashService.Error("Unable to get Violation List.");
                }
            });
        };
        $scope.getViolationList();
        
        //$scope.violationData = {
        //    "NoOfViolations": 2,
        //    "TotalAmount": 2.2,
        //    "Violations": [
        //      {
        //          "NoticeNumber": "T371707542076",
        //          "LicensePlate": "Lp1234",
        //          "Date": "3/21/2017 3:46:06 PM -05:00",
        //          "Status": "OPEN",
        //          "Toll": "1.1000",
        //          "InitialNoticeFee": "0.0000",
        //          "TollViolationFee": "0.0000",
        //          "FinalNoticeFee": "0.0000",
        //          "NSFFee": "0.0000",
        //          "CourtFee": "0.0000",
        //          "AdminFee": "0.0000",
        //          "AmountDue": "1.1000",
        //          "TVNLetter": ""
        //      },
        //      {
        //          "NoticeNumber": "T371707542076",
        //          "LicensePlate": "Lp1234",
        //          "Date": "3/21/2017 3:56:18 PM -05:00",
        //          "Status": "OPEN",
        //          "Toll": "1.1000",
        //          "InitialNoticeFee": "0.0000",
        //          "TollViolationFee": "0.0000",
        //          "FinalNoticeFee": "0.0000",
        //          "NSFFee": "0.0000",
        //          "CourtFee": "0.0000",
        //          "AdminFee": "0.0000",
        //          "AmountDue": "1.1000",
        //          "TVNLetter": ""
        //      }
        //    ]
        //};

        ///
        $scope.getNoticePdf = function () {
            NoticesService.getNoticePdf(function (response) {
                if (response.Success == true) {
                    $scope.noticePdf = response.Data;
                    //$window.open($scope.noticePdf);
                    //ToDo: remove once api ready
                    $window.open("https://www.fbtrcsc.com/vector/violations/violationList.do?exclGen=true&openPDF=true&pdf=FBGP_TEVFBA3_20170201_T901607402377.PDF");
                } else {
                    FlashService.Error("Unable to get notice pdf.");
                    //ToDo: remove once api ready
                    $window.open("https://www.fbtrcsc.com/vector/violations/violationList.do?exclGen=true&openPDF=true&pdf=FBGP_TEVFBA3_20170201_T901607402377.PDF");
                }
            });
        };

        $scope.getPaymentUrl = function () {
            VehicleService.getPaymentURL(function (response) {
                if (response.Success == true) {
                    var paymentUrl = response;
                    $scope.open(paymentUrl);
                } else {
                    FlashService.Error("Unable to get Payment URL.");
                    //ToDo: remove once api in place
                    $scope.payment = {};
                    $scope.payment.titleId = "FBC Payment Portal";
                    $scope.payment.contentId = response;
                    $scope.payment.processingPayment = true;
                    $scope.open($scope.payment);
                }
            });
        };

        var sortingOrder = 'name'; //default sort
        $scope.sortingOrder = sortingOrder;
        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.idSelected = null;
        $scope.itemSelected = false;
        $scope.selection = [];

        $scope.toggleSelection = function toggleSelection($event, item) {
            $event.stopPropagation();
            $scope.idSelected = item.NoticeNumber;
            $scope.itemSelected = true;
            var idx = $scope.selection.indexOf(item);
            (idx > -1) ? $scope.selection.splice(idx, 1) : $scope.selection.push(item);
        };

        $scope.$watchCollection('selection', function (array) {
            if (array) {
                $scope.paymentTotal = array.reduce(function (total, item) {
                    return total + parseFloat(item.AmountDue);
                }, 0);
            }
        });

        // sorting order
        $scope.sort_by = function (newSortingOrder) {
            if ($scope.sortingOrder == newSortingOrder)
                $scope.reverse = !$scope.reverse;

            $scope.sortingOrder = newSortingOrder;
        };
    }
  ]);