/**
 * Created by Timofey Novitskiy on 24.03.2015.
 */

define([],
    function () {
        ioFile.$inject = [];

        /**
         *
         */
        function ioFile() {
            return {
                scope: {
                    ioFile: '='
                },
                priority: 0,
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, iElement, iAttrs, ngModelController) {
                    iElement.bind('change', function (event) {
                        scope.$apply(function () {
                            var viewValue = ngModelController.$viewValue,
                                value = Array.prototype.slice.apply(iElement[0].files);
                            value
                                .forEach(function(file){
                                file.ext = file.name.match(/\.(.*)$/)[1];
                            });

                            ngModelController.$setViewValue(viewValue ? viewValue.concat(value) : value);
                            iElement[0].files = [];
                        });
                    });
                }
            };
        }

        return ioFile;
    });