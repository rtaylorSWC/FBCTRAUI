angular.module('FBCApp')
.factory('NoticesService', [
    function (apiService) {
        'use strict';

        var apiUri = '/notices';
        return {
            getNoticesData: function (callback) {
                var params = {};
                //return apiService.get(apiUri, params)
	            //                 .then(function successCallback(response) {
	            //                     callback(response.data);
	            //                 }, function errorCallback(response) {
	            //                     callback(false);
                //                 });
                return { "licensePlate": "123892", "beginDate": "dd/mm/yyyy", "endDate": "dd/mm/yyyy" };
            },
            postNoticesData: function (noticesData, callback) {
                var params = {
                    noticeId: noticesData.consumer.Id,
                };
                return apiService.postNoticesData(apiUri, noticesData, params)
                                 .then(function successCallback(response) {
                                     callback(response);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            }
        }
    }
]);