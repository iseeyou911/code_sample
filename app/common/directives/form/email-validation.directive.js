/**
 * Created by Timofey Novitskiy on 12.02.2015.
 */
define([
    ],
    function () {
        var EMAIL_VALIDATION_PATTERN = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        EmailValidator.$inject = [];
        /**
         * @param {Scope} $scope
         */
        function EmailValidator() {
            return {
                require : 'ngModel',
                link : function link (scope, element, attrs, ngModelCtrl) {
                    ngModelCtrl.$validators.email = function ($modelValue, $viewValue) {
                        return EMAIL_VALIDATION_PATTERN.test($modelValue);
                    }
                }
            };
        }

        return EmailValidator
    });