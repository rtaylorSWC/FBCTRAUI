'use strict';
angular.module('UserLoginApp', ['ngResource', 'ui.router', 'pascalprecht.translate', "ui.bootstrap", "ngAside", 'ApiModule', 'AuthenticationModule', 'TranslationModule',
                                'ConfigurationModule', 'LocalStoreModule', 'FlashModule', 'MessageBusModule', 'MenuBarModule', 'InfoBarModule', 'ModalModule'])
.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

    $urlRouterProvider.otherwise('/login');

    var loginViewBase = {
        menuBarView: {
            templateUrl: '../Widgets/menuBar/menuBar.html',
            controller: 'MenuBarController'
        },
        infoBarView: {
            templateUrl: '../Widgets/infoBar/infoBar.html',
            controller: 'InfoBarController'
        },
        modalView: {
            templateUrl: '../Widgets/modal/modal.html',
            controller: 'ModalController'
        }
    };

    $stateProvider
        //USER LOGIN
        .state('login', {
            url: '/login',
            views: angular.extend({}, loginViewBase, {
                loginView: {
                    templateUrl: '/UserLogin/views/login.html',
                    controller: 'LoginController'
                }
            })
        });

    //translations
    $translateProvider
        .preferredLanguage('en')
        .fallbackLanguage('en')
        .useSanitizeValueStrategy('escape')
        .useStaticFilesLoader({
            prefix: '/Translations/',
            suffix: '.json'
        });
});