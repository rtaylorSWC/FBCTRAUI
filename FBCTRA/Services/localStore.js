angular.module('LocalStoreModule', [])
    .constant('localStoreConstants', {
        CURRENT_USER: '8638P1F2-7G18-692W-M2V2-50C9L31380DP',
        CURRENT_FULLNAME: '3833P1F2-9G12-692W-M2V2-50C9L31380WE',
        TRANSLATED_DATA: '6993D3D7-5E82-407C-A9E9-50C9439350MH',
        ATTACHMENTS: '389D3LE2-305Y-3H23-MN28-90238DE380DE'
    })
    .service('localStore', ['$log', '$window', 'localStoreConstants', 'messageBus',
        function ($log, $window, localStoreConstants, messageBus) {
            //SERVICE INTERFACE
            this.getCurrentUser = getCurrentUser;
            this.getCurrentFullName = getCurrentFullName;
            this.getAuthToken = getAuthToken;
            this.getTranslatedData = getTranslatedData;
            this.getAttachments = getAttachments;

            this.setCurrentUser = setCurrentUser;
            this.setCurrentFullName = setCurrentFullName;
            this.setAuthToken = setAuthToken;
            this.setTranslatedData = setTranslatedData;
            this.setAttachments = setAttachments;

            this.setSession = setSession;
            this.reset = reset;

            //SERVICE IMPLEMENTATION
            function getCurrentUser() {
                return getSession(localStoreConstants.CURRENT_USER);
            }

            function getCurrentFullName() {
                return getSession(localStoreConstants.CURRENT_FULLNAME);
            }

            function getAuthToken() {
                return getSession(localStoreConstants.AUTH_TOKEN);
            }

            function getTranslatedData() {
                return getSession(localStoreConstants.TRANSLATED_DATA);
            }

            function getAttachments() {
                return getSession(localStoreConstants.ATTACHMENTS);
            }

            function setCurrentUser(currentUserValue) {
                setSession(localStoreConstants.CURRENT_USER, currentUserValue);
            }

            function setCurrentFullName(currentFullNameValue) {
                setSession(localStoreConstants.CURRENT_FULLNAME, currentFullNameValue);
            }

            function setAuthToken(authTokenValue) {
                setSession(localStoreConstants.AUTH_TOKEN, authTokenValue);
            }

            function setTranslatedData(translatedDataValue) {
                setSession(localStoreConstants.TRANSLATED_DATA, translatedDataValue);

                messageBus.publish('translatedDataChanged', translatedDataValue);
            }

            function setAttachments(attachmentsValue) {
                setSession(localStoreConstants.ATTACHMENTS, attachmentsValue);
            }

            function getSession(key) {
                var sessionData = $window.sessionStorage.getItem(key);

                try {
                    // if we don't get a string, we can't convert it from JSON
                    if (typeof (sessionData) !== 'string') return sessionData;

                    // possible invalid JSON object failure during conversion
                    var value = angular.fromJson(sessionData);

                    // if the object is of the new encapsulated type, we should be able to return the value
                    //	otherwise, we return the object itself (for legacy)
                    return ((typeof (value) === 'object') && (typeof (value.value) !== 'undefined')) ? value.value : value;
                } catch (ex) {
                    // capture of JSON oject conversion failure - just return the string data
                    return sessionData;
                }
            }

            function setSession(key, value) {
                $window.sessionStorage.setItem(key, angular.toJson({ value: value }));
            }

            function reset() {
                var keys = JSONSelect.match('string', localStoreConstants);
                //var keys = angular.toJson([localStoreConstants]);

                for (var i = 0; i < keys.length; ++i) {
                    setSession(keys[i], null);
                }
            }
        }
    ]);
