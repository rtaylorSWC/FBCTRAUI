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
        $scope.idSelected = false;
        $scope.itemSelected = false;
        $scope.selection = [];
        $scope.noticeNumbers = [];
        $scope.NSFFeeAdded = false;

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

        $scope.getNoticeTransactions = function ($index, notice) {
            if (notice.HasDetails == 'Yes') {
                $scope.selectedNotice = notice;
                AccountService.getTransactionsByAccountGuidAndTVNID(currentUser.AccountGuid, notice.TVNID, function (response) {
                    if (response) {
                        $scope.violationData.Violations[$index].noticeDetailData = response;
                    } else {
                        response.Message ? FlashService.Error(response.Message) : FlashService.Error("Unable to get Transaction Details.");
                    }
                });
            }
            $scope.idSelected = notice.NoticeNumber;
        };

        $scope.disputeNotice = function (notice) {
            localStore.setCurrentNotice(notice);
            var metaData = [];
            metaData.titleId = 'LINK_HELP_TITLE_DISPUTE';
            metaData.templateUrl = 'Widgets/helpdesk/helpdesk.html';
            messageBus.publish('openHelpDesk', metaData);
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
                $scope.paymentData.Amount = parseFloat($scope.paymentTotal);
                $scope.paymentData.Paymethod = $scope.paymentMethod;
                $scope.paymentData.Language = ($translate.use() == 'en') ? "English" : "Spanish";
                $scope.NSFFeeAdded ? $scope.noticeNumbers.push("NSF") : null;
                $scope.paymentData.NoticeNumbers = $scope.noticeNumbers;

                PaymentService.getPaymentURL($scope.paymentData, function (response) {
                    if (response) {
                        $scope.payment = {};
                        $scope.payment.titleId = "FBCTRA Payment Portal";
                        $scope.payment.contentId = response.paymentUrl;
                        $scope.payment.showIFrame = true;
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
                if ($scope.violationData) {
                    if ($scope.violationData.NSFFee && $scope.violationData.NSFStatus != "Pending") {
                        $scope.paymentTotal = $scope.paymentTotal == "0.00" ? $scope.paymentTotal : parseFloat($scope.paymentTotal) + $scope.violationData.NSFFee;
                        if ($scope.paymentTotal == "0.00") {
                            $("#popover").popover('hide');
                            $scope.NSFFeeAdded = false;
                        }
                        else {
                            $("#popover").popover('show');
                            $scope.NSFFeeAdded = true;
                        }
                    }
                    var paymentTotal = $scope.paymentTotal;
                    $scope.paymentTotal = paymentTotal.toFixed(2);
                }
            }
        });

        $scope.sort_by = function (newSortingOrder) {
            if ($scope.sortingOrder == newSortingOrder) {
                $scope.reverse = !$scope.reverse;
            }
            $scope.sortingOrder = newSortingOrder;
        };

        $(document).on('click', function (e) {
            $('[data-toggle="popover"],[data-original-title]').each(function () {
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false
                }
            });
        });

        $scope.getViolationList();
    }
  ]);