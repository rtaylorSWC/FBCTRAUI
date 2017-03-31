angular.module('FBCApp')
  .controller('NoticesController', ['$scope', '$filter', '$translate', '$base64', 'localStore', 'messageBus', 'FlashService', 'AccountService', 'PaymentService',
    function ($scope, $filter, $translate, $base64, localStore, messageBus, FlashService, AccountService, PaymentService) {
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
        $scope.noticeNumbers = [];

        $scope.open = function (payItem) {
            messageBus.publish('payItemSelected', payItem);
        };

        $scope.getViolationList = function () {
            AccountService.getViolationsByAccountGuid(currentUser.AccountGuid, function (response) {
                if (response) {
                    $scope.violationData = response;
                } else {
                    response.Message ? FlashService.Error(response.Message) : FlashService.Error("Unable to get Violation List.");
                }
            });
        };

        $scope.getNoticePdf = function (fileName) {
            var statementData = {
                "FileName": fileName,
                "DirectoryName": ""
            };
            var fileName = "ViolationStatement_" + fileName;
            var a = document.createElement("a");
            document.body.appendChild(a);
            AccountService.getNoticePdf(statementData, function (response) {
                if (response) {
                    var file = new Blob([response.data], { type: 'application/pdf' });
                    var fileURL = URL.createObjectURL(file);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                } else {
                    response.Message ? FlashService.Error(response.Message) : FlashService.Error("Unable to get notice pdf.");
                }
            });
        };

        $scope.getPaymentUrl = function () {
            if ($scope.paymentTotal != "0.00" && $scope.paymentMethod) {
                $scope.paymentData = {};
                $scope.paymentData.AccountGuId = currentUser.AccountGuid;
                $scope.paymentData.Amount = parseFloat("1");//parseFloat($scope.paymentTotal); ToDo: remove hardcoded int once api handles decimals
                $scope.paymentData.Paymethod = $scope.paymentMethod;
                $scope.paymentData.Language = ($translate.use() == 'en') ? "English" : "Spanish";
                $scope.paymentData.NoticeNumbers = $scope.noticeNumbers;

                PaymentService.getPaymentURL($scope.paymentData, function (response) {
                    if (response) {
                        $scope.payment = {};
                        $scope.payment.titleId = "FBC Payment Portal";
                        $scope.payment.contentId = response.paymentUrl;
                        $scope.payment.processingPayment = true;
                        $scope.open($scope.payment);
                    } else {
                        response.Message ? FlashService.Error(response.Message) : FlashService.Error("Unable to get Payment URL.");
                    }
                });
            }
        };

        $scope.toggleSelection = function toggleSelection($event, item) {
            if (item.Payable === '1') {
                $event.stopPropagation();
                $scope.idSelected = item.NoticeNumber;
                $scope.itemSelected = true;
                var idx = $scope.selection.indexOf(item);
                (idx > -1) ? $scope.selection.splice(idx, 1) : $scope.selection.push(item);
                var idx2 = $scope.noticeNumbers.indexOf(item.NoticeNumber);
                (idx2 > -1) ? $scope.noticeNumbers.splice(idx2, 1) : $scope.noticeNumbers.push(item.NoticeNumber);
            }
        };

        $scope.$watchCollection('selection', function (array) {
            if (array) {
                $scope.paymentTotal = array.reduce(function (total, item) {
                    return total + parseFloat(item.AmountDue);
                }, 0).toFixed(2);
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