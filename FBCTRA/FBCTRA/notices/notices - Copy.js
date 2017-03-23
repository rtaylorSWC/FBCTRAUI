angular.module('FBCApp')
  .controller('NoticesController', ['$location', '$scope', 'localStore', 'messageBus',
    function ($location, $scope, localStore, messageBus) {
        'use strict';
        //$scope.mainGridOptions = {
        //    dataSource: {
        //        type: "odata",
        //        transport: {
        //            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
        //        },
        //        pageSize: 5,
        //        serverPaging: true,
        //        serverSorting: true
        //    },
        //    sortable: true,
        //    pageable: true,
        //    dataBound: function () {
        //        this.expandRow(this.tbody.find("tr.k-master-row").first());
        //    },
        //    columns: [{
        //        field: "FirstName",
        //        title: "First Name",
        //        width: "120px"
        //    }, {
        //        field: "LastName",
        //        title: "Last Name",
        //        width: "120px"
        //    }, {
        //        field: "Country",
        //        width: "120px"
        //    }, {
        //        field: "City",
        //        width: "120px"
        //    }, {
        //        field: "Title"
        //    }]
        //};

        $scope.showDisputed = true;

        $scope.dataItem = { "accountNumber": "123892", "beginDate": "dd/mm/yyyy", "endDate":"dd/mm/yyyy" };

        $scope.disputedGridOptions = {
            dataSource: {
                data: {
                    "items": [{ "licensePlate": "3X48J" }, { "licensePlate": "J238F" }, { "licensePlate": "D7832" }, { "licensePlate": "W238F" }, { "licensePlate": "MX48J" }, { "licensePlate": "W238F" }]
                },
                schema: {
                    data: "items"
                },
                pageSize: 5,
                serverPaging: true,
                serverSorting: true
            },
            columns: [
              {
                  field: "licensePlate",
                  title: "License Plate"
              }],
            sortable: true,
            pageable: true,
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
        };

        $scope.openGridOptions = {
            dataSource: {
                data: {
                    "items": [{ "licensePlate": "11111" }, { "licensePlate": "J238F" }, { "licensePlate": "D7832" }, { "licensePlate": "W238F" }, { "licensePlate": "MX48J" }, { "licensePlate": "W238F" }]
                },
                schema: {
                    data: "items"
                },
                pageSize: 5,
                serverPaging: true,
                serverSorting: true
            },
            columns: [
              {
                  field: "licensePlate",
                  title: "License Plate"
              }],
            sortable: true,
            pageable: true,
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
        };

        //$scope.detailGridOptions = function (dataItem) {
        //    return {
        //        dataSource: {
        //            data: {
        //                "items": [{ "totalInvoicedAmount": "323", "paidAmount": "45", "adjustments": "23", "fees":"52", "unpaidBalance":"232", "uninvoicedTolls":"53", "amountDue":"323" }]
        //            },
        //            schema: {
        //                data: "items"
        //            },
        //            serverPaging: true,
        //            serverSorting: true,
        //            serverFiltering: true,
        //            pageSize: 5,
        //            //filter: { field: "licensePlate", operator: "eq", value: dataItem.licensePlate }
        //        },
        //        columns: [
        //          {
        //              field: "totalInvoicedAmount",
        //              title: "Total Invoiced Amount"
        //          }, {
        //              field: "paidAmount",
        //              title: "Paid Amount"
        //          }, {
        //              field: "adjustments",
        //              title: "Adjustments"
        //          }, {
        //              field: "fees",
        //              title: "Fees"
        //          }, {
        //              field: "unpaidBalance",
        //              title: "Unpaid Balance"
        //          }, {
        //              field: "uninvoicedTolls",
        //              title: "Uninvoiced Tolls"
        //          }, {
        //              field: "amountDue",
        //              title: "Amount Due"
        //          }],
        //        scrollable: false,
        //        sortable: true,
        //        pageable: true
        //    };
        //};

    }
  ]);