/**
 * Created by Timofey Novitskiy on 11.02.2015.
 */

define(function () {
    return function urlBuilder(baseUrl, url, prefix) {
        prefix = prefix || '';
        url = url || '';

        if (angular.isFunction(prefix)) {
            return prefix(baseUrl.replace(/\/$/, ''), url.replace(/^\//, ''));
        } else {
            return baseUrl.replace(/\/$/, '') + (prefix ? prefix.replace(/^\/?/, '/').replace(/\/?$/, '/') : '/') + url.replace(/^\//, '');
        }
    }
});