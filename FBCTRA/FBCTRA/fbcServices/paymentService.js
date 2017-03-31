angular.module('FBCApp')
.factory('PaymentService', ['apiService',
	function (apiService) {
	    'use strict';

	    var apiUri = '/api/Payment';
	    return {
	        getPaymentURL: function (paymentData, callback) {
	            var params = {};
	            var uri = apiUri + '/Pay';
	            return apiService.post(uri, paymentData, params)
                                 .then(function successCallback(response) {
                                     callback(response.data);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
	        }
	    }
	}
]);