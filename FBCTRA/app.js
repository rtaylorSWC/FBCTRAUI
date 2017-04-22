'use strict';
angular.module('FBCApp', ["ngRoute", "ui.router", "ui.bootstrap", "ngAside", "ngCookies", "pascalprecht.translate", 'MessageBusModule', 'LocalStoreModule',
                          'AuthenticationModule', 'FlashModule', 'MenuBarModule', 'InfoBarModule', 'GetTagModule', 'ModalModule', 'NavBarFooterModule', 'vcRecaptcha',
                          'HelpDeskModule', 'ngResource', 'ngSanitize', 'ApiModule', 'ConfigurationModule', 'ConstantsModule', 'base64', 'textAngular', 'ngFileUpload'])
  .config(function ($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider, $translateProvider, $httpProvider) {

      $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
      $httpProvider.defaults.headers.post['Content-Type'] = 'multipart/form-data; charset=utf-8';

      $urlRouterProvider.otherwise("/login");

      var loginViewBase = {
          menuBarView: {
              templateUrl: 'Widgets/menuBar/menuBar.html',
              controller: 'MenuBarController'
          },
          infoBarView: {
              templateUrl: 'Widgets/infoBar/infoBar.html',
              controller: 'InfoBarController'
          },
          getTagView: {
              templateUrl: 'Widgets/getTag/getTag.html',
              controller: 'GetTagController'
          },
          modalView: {
              templateUrl: 'Widgets/modal/modal.html',
              controller: 'ModalController'
          },
          navBarFooterView: {
              templateUrl: 'Widgets/NavBarFooter/navBarFooter.html',
              controller: 'NavBarFooterController'
          }
      };

      var fbcViewBase = {
          tabBarView: {
              templateUrl: 'Widgets/tabBar/tabBar.html',
              controller: 'TabBarController'
          },
          infoBarView: {
              templateUrl: 'Widgets/infoBar/infoBar.html',
              controller: 'InfoBarController'
          },
          getTagView: {
              templateUrl: 'Widgets/getTag/getTag.html',
              controller: 'GetTagController'
          },
          menuBarView: {
              templateUrl: 'Widgets/menuBar/menuBar.html',
              controller: 'MenuBarController'
          },
          modalView: {
              templateUrl: 'Widgets/modal/modal.html',
              controller: 'ModalController'
          },
          navBarFooterView: {
              templateUrl: 'Widgets/navBarFooter/navBarFooter.html',
              controller: 'NavBarFooterController'
          }
      };

      $stateProvider
        //USER LOGIN
        .state('login', {
            url: '/login',
            views: angular.extend({}, loginViewBase, {
                loginView: {
                    templateUrl: 'UserLogin/views/login.html',
                    controller: 'LoginController'
                }
            })
        })
        .state('notices', {
            url: '/notices',
            views: angular.extend({}, fbcViewBase, {
                fbcView: {
                    templateUrl: 'FBCTRA/notices/notices.html',
                    controller: 'NoticesController'
                }
            })
        });

      //translations
      $translateProvider
          .preferredLanguage('en')
          .fallbackLanguage('en')
          .useSanitizeValueStrategy('sanitizeParameters')
          .useStaticFilesLoader({
              prefix: 'Translations/',
              suffix: '.json'
          });

  })
  .run(function ($rootScope, $location, $http, localStore) {

      // keep user logged in after page refresh
      $rootScope.globals = localStore.getCurrentUser() || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['SessionId'] = $rootScope.globals.currentUser.SessionId; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in and trying to access a restricted page
          var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
          var loggedIn = $rootScope.globals.currentUser;
          if (restrictedPage && !loggedIn) {
              $location.path('/login');
          }
      });
  });