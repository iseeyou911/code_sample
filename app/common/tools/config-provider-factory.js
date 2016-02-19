/**
 * Created by Timofey Novitskiy on 04.02.2015.
 */

define(['_'], function (_) {
    return function ConfigProviderFactory (defaultConfig) {
        return function ConfigProvider () {
            var params, service;
            params = _.assign({}, defaultConfig || {});

            service = {
                set: function (paramsObjOrParamName, value) {
                    if (_.isString(paramsObjOrParamName) && arguments.length === 2) {
                        params[paramsObjOrParamName] = value;
                    } else if (_.isObject(paramsObjOrParamName)) {
                        set(paramsObjOrParamName);
                    }
                },
                get: function (paramName) {
                    return params[paramName];
                }
            };

            function set(_params) {
                _.assign(params, _params);
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
