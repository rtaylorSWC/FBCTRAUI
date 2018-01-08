angular.module('RequestProgressModule', [])
    .factory('requestInterceptor', function ($q, $rootScope, $location, localStore) {

        $rootScope.pendingRequests = 0;
        return {
            'request': function (config) {
                config.url.indexOf('account/GetViolations') == -1 ? $rootScope.pendingRequests++ : null;
                return config || $q.when(config);
            },

            'requestError': function (rejection) {
                $rootScope.pendingRequests--;
                return $q.reject(rejection);
            },

            'response': function (response) {
                response.status == 401 ? (localStore.reset(), $location.path('/login')) : null;
                response.config.url.indexOf('account/GetViolations') == -1 ? $rootScope.pendingRequests-- : null;
                return response || $q.when(response);
            },

            'responseError': function (rejection) {
                rejection.status == 401 ? (localStore.reset(), $location.path('/login')) : null;
                $rootScope.pendingRequests--;
                return $q.reject(rejection);
            }
        }
    });