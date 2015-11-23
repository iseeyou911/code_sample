/**
 * Created by Timofey Novitskiy on 27.04.2015.
 */
define([
        'text!./menu.tmpl.html',
        'app/common/components/menu/menu.controller'
    ],
    function (template, MenuController) {
        MenuDirective.$inject = [];
        MenuDirective.$name = 'eMenu';

        /**
         *Menu directive
         */
        function MenuDirective() {
            var directive = {
                template: template,
                transclude: true,
                scope: {
                    items: '=eMenu',
                    eventDispatcher: '=eMenuEventDispatcher',
                    onSelect: '&'
                },
                require: 'eMenu',
                link: function link(scope, element, attrs, menuController, transclude) {
                    scope.$on(attrs.eMenuShowEvent, function (descr, event, rowIndex, colIndex) {
                        menuController.show(event);
                    });

                    scope.onSelectMenuItem = function onSelectMenuItem(item) {
                        scope.onSelect({
                            $item: item
                        });
                    }
                }
            };

            return angular.extend(directive, MenuController);
        }

        return MenuDirective;
    });