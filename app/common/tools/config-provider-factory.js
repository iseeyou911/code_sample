/**
 * Created by Timofey Novitskiy on 04.02.2015.
 */

define([], function () {
    return function ConfigProviderFactory (defaultConfig) {
        return function ConfigProvider () {
            var params, service;
            params = angular.extend({}, defaultConfig || {});

            service = {
                set: function (paramsObjOrParamName, value) {
                    if (angular.isString(paramsObjOrParamName) && arguments.length === 2) {
                        params[paramsObjOrParamName] = value;
                    } else if (angular.isObject(paramsObjOrParamName)) {
                        set(paramsObjOrParamName);
                    }
                },
                get: function (paramName) {
                    return params[paramName];
                }
            };

            function set(_params) {
                angular.extend(params, _params);
            }

            return {
                init: function (_params) {
                    set(_params);
                },
                $get: function () {
                    return service;
                }
            };
        };
    };
});
