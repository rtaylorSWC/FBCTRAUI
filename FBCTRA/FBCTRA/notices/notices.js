angular.module('FBCApp')
  .controller('NoticesController', ['$location', '$scope', '$filter', 'localStore', 'messageBus', 'NoticesService',
    function ($location, $scope, $filter, localStore, messageBus, NoticesService) {
        'use strict';
        var generateData = function () {
            var arr = [];
            var letterWords = ["notice"]
            for (var i = 1; i < 60; i++) {
                var id = letterWords[Math.floor(Math.random() * letterWords.length)];
                arr.push({ "id": id + i, "total": "total " + i, "description": "Description of item #" + i, "link": id, "field4": "Some info about notice: " + i, "field5": "field" + i });
            }
            return arr;
        }

        var sortingOrder = 'name'; //default sort

        $scope.sortingOrder = sortingOrder;
        $scope.pageSizes = [5, 10, 25, 50];
        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 5;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.items = generateData();

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

        $scope.deleteItem = function (idx) {
            var itemToDelete = $scope.pagedItems[$scope.currentPage][idx];
            var idxInItems = $scope.items.indexOf(itemToDelete);
            $scope.items.splice(idxInItems, 1);
            $scope.search();

            return false;
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