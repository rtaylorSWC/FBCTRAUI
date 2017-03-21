angular.module('MessageBusModule', [])
.provider('messageBus',
    function () {
        this.$get = [
            '$rootScope',
            function ($rootScope) {
                return {
                    subscribe: function (scope, messageName, listener) {
                        var appliedScope = scope || $rootScope;

                        if ((typeof (messageName) !== 'string') || (!messageName) || (typeof (listener) !== 'function')) return;

                        appliedScope.removeListeners = appliedScope.removeListeners || {};
                        appliedScope.removeListeners[messageName] = appliedScope.removeListeners[messageName] || [];

                        for (var i = 0; i < appliedScope.removeListeners[messageName].length; ++i) {
                            // already subscribed
                            if (appliedScope.removeListeners[messageName][i] === listener) return;
                        }

                        var removeListener = appliedScope.$on(messageName, listener);

                        appliedScope.removeListeners[messageName].push(removeListener);
                    },
                    publish: function (messageName) {
                        var rootscope = $rootScope;

                        if (!messageName) return;

                        rootscope.$broadcast.apply(rootscope, [].slice.call(arguments));
                    },
                    unsubscribe: function (scope, messageName, listener) {
                        if ((typeof (messageName) !== 'string') || (!messageName) || (typeof (listener) !== 'function')) return;

                        var appliedScope = scope || $rootScope;

                        appliedScope.removeListeners = appliedScope.removeListeners || {};
                        appliedScope.removeListeners[messageName] = appliedScope.removeListeners[messageName] || [];

                        for (var i = 0; i < appliedScope.removeListeners[messageName].length; ++i) {
                            if (appliedScope.removeListeners[messageName][i] === listener) {
                                // unsubscribe
                                appliedScope.removeListeners[messageName][i]();

                                // update array
                                appliedScope.removeListeners[messageName] = appliedScope.removeListeners[messageName].splice(i, 1);

                                return;
                            };
                        }
                    }
                };
            }
        ];
    });