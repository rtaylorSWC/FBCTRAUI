angular.module('FBCApp')
.factory('AccountService', ['apiService',
    function (apiService) {
        'use strict';

        var apiUri = '/account';

        ///// ToDo: delete
        var TrxnDetail = [
        {
            "TVNID": 497969,
            "Lane": "WPT Westmoor/06/2",
            "TrxnNum": "S910000497969-1",
            "TransactionDate": "03/24/2017",
            "TransactionTime": "19:17:04",
            "TollAmount": 0.8,
            "StatusCode": "OPEN",
            "Image1": null,
            "Image2": null
        },
            {
                "TVNID": 497969,
                "Lane": "WPT Peek/16/2",
                "TrxnNum": "S910000497969-2",
                "TransactionDate": "03/24/2017",
                "TransactionTime": "19:19:05",
                "TollAmount": 0.8,
                "StatusCode": "OPEN",
                "Image1": null,
                "Image2": null
            },
    {
        "TVNID": 497969,
        "Lane": "WPT Peek/16/2",
        "TrxnNum": "S910000497969-3",
        "TransactionDate": "05/04/2017",
        "TransactionTime": "16:35:18",
        "TollAmount": 0.8,
        "StatusCode": "OPEN",
        "Image1": null,
        "Image2": null
    },
        {
            "TVNID": 497969,
            "Lane": "WPT Westmoor/02/2",
            "TrxnNum": "S910000497969-4",
            "TransactionDate": "05/06/2017",
            "TransactionTime": "19:08:23",
            "TollAmount": 0.8,
            "StatusCode": "OPEN",
            "Image1": null,
            "Image2": null
        },
        {
            "TVNID": 497969,
            "Lane": "WPT Westmoor/05/2",
            "TrxnNum": "S910000497969-5",
            "TransactionDate": "05/06/2017",
            "TransactionTime": "21:08:27",
            "TollAmount": 0.8,
            "StatusCode": "OPEN",
            "Image1": null,
            "Image2": null
        },
            {
                "TVNID": 497969,
                "Lane": "WPT Peek/16/2",
                "TrxnNum": "S910000497969-6",
                "TransactionDate": "05/06/2017",
                "TransactionTime": "21:10:31",
                "TollAmount": 0.8,
                "StatusCode": "OPEN",
                "Image1": null,
                "Image2": null
            }
        ];
        /////
        return {
            getViolationsByAccountGuid: function (accountGuid, callback) {
                var params = {};
                var uri = apiUri + '/GetViolations/' + accountGuid;
                return apiService.get(uri, params)
                                 .then(function successCallback(response) {
                                     response.data.Violations[0].TrxnDetail = TrxnDetail; //ToDo: delete line
                                     response.data.Violations[1].TrxnDetail = TrxnDetail; //ToDo: delete line
                                     callback(response.data);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            },
            getNoticePdf: function (statementData, callback) {
                var params = { responseType: 'arraybuffer' };
                var uri = apiUri + '/GetStatement';
                return apiService.post(uri, statementData, params)
                                 .then(function successCallback(response) {
                                     callback(response);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            }
        }
    }
]);