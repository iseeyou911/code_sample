/**
 * Created by Timofey Novitskiy on 28.04.2015.
 *
 * @name eMenuItem
 *
 * @description
 * Директива пункта меню
 *
 * @see eMenu
 */
define([
        'text!./menu-item.tmpl.html'
    ],
    function (template) {
        MenuItemDirective.$inject = [];
        MenuItemDirective.$name = 'eMenuItem';
        /**
         *
         */
        function MenuItemDirective() {
            return {
                template: template,
                require: ['?^eMenu', '^eMenuTranscluder'],
                scope: {
                    $item: '=eMenuItem'
                },
                controller : function () {},
                compile: function compile(cElement, cAttrs, transclude) {
                    return function link(scope, element, attrs, controllers) {
                        var eMenuTranscluderCtrl = controllers[1],
                            eMenuCtrl = controllers[0] || eMenuTranscluderCtrl.getMenuController();

                        transclude(scope.$new(), function (clone) {
                            element.find('[role="menuitem"]').append(clone);
                        });

                        scope.hide = function hide() {
                            eMenuCtrl.hide();
                        }
                    };
                }
            }
        }

        return MenuItemDirective;
    });