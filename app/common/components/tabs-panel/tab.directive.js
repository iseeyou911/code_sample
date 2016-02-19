/**
 * Created by Timofey Novitskiy on 16.04.2015.
 *
 * @name eTab
 *
 * @description вкладка, @see eTabsPanel
 *
 */
define([
        'text!./tab.tmpl.html'
    ],
    function (template) {
        Tab.$inject = [];
        Tab.$name = 'eTab';

        function Tab() {
            return {
                template: template,
                restrict: 'A',
                scope: {
                    $tab: '=eTab',
                    isClosable: '=',
                    needToReloadLayout: '@'
                },
                replace: true,
                require: '^eTabsPanel',
                link: function link(scope, tElement, tAttrs, controller) {
                    var node;
                    controller.transcludeFn(scope, function (clone) {
                        node = clone;
                        tElement.find('[tab-content]').replaceWith(clone);
                    });

                    scope.ctrl = function () {
                        return controller;
                    };

                    scope.$on('$destroy', function () {
                        node.remove();
                    });

                    scope.reloadLayout = function reloadLayout() {
                        controller.layout();
                    }
                }
            };
        }

        return Tab;
    });
