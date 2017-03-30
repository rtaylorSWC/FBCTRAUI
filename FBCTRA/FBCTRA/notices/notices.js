angular.module('FBCApp')
  .controller('NoticesController', ['$window', '$scope', '$sce', '$filter', 'localStore', 'messageBus', 'FlashService', 'AccountService', 'NoticesService', 'VehicleService',
    function ($window, $scope, $sce, $filter, localStore, messageBus, FlashService, AccountService, NoticesService, VehicleService) {
        'use strict';

        var currentUser = localStore.getCurrentUser();
        currentUser = currentUser.currentUser;
        $scope.paymentMethod = $scope.paymentTotal = false;
        var sortingOrder = 'name'; //default sort
        $scope.sortingOrder = sortingOrder;
        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.idSelected = null;
        $scope.itemSelected = false;
        $scope.selection = [];

        $scope.open = function (payItem) {
            messageBus.publish('payItemSelected', payItem);
        };

        $scope.getViolationList = function () {
            AccountService.getViolationsByAccountGuid(currentUser.AccountGuid, function (response) {
                if (response) {
                    $scope.violationData = response;
                } else {
                    FlashService.Error("Unable to get Violation List.");
                }
            });
        };

        $scope.getNoticePdf = function (fileName) {
            var statementData = {
                "FileName": fileName,
                "DirectoryName": ""
            };
            AccountService.getNoticePdf(statementData, function (response) {
                if (response) {
                    var file = new Blob([response.data], { type: 'application/pdf' });
                    var fileURL = URL.createObjectURL(file);
                    $window.open($sce.trustAsResourceUrl(fileURL));
                } else {
                    FlashService.Error("Unable to get notice pdf.");
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

        $scope.sort_by = function (newSortingOrder) {
            if ($scope.sortingOrder == newSortingOrder)
                $scope.reverse = !$scope.reverse;

            $scope.sortingOrder = newSortingOrder;
        };

        $scope.getViolationList();
    }
  ]);