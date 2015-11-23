/**
 * Created by Timofey Novitskiy on 16.04.2015.
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
                    tab: '=eTab',
                    isClosable : '=',
                    needToReloadLayout : '@'
                },
                replace : true,
                require: '^eTabsPanel',
                link: function link(scope, tElement, tAttrs, controller) {
                    controller.transcludeFn(scope, function(clone){
                        tElement.find('[tab-content]').replaceWith(clone);
                    });
                    scope.reloadLayout = function reloadLayout(){
                        controller.layout();
                    }
                }
            };
        }

        return Tab;
    });
