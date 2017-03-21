angular.module('AgentServiceModule', ['ApiModule'])
.factory('AgentService', ['apiService',
    function (apiService) {
        'use strict';

        var apiUri = '/agent';
        return {
            getAgentData: function (callback) {
                var params = {};
                return apiService.get(apiUri, params)
	                             .then(function successCallback(response) {
	                                 callback(response.data);
	                             }, function errorCallback(response) {
	                                 callback(false);
	                             });
            },
            postAgentData: function (agentData, callback) {
                var params = {
                    agentId: agentData.agent.Id,
                };
                return apiService.postAgentData(apiUri, agentData, params)
                                 .then(function successCallback(response) {
                                     callback(response);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            }
        }
    }
]);