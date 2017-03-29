angular.module('FBCApp')
.factory('AccountService', ['apiService',
    function (apiService) {
        'use strict';

        var apiUri = '/account';
        return {
            getViolationsByAccountGuid: function (accountGuid, callback) {
                var params = {};
                var uri = apiUri + '/GetViolations/' + accountGuid;
                return apiService.get(uri, params)
                                 .then(function successCallback(response) {
                                     callback(response.data);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            },
            getNoticePdf: function (statementData, callback) {
                var params = {};
                var uri = apiUri + '/GetStatement';
                return apiService.post(uri, statementData, params)
                                 .then(function successCallback(response) {
                                     callback(response);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            },
        }
    }
]);