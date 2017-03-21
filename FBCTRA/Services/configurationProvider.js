angular.module('ConfigurationModule', [])
.constant('constants', {
    //Consumer API URLs
    API_LOCAL_CONSUMER_URI: 'localhost:3000/api',
    API_DEV_CONSUMER_URL: '//dev/api', 
    API_UAT_CONSUMER_URL: '//uat/api',
    API_PROD_CONSUMER_URL: '//prod/api',

    //Agent API URLs
    API_LOCAL_AGENT_URI: 'localhost:3000/api',
    API_DEV_AGENT_URL: '//dev/api',
    API_UAT_AGENT_URL: '//uat/api',
    API_PROD_AGENT_URL: '//prod/api',
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
                    //{ host: 'localhost', urls: { rest: defaultUrl + constants.API_LOCAL_URI, base: defaultUrl, referral: constants.API_DEV_REFFERAL_URL } },
                    { host: 'localhost', urls: { rest: constants.API_DEV_CONSUMER_URL, base: defaultUrl, agent: constants.API_DEV_AGENT_URL } },
                    { host: 'dev.com', urls: { rest: constants.API_DEV_CONSUMER_URL, base: defaultUrl, agent: constants.API_DEV_AGENT_URL } },
                    { host: 'uat.com', urls: { rest: constants.API_UAT_CONSUMER_URL, base: defaultUrl, agent: constants.API_DEV_AGENT_URL } },
                    { host: 'prod.com', urls: { rest: constants.API_PROD_CONSUMER_URL, base: defaultUrl, agent: constants.API_PROD_AGENT_URL } }
            ];

            var urlData = getUrlDataFromMap();

            return {
                getConsumerApiUrl: function () {
                    return (urlData && urlData.urls.rest) ? urlData.urls.rest : defaultUrl + constants.API_LOCAL_CONSUMER_URI;
                },
                getAgentApiUrl: function () {
                    return (urlData && urlData.urls.agent) ? urlData.urls.agent : defaultUrl + constants.API_LOCAL_AGENT_URI;
                },
                getBaseUrl: function () {
                    return (urlData && urlData.urls.base) ? urlData.urls.base : defaultUrl;
                }
            }
        }
    ];
});