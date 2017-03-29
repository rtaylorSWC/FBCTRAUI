angular.module('AuthenticationModule', [])
.factory('AuthenticationFactory', ['$http', '$rootScope', '$state', '$window', 'localStore', 'apiService', 'configurationService',
    function ($http, $rootScope, $state, $window, localStore, apiService, configurationService) {
        'use strict';

        return {
            login: function (noticeNumber, licensePlate, state, callback) {
                var apiUri = '/api/Login/GetAccount';
                var params = {};
                var credentials = { NoticeNumber: noticeNumber, LicensePlate: licensePlate, LP_State: state };
                return apiService.post(apiUri, credentials, params)
                                 .then(function successCallback(response) {
                                     callback(response.data);
                                 }, function errorCallback(response) {
                                     callback(false);
                                 });
            },
            getUserToken: function () {
                return localStore.getAuthToken();
            },
            gotoUserLogin: function () {
                $window.location.href = configurationService.getLoginUrl()
            },
            isLoggedIn: function () {
                return ((localStore.getAuthToken() || false) && (localStore.getCurrentUserId() || false)) ? true : false;
            },
            setCredentials: function (AccountGuid, SessionId) {
                var Base64 = {
                    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                    encode: function (input) {
                        var output = "";
                        var chr1, chr2, chr3 = "";
                        var enc1, enc2, enc3, enc4 = "";
                        var i = 0;
                        do {
                            chr1 = input.charCodeAt(i++);
                            chr2 = input.charCodeAt(i++);
                            chr3 = input.charCodeAt(i++);

                            enc1 = chr1 >> 2;
                            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                            enc4 = chr3 & 63;

                            if (isNaN(chr2)) {
                                enc3 = enc4 = 64;
                            } else if (isNaN(chr3)) {
                                enc4 = 64;
                            }

                            output = output +
                                this.keyStr.charAt(enc1) +
                                this.keyStr.charAt(enc2) +
                                this.keyStr.charAt(enc3) +
                                this.keyStr.charAt(enc4);
                            chr1 = chr2 = chr3 = "";
                            enc1 = enc2 = enc3 = enc4 = "";
                        } while (i < input.length);

                        return output;
                    },

                    decode: function (input) {
                        var output = "";
                        var chr1, chr2, chr3 = "";
                        var enc1, enc2, enc3, enc4 = "";
                        var i = 0;

                        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                        var base64test = /[^A-Za-z0-9\+\/\=]/g;
                        if (base64test.exec(input)) {
                            window.alert("There were invalid base64 characters in the input text.\n" +
                                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                                "Expect errors in decoding.");
                        }
                        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                        do {
                            enc1 = this.keyStr.indexOf(input.charAt(i++));
                            enc2 = this.keyStr.indexOf(input.charAt(i++));
                            enc3 = this.keyStr.indexOf(input.charAt(i++));
                            enc4 = this.keyStr.indexOf(input.charAt(i++));

                            chr1 = (enc1 << 2) | (enc2 >> 4);
                            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                            chr3 = ((enc3 & 3) << 6) | enc4;

                            output = output + String.fromCharCode(chr1);

                            if (enc3 != 64) {
                                output = output + String.fromCharCode(chr2);
                            }
                            if (enc4 != 64) {
                                output = output + String.fromCharCode(chr3);
                            }

                            chr1 = chr2 = chr3 = "";
                            enc1 = enc2 = enc3 = enc4 = "";

                        } while (i < input.length);

                        return output;
                    }
                };
                var authdata = Base64.encode(AccountGuid + ':' + AccountGuid, SessionId + ':' + SessionId);
                $rootScope.globals = {
                    currentUser: {
                        AccountGuid: AccountGuid,
                        SessionId: SessionId,
                        authdata: authdata
                    }
                };
                $http.defaults.headers.common['SessionId'] = SessionId; // jshint ignore:line
                localStore.setCurrentUser($rootScope.globals);
                //localStore.setAuthToken(authdata);
            },
            clearCredentials: function () {
                $rootScope.globals = {};
                localStore.reset();
                $http.defaults.headers.common.Authorization = 'Basic';
                $http.defaults.headers.common['SessionId'] = null; // jshint ignore:line
            }
        }
    }
]);
