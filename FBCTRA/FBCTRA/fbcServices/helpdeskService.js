angular.module('FBCApp')
.factory('HelpDeskService', ['apiService',
    function (apiService) {
        'use strict';

        var apiUri = '/support';
        return {
            uploadAttachment: function (fileData, fileName, attachmentToken, callback) {
                var params = {};
                var uri = apiUri + '/upload/' + fileName;
                return apiService.postFile(uri, fileData, attachmentToken, params)
                                 .then(function successCallback(response) {
                                     callback(response);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            },
            submit: function (data, callback) {
                var params = {};
                var uri = apiUri + '/newTicket';
                return apiService.post(uri, data, params)
                                 .then(function successCallback(response) {
                                     callback(response);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            },
        }
    }
]);