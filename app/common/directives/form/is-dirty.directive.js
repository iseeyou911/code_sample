/**
 * Created by Timofey Novitskiy on 14.05.2015.
 *
 * @name eIsDirty
 *
 * @description позволяет контролировать параметр $dirty/$pristine ngModel с помощью
 * параметров скопа, в частности позволяет задать начальное значение для $dirty/$pristine
 *
 * @param {String} eIsDirty имя поля скопа, согласно которому
 * определеяется значение $dirty/$pristine
 * @param {*} once если атрибут указан, то проверка будет происходить
 * только при линке директивы со скопом
 *
 `
 <input ng-model="email" type="email" once="true" e-is-dirty="isDirty">
 `
 */
define([
    ],
    function () {
        isDirtyDirective.$inject = ['$parse'];
        isDirtyDirective.$name = 'eIsDirty';
        /**
         *
         */
        function isDirtyDirective($parse) {
            return {
                priority: 10,
                require : 'ngModel',
                link: function link(scope, element, attrs, ngModelCtrl, transclude) {
                    var isDirtyParsed = $parse(attrs[isDirtyDirective.$name]);
                    if (attrs.once) {
                        setDirty(isDirtyParsed(scope));
                    } else {
                        scope.$watch(attrs[isDirtyDirective.$name], function(isDirty){
                            setDirty(isDirty);
                        });
                    }

                    function setDirty (isDirty) {
                        ngModelCtrl[isDirty ? '$setDirty' : '$setPristine']();
                    }
                }
            }
        }

        return isDirtyDirective;
    });