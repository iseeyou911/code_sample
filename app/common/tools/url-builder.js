/**
 * Created by Timofey Novitskiy on 11.02.2015.
 */

define(['_'],
    function (_) {

        /**
         *
         * Build url from parts
         *
         * @param {String} baseUrl it was prepend to url
         * @param {String} url url string may contain placeholders for params
         * @param {String|Function} prefix string or function, that return string,
         * that add between url and baseUrl
         * @param params params for placeholders
         *
         * @returns {String}
         *
         * @example
         *
         `
         var isAdmin = true;
         var url = urlBuilder('http://localhost/api',
         'entry/remove/${id}',
         function(baseUrl, url){return isAdmin ? 'admin' : ''},
         {id: 1});

         expect(url).to.be.eq('http://localhost/api/admin/entry/remove/1');
         `
         */
        function urlBuilder(baseUrl, url, prefix, params) {
            var result;
            prefix = prefix || '';
            url = url || '';

            if (_.isFunction(prefix)) {
                prefix = prefix(baseUrl.replace(/\/$/, ''), url.replace(/^\//, ''));
            }

            result = baseUrl.replace(/\/$/, '') + (prefix ? prefix.replace(/^\/?/, '/').replace(/\/?$/, '/') : '/') + url.replace(/^\//, '');

            if (params) {
                result = result.replace(/\$\{([^}]*)}/gi, function (placeholder, paramName) {
                    return encodeURIComponent(params[paramName] || "");
                });
            }

            return result;
        }

        return urlBuilder;
    });