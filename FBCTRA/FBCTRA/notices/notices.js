angular.module('FBCApp')
  .controller('NoticesController', ['$window', '$scope', '$filter', 'localStore', 'messageBus', 'FlashService', 'NoticesService', 'VehicleService',
    function ($window, $scope, $filter, localStore, messageBus, FlashService, NoticesService, VehicleService) {
        'use strict';

        $scope.open = function (payItem) {
            messageBus.publish('payItemSelected', payItem);
        };

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

        var generateData = function () {
            var arr = [];
            var letterWords = ["notice"]
            for (var i = 1; i < 60; i++) {
                var id = letterWords[Math.floor(Math.random() * letterWords.length)];
                arr.push({ "id": id + i, "total": i, "description": "Description of notice #" + i, "link": id + i + "Pdf", "field4": "Some info about notice: " + i, "field5": "field" + i });
            }
            return arr;
        }
        //$scope.pagedItems = {};

        $scope.getTotal = function () {
            //var total = 0;
            //for (var i = 0; i < $scope.cart.products.length; i++) {
            //    var product = $scope.cart.products[i];
            //    total += (product.price * product.quantity);
            //}
            //return total;
        };

        var sortingOrder = 'name'; //default sort

        $scope.sortingOrder = sortingOrder;
        $scope.pageSizes = [5, 10, 25, 50];
        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 10;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.items = generateData();
        $scope.idSelected = null;
        $scope.itemSelected = false;
        $scope.selection = [];

        $scope.toggleSelection = function toggleSelection($event, item) {
            $event.stopPropagation();
            $scope.idSelected = item.id;
            $scope.itemSelected = true;
            var idx = $scope.selection.indexOf(item);
            (idx > -1) ? $scope.selection.splice(idx, 1) : $scope.selection.push(item);
        };

        $scope.$watchCollection('selection', function (array) {
            if (array) {
                $scope.paymentTotal = array.reduce(function (total, item) {
                    return total + item.total;
                }, 0);
            }
        });

        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

        // init the filtered items
        $scope.search = function () {
            $scope.filteredItems = $filter('filter')($scope.items, function (item) {
                for (var attr in item) {
                    if (searchMatch(item[attr], $scope.query))
                        return true;
                }
                return false;
            });
            // sorting order
            if ($scope.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
            }
            $scope.currentPage = 0;
            // group by pages
            $scope.groupToPages();
        };

        // items per page
        $scope.perPage = function () {
            $scope.groupToPages();
        };

        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        $scope.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length - 1) {
                $scope.currentPage++;
            }
        };

        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };

        $scope.search();

        // sorting order
        $scope.sort_by = function (newSortingOrder) {
            if ($scope.sortingOrder == newSortingOrder)
                $scope.reverse = !$scope.reverse;

            $scope.sortingOrder = newSortingOrder;
        };
    }
  ]);