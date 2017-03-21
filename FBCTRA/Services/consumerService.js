angular.module('ConsumerServiceModule', ['ApiModule'])
.factory('ConsumerService', ['apiService',
    function (apiService) {
        'use strict';

        var apiUri = '/consumer';
        return {
            getConsumerData: function (callback) {
                var params = {};
                return apiService.get(apiUri, params)
	                             .then(function successCallback(response) {
	                                 callback(response.data);
	                             }, function errorCallback(response) {
	                                 callback(false);
	                             });
            },
            postConsumerData: function (consumerData, callback) {
                var params = {
                    consumerId: consumertData.consumer.Id,
                };
                return apiService.postConsumerData(apiUri, consumerData, params)
                                 .then(function successCallback(response) {
                                     callback(response);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            }
        }
    }
]);