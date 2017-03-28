angular.module('FBCApp')
.factory('AccountService', ['apiService',
    function (apiService) {
        'use strict';

        var apiUri = '/account';
        return {
            getViolationsByAccountGuid: function (accountGuid, callback) {
                var params = {};
                apiUri = apiUri + '/GetViolations/' + accountGuid;
                return apiService.get(apiUri, params)
                                 .then(function successCallback(response) {
                                     callback(response.data);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            }
        }
    }
]);