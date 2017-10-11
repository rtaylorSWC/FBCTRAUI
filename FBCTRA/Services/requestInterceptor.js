angular.module('RequestProgressModule', [])
    .factory('requestInterceptor', function ($q, $rootScope, $location, localStore) {

        $rootScope.pendingRequests = 0;
        return {
            'request': function (config) {
                $rootScope.pendingRequests++;
                return config || $q.when(config);
            },

            'requestError': function (rejection) {
                $rootScope.pendingRequests--;
                return $q.reject(rejection);
            },

            'response': function (response) {
                response.status == 401 ? (localStore.reset(), $location.path('/login')) : null;
                $rootScope.pendingRequests--;
                return response || $q.when(response);
            },

            'responseError': function (rejection) {
                response.status == 401 ? (localStore.reset(), $location.path('/login')) : null;
                $rootScope.pendingRequests--;
                return $q.reject(rejection);
            }
        }
    });