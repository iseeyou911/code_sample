/**
 * Created by Timofey Novitskiy on 11.02.2015.
 *
 * @name isIdent
 *
 * @description Валидатор для ngModel, проверяет равно ли значениполя указанному
 * значению из скопа.
 * В случае если поле невалидно в контроллер ngModel добавляется ошибка isIdent
 * Ошибка добавляется только если контроллер ngModel помечен как $dirty
 *
 * @param {String} isIdent имя сопостоваляемого поля из скопа
 *
 * @example
 `
 <input ng-model="field1" type="input" is-ident="field2">
 `
 */
define([
    '_'
    ],
    function (_) {
        IsIdent.$inject = ['$parse'];
        IsIdent.$name = 'isIdent';

        function IsIdent($parse) {
            return {
                require : 'ngModel',
                link : function link (scope, element, attrs, ngModel) {
                    var value = $parse(attrs.isIdent),
                        realValue;

                    scope.$watch(attrs.isIdent, function () {
                        realValue = value(scope);
                        ngModel.$validate();
                    });

                    ngModel.$validators.isIdent = function ($modelValue, $viewValue) {
                        return _.isEmpty($modelValue) && _.isEmpty(realValue) || realValue === $modelValue;
                    }
                }
            };
        }

        return IsIdent;
    });