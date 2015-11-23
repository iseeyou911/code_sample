/**
 * Created by Timofey Novitskiy on 12.02.2015.
 */
define([],
    function () {
        return function eventListenerFactory (event) {
            return function ($scope, listener) {
                return $scope.$on(event, listener);
            };
        }
    });
