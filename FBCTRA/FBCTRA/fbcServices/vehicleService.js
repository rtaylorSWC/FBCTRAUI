angular.module('FBCApp')
.factory('VehicleService', ['apiService',
	function (apiService) {
	    'use strict';

	    var apiUri = '/api/Vehicle';
	    return {
	        getAccountId: function (invoiceId, licensePlate, callback) {
	            var params = {
	                CampaignId: invoiceId,
	                LicensePlate: licensePlate
	            };
	            apiUri = apiUri + '/GetAccountId';
	            return apiService.get(apiUri, params)
	                             .then(function successCallback(response) {
	                                 callback(response.data);
	                             }, function errorCallback(response) {
	                                 callback(false);
	                             });
	        },
	        getPaymentURL: function (callback) {
	            //var params = {
	            //    Id: id
	            //};
	            apiUri = apiUri + '/GetPaymentURL';
	            return apiService.get(apiUri)
                                 .then(function successCallback(response) {
                                     callback(response.data);
                                 }, function errorCallback(response) {
                                     //Todo: remove once api avail
                                     response.status = 200;
                                     response.data = "https://staging.emergetechnology.net/#/SW-Credit-Toll/preloaded/payment/7e6901a8-d710-e711-80d7-005056955f7f";
                                     callback(response.data);
                                     //callback(false);
                                 });
	        }
	    }
	}
]);