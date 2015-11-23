/**
 * Created by Timofey Novitskiy on 14.05.2015.
 */
define([
    ],
    function () {
        isDirtyDirective.$inject = [];
        isDirtyDirective.$name = 'eIsDirty';
        /**
         *
         */
        function isDirtyDirective() {
            return {
                require : 'ngModel',
                scope : {
                    isDirty : '=eIsDirty',
                    once : '='
                },
                link: function link(scope, element, attrs, ngModelCtrl, transclude) {
                    if (scope.once) {
                        setDirty(scope.isDirty);
                        scope.$destroy();
                    } else {
                        scope.$watch('isDirty', function(isDirty){
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