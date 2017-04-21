angular.module('ConfigurationModule', [])
.constant('constants', {
    //Vehicle API URLs
    API_LOCAL_VEHICLE_URI: 'http://localhost:55101',
    API_DEV_VEHICLE_URL: '//dev',
    API_UAT_VEHICLE_URL: '//uat',
    //API_PROD_VEHICLE_URL: 'http://vpsapi.azurewebsites.net',
    API_PROD_VEHICLE_URL: 'https://api.fbctrcsc.com',
})
.provider('configurationService', function ($logProvider) {
    this.$get = [
        '$document', '$filter', '$location', '$log', '$window', 'constants',
        function ($document, $filter, $location, $log, $window, constants) {
            'use strict';

            function getUrlDataFromMap() {
                return Enumerable
		            .From(urlMap)
		            .Where(function (item) {
		                return item.host.indexOf($location.host()) >= 0;
		            })
                    .FirstOrDefault();
            }

            function mapPath(sRelPath) {
                var nUpLn,
                    sDir = "",
                    sPath = $window.location.pathname.replace(/[^\/]*$/, sRelPath.replace(/(\/|^)(?:\.?\/+)+/g, "$1"));

                for (var nEnd, nStart = 0; nEnd = sPath.indexOf("/../", nStart), nEnd > -1; nStart = nEnd + nUpLn) {
                    nUpLn = /^\/(?:\.\.\/)*/.exec(sPath.slice(nEnd))[0].length;
                    sDir = (sDir + sPath.substring(nStart, nEnd)).replace(new RegExp("(?:\\\/+[^\\\/]*){0," + ((nUpLn - 1) / 3) + "}$"), "/");
                }

                return sDir + sPath.substr(nStart);
            }

            var defaultUrl = mapPath($document.find('script[src*=configurationProvider]').attr('src').replace('configurationProvider.js', '../../'));
            defaultUrl = defaultUrl.substr(0, defaultUrl.length - 1);

            var urlMap = [
                    { host: 'localhost', urls: { rest: constants.API_PROD_VEHICLE_URL, base: defaultUrl } },
                    //{ host: 'dev.com', urls: { rest: constants.API_DEV_VEHICLE_URL, base: defaultUrl } }, 
                    //{ host: 'uat.com', urls: { rest: constants.API_UAT_VEHICLE_URL, base: defaultUrl } },
                    { host: 'https://fbctrcsc.com', urls: { rest: constants.API_PROD_VEHICLE_URL, base: defaultUrl } },
                    { host: 'https://fbtrcsc.com', urls: { rest: constants.API_PROD_VEHICLE_URL, base: defaultUrl } },
                    { host: 'https://www.fbtrcsc.com', urls: { rest: constants.API_PROD_VEHICLE_URL, base: defaultUrl } },
                    { host: 'https://www.fbctrcsc.com', urls: { rest: constants.API_PROD_VEHICLE_URL, base: defaultUrl } }
            ];

            var urlData = getUrlDataFromMap();

            return {
                getVehicleApiUrl: function () {
                    return (urlData && urlData.urls.rest) ? urlData.urls.rest : defaultUrl + constants.API_LOCAL_VEHICLE_URI;
                },
                getBaseUrl: function () {
                    return (urlData && urlData.urls.base) ? urlData.urls.base : defaultUrl;
                }
            }
        }
    ];
});