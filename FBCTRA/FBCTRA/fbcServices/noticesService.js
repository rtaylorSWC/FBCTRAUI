angular.module('FBCApp')
.factory('NoticesService', ['apiService',
    function (apiService) {
        'use strict';

        var apiUri = '/api/notices';
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
            getNoticePdf: function (callback) {
                var params = { responseType: 'arraybuffer' };
                //return apiService.post(apiUri, params)
                //                 .then(function successCallback(response) {
                //                     var file = new Blob([response], { type: 'application/pdf' });
                //                     var fileURL = URL.createObjectURL(file);
                //                     callback(response);
                //                 }, function errorCallback(response) {
                //                     callback(false);
                //                 });
                return apiService.post(apiUri, params)
                                 .then(function successCallback(response) {
                                     var file = new Blob([response], { type: 'application/pdf' });
                                     var fileURL = URL.createObjectURL(file);
                                     callback(response);
                                 }, function errorCallback(response) {
                                     // callback(false);
                                     //ToDo: remove once service ready
                                     callback({ "Success": true, "Data": "Some Blob Data" });
                                 });
            },
            postNoticesData: function (noticesData, callback) {
                var params = {
                    noticeId: noticesData.consumer.Id,
                };
                return apiService.postData(apiUri, noticesData, params)
                                 .then(function successCallback(response) {
                                     callback(response);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            }
        }
    }
]);