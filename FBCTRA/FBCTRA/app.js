'use strict';
angular.module('FBCApp', ["ngRoute", "ui.router", "ui.bootstrap", "ngAside", "ngCookies", "pascalprecht.translate", "MessageBusModule", "LocalStoreModule",
                          "FlashModule", 'MenuBarModule', 'InfoBarModule', 'ModalModule', 'NavBarFooterModule', 'ngResource', 'ngFileUpload', 'kendo.directives'])
  .config(function ($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider, $translateProvider) {
      $urlRouterProvider.otherwise("/summary");

      $translateProvider.useStaticFilesLoader({
          prefix: '/Translations/',
          suffix: '.json'
      });
      $translateProvider.preferredLanguage('en');
      $translateProvider.fallbackLanguage('en');
      $translateProvider.useSanitizeValueStrategy('escape');

      var fbcViewBase = {
          tabBarView: {
              templateUrl: '../Widgets/tabBar/tabBar.html',
              controller: 'TabBarController'
          },
          infoBarView: {
              templateUrl: '../Widgets/infoBar/infoBar.html',
              controller: 'InfoBarController'
          },
          menuBarView: {
              templateUrl: '../Widgets/menuBar/menuBar.html',
              controller: 'MenuBarController'
          },
          modalView: {
              templateUrl: '../Widgets/modal/modal.html',
              controller: 'ModalController'
          },
          navBarFooterView: {
              templateUrl: '../Widgets/navBarFooter/navBarFooter.html',
              controller: 'NavBarFooterController'
          }
      };

      $stateProvider
            .state('summary', {
                url: '/summary',
                views: angular.extend({}, fbcViewBase, {
                    fbcView: {
                        templateUrl: 'summary/summary.html',
                        controller: 'SummaryController'
                    }
                })
            })
            .state('invoice', {
                url: '/invoice',
                views: angular.extend({}, fbcViewBase, {
                    fbcView: {
                        templateUrl: 'invoice/invoice.html',
                        controller: 'InvoiceController'
                    }
                })
            })
            .state('reporting', {
                url: '/reporting',
                views: angular.extend({}, fbcViewBase, {
                    fbcView: {
                        templateUrl: 'reporting/reporting.html',
                        controller: 'ReportingController'
                    }
                })
            })

  })
  .run(function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in and trying to access a restricted page
          var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
          var loggedIn = $rootScope.globals.currentUser;
          //if (restrictedPage && !loggedIn) {
          //    $location.path('/login');
          //}
      });
  });