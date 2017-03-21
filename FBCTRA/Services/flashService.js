angular.module('FlashModule', [])
.factory('FlashService', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
        'use strict';
        var service = {};
        service.Info = Info;
        service.Success = Success;
        service.Error = Error;

        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function Info(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'info',
                keepAfterLocationChange: keepAfterLocationChange
            };
            $timeout(function () { delete $rootScope.flash; }, 30000);
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
            $timeout(function () { delete $rootScope.flash; }, 10000);
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
            $timeout(function () { delete $rootScope.flash; }, 30000);
        }
    }
]);