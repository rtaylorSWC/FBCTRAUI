angular.module('FBCApp')
  .filter('translateFilter', ['$translate',
    function ($translate) {
        return function (input, param) {
            if (!param) {
                return input;
            }
            var searchVal = param.key.toLowerCase();
            var result = [];
            angular.forEach(input, function (value) {
                var translated = $translate(value.key);
                if (translated.toLowerCase().indexOf(searchVal) !== -1) {
                    result.push(value);
                }
            });
            return result;
        };
    }
  ]);