/**
 * Created by Timofey Novitskiy on 13.03.2015.
 */

define([
        'text!./popup.tmpl.html',
        'text!./modal.tmpl.html'
    ],
    function (template, modalTemplate) {
        PopupDirective.$inject = ['$compile'];

        /**
         *
         */
        function PopupDirective($compile) {
            return {
                transclude: true,
                controller: ['$scope', '$element', function ($scope, $element) {
                    this.close = function close() {
                        $scope.popup().destroy();
                    };
                    this.getElement = function getElement () {
                        return $element;
                    }
                }],
                controllerAs : 'popupController',
                compile: function compile(cElement, cAttrs) {
                    var isModal = cAttrs.isModal === 'true',
                        linker = $compile(isModal ? modalTemplate : template);

                    return function link(scope, element, attrs, controllers, transclude) {
                        linker(scope, function (clone, scope) {
                            element.append(clone);
                            transclude(function (clone) {
                                element
                                    .find('[e-transclude]')
                                    .append(clone);
                            });
                        }, {
                            transcludeControllers: scope.popup().controllers
                        });
                        scope.template = {
                            size : [attrs.modalSize || '']
                        };

                        scope.getTitle = typeof scope.title === 'function' ? scope.title : function () {
                            return scope.title;
                        }
                    };
                }
            }
        }

        return PopupDirective;
    });