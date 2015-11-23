/**
 * Created by Timofey Novitskiy on 11.02.2015.
 */
define([
    ],
    function () {
        IsIdentValidation.$inject = ['$parse'];

        function IsIdentValidation ($parse) {
            return {
                require : 'ngModel',
                link : function link (scope, element, attrs, ngModel) {
                    var value = $parse(attrs.isIdent),
                        realValue;

                    scope.$watch(attrs.isIdent + '.$modelValue', function () {
                        ngModel.$validate();
                    });

                    ngModel.$validators.isIdent = function ($modelValue, $viewValue) {
                        if (!realValue) {
                            realValue = value(scope);
                        }

                        return realValue.$modelValue === $modelValue || realValue.$pristine;
                    }
                }
            };
        }

        return IsIdentValidation;
    });