angular.module('ApiModule', [])
.factory('apiService', ['$http', '$rootScope', '$log', '$q', '$resource', 'configurationService', 'localStore', 'localStoreConstants',
	function ($http, $rootScope, $log, $q, $resource, configurationService, localStore, localStoreConstants) {
	    'use strict';

	    var domainApiUrl = configurationService.getVehicleApiUrl();

	    function getResourcePromise(uri, payload, parameters, resourceConfig, resourceMethod, additionalHeaders, useCacheBuster, useResourceCache) {
	        // calcualte URL
	        var url = domainApiUrl + uri;
	        //$log.debug({ url: url, method: resourceMethod });

	        var headers = angular
	            .extend({}, {
	                'Accept': 'application/json,text/html',
	                "Content-Type": "application/json"
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
	            var loggedIn = $rootScope.globals.currentUser;
	            if (loggedIn) {
	                return $http({
	                    method: 'GET',
	                    dataType: 'jsonp',
	                    url: domainApiUrl + url,
	                    params: parameters
	                });
	            }
	        },
	        post: function (uri, payload, params) {
	            return $http.post(domainApiUrl + uri, payload, params
	            );
	        },
	        postFile: function (uri, payload, attachmentToken, filename, params) {
	            return getResourcePromise(
	                uri,
	                payload,
                    params,
	                null,
	                'save',
                    {
                        'attachmentToken': attachmentToken,
                        'filename': filename,
                        'Content-Type': undefined,
                    }
                );
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
