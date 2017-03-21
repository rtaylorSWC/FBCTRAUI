angular.module('FBCApp')
  .controller('InvoiceController', ['$location', '$scope', 'localStore', 'messageBus',
    function ($location, $scope, localStore, messageBus) {
        'use strict';

        $scope.dataItem = { "accountNumber": "123892", "beginDate": "dd/mm/yyyy", "endDate": "dd/mm/yyyy" };

        $scope.mainGridOptions = {
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

        $scope.detailGridOptions = function (dataItem) {
            return {
                dataSource: {
                    data: {
                        "items": [{ "date": "dd/mm/yyyy", "invoiceNumber": "9999", "tollAmount": "233", "tollAdjustment": "52", "fee": "232", "feeAdjustment": "53", "status": "Not Paid", "paidAmount":"42" }]
                    },
                    schema: {
                        data: "items"
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 5,
                    //filter: { field: "licensePlate", operator: "eq", value: dataItem.EmployeeID }
                },
                columns: [
                  {
                      field: "date",
                      title: "Date"
                  }, {
                      field: "invoiceNumber",
                      title: "Invoice Number"
                  }, {
                      field: "tollAmount",
                      title: "Toll Amount"
                  }, {
                      field: "tollAdjustment",
                      title: "Toll Adjustment"
                  }, {
                      field: "fee",
                      title: "Fee"
                  }, {
                      field: "feeAdjustment",
                      title: "Fee Adjustment"
                  }, {
                      field: "status",
                      title: "Status"
                  }, {
                      field: "paidAmount",
                      title: "Paid Amount"
                  }],
                scrollable: false,
                sortable: true,
                pageable: true
            };
        };
    }
  ]);