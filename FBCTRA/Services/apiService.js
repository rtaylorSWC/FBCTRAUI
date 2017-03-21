angular.module('ApiModule', [])
.factory('apiService', ['$http', '$log', '$q', '$resource', 'configurationService', 'localStore', 'localStoreConstants',
	function ($http, $log, $q, $resource, configurationService, localStore, localStoreConstants) {
	    'use strict';

	    var currentAuthToken = localStore.getAuthToken();
	    var domainApiUrl = configurationService.getConsumerApiUrl();
	    var agentApiUrl = configurationService.getAgentApiUrl();

	    function getResourcePromise(uri, payload, parameters, resourceConfig, resourceMethod, additionalHeaders, useCacheBuster, useResourceCache) {
	        // calcualte URL
	        var url = domainApiUrl + uri;
	        //$log.debug({ url: url, method: resourceMethod });

	        //ToDo: reduce check to base uri once params are passed in
	        url = (uri === '/agents') ? agentApiUrl + uri : url;

	        var headers = angular
	            .extend({}, {
	                'Accept': 'application/json,text/html',
	                "Content-Type": "application/json",
	                'Authorization': 'Basic ' + currentAuthToken,
	            }, additionalHeaders || {});

	        // calculate method
	        var method = methodMap[resourceMethod] || methodMap[resourceMethod].get;
	        var isGet = method.verb === 'GET';
	        var isAuthenticating = uri === '/authenticateUser';

	        // calculate use of cache buster
	        useCacheBuster = isGet && (typeof (useCacheBuster) === 'boolean' ? useCacheBuster : false);

	        // initialize resource config
	        resourceConfig = angular.extend(
                resourceConfig || {},
                {
                    cache: isGet && (!useCacheBuster) && (typeof (useResourceCache) === 'boolean' ? useResourceCache : false)
                });

	        // initialize resource method configuration
	        resourceConfig[resourceMethod] = {
	            headers: headers,
	            method: method.verb,
	            //isArray: true
	        };

	        if (isGet) {
	            resourceConfig[resourceMethod].isArray = false;
	        }

	        if (isAuthenticating) {
	            resourceConfig[resourceMethod].isArray = true;
	        }

	        if (useCacheBuster) {
	            // append cache buster
	            //parameters = parameters || {};
	            //parameters.cacheBuster = Date.now().toString();
	        }

	        return method.fn($resource(url, parameters || null, resourceConfig), payload).$promise;
	    }

	    var methodMap = {
	        delete: {
	            verb: 'DELETE',
	            fn: function (resource) { return resource.delete(); }
	        },
	        get: {
	            verb: 'GET',
	            fn: function (resource) { return resource.get(); }
	        },
	        query: {
	            verb: 'GET',
	            fn: function (resource) { return resource.query(); }
	        },
	        save: {
	            verb: 'POST',
	            fn: function (resource, payload) { return resource.save(payload); }
	        },
	        update: {
	            verb: 'PUT',
	            fn: function (resource, payload) { return resource.update(payload); }
	        }
	    };

	    return {
	        get: function (url, parameters) {
	            return $http({
	                method: 'GET',
	                url: domainApiUrl + url,
	                headers: {
	                    'Content-Type': 'application/json; charset=utf-8',
	                    'Authorization': currentAuthToken
	                },
	                params: parameters
	            });
	        },
	        post: function (uri, payload, params) {
	            return $http.post(domainApiUrl + uri, payload, {
	                headers: {
	                    'Content-Type': 'application/json; charset=utf-8'
	                },
	                params: params
	            });
	        },
	        postAgent: function (uri, payload, params) {
	            return getResourcePromise(
	                uri,
	                payload,
                    params,
	                null,
	                'save');
	        },
	        postFile: function (uri, payload, params) {
	            return $http.post(domainApiUrl + uri, payload, {
	                headers: {
	                    'Accept': 'application/json,multipart/form-data',
	                    'Authorization': currentAuthToken,
	                    'Content-Type': undefined
	                },
	                transformRequest: angular.identity
	            });
	        },
	        put: function (uri, payload, params) {
	            return getResourcePromise(
                    uri,
                    payload,
                    params,
                    null,
                    'update');
	        },
	        remove: function (uri, params) {
	            return getResourcePromise(
                    uri,
                    null,
                    params,
                    null,
                    'delete');
	        }
	    };
	}
]);
