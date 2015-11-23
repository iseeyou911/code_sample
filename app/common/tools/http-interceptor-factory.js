/**
 * Created by Timofey Novitskiy on 13.02.2015.
 */
define([],
    function () {
        /**
         *
         * This factory return ready to register http interceptor
         *
         * @param {String} interceptorName
         * @param {function} interceptor
         */
        return function HttpInterceptorFactory (interceptorName, interceptor) {
            Interceptor.$inject = ['$provide', '$httpProvider'];

            function Interceptor ($provide, $httpProvider) {
                $provide.factory(interceptorName, interceptor);
                $httpProvider.interceptors.push(interceptorName);
            }

            return Interceptor;
        }

    });
