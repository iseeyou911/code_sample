/**
 * Created by Timofey Novitskiy on 28.04.2015.
 */
define([],
    function () {
        MenuTranscluderDirective.$inject = [];
        MenuTranscluderDirective.$name = 'eMenuTranscluder';
        /**
         *
         */
        function MenuTranscluderDirective() {
            return {
                transclude: 'element',
                require : ['^eMenu', 'eMenuTranscluder'],
                controller : function controller () {
                    var eMenuController;
                    this.init = function init (_eMenuController) {
                        eMenuController = _eMenuController;
                    };

                    this.getMenuController = function getMenuController(){
                        return eMenuController;
                    };
                },
                link : function link(scope, element, attrs, controllers, transclude) {
                        var menuController = controllers[0];

                        controllers[1].init(menuController);
                        menuController.init(scope, element, transclude);

                }
            }
        }

        return MenuTranscluderDirective;
    });