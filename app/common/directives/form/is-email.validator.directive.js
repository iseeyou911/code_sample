/**
 * Created by Timofey Novitskiy on 12.02.2015.
 *
 * @name isEmail
 *
 * @description e-mail валидатор для ngModel, в случае если значения введенное в поле
 * не является e-mail-лом добавляет ошибку email. Имя валидатора - email
 *
 * @example
 *
 `
    <input ng-model="email" type="email" is-email="true">
 `
 */
define([
    ],
    function () {
        var EMAIL_VALIDATION_PATTERN = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        isEmail.$inject = [];
        isEmail.$name = 'isEmail';

        /**
         * @param {Scope} $scope
         */
        function isEmail() {
            return {
                require : 'ngModel',
                link : function link (scope, element, attrs, ngModelCtrl) {
                    ngModelCtrl.$validators.email = function ($modelValue, $viewValue) {
                        return EMAIL_VALIDATION_PATTERN.test($modelValue);
                    }
                }
            };
        }

        return isEmail
    });