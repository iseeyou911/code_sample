/**
 * Created by Timofey Novitskiy on 27.04.2015.
 *
 * @name MenuService
 *
 * @description
 * Сервис для управления контекстными меню
 *
 */
define([],
    function () {
        var idPull = 1;

        MenuService.$inject = ['$timeout'];
        MenuService.$name = 'MenuService';

        /**
         *
         */
        function MenuService($timeout) {
            this.menus = {};
            this.$timeout = $timeout;

            this.menuContainer = $('<div></div>').addClass('e-menu-container');
            $(document.body).append(this.menuContainer);

        }

        /**
         * Initialization of menu, place menu node to menus container
         *
         * @param {MenuController} menuController
         * @param {Function} transcludeFn
         */
        MenuService.prototype.init = function init(menuController, transcludeFn) {
            var self = this,
                id = menuController.getId();

            this.menus[id] = {
                id: id,
                controller: menuController
            };

            transcludeFn(function (clone) {
                self.menus[id].node = clone;
                self.menuContainer.append(clone);
            });
        };

        /**
         * Show menu
         *
         * @param {Number} id
         * @param {{pageX, pageY}} event
         * @param {MenuController} menuController
         */
        MenuService.prototype.show = function show(id, event) {
            var l = event.pageX,
                t = event.pageY,
                self = this,
                node = this.menus[id].node,
                menuNode = node.find('[role="menu"]');

            this.currentMenuId && this.hide(this.currentMenuId);

            menuNode.css({
                'top': t + 'px',
                'left': l + 'px',
                'zIndex': 10000000
            });

            node.addClass('open');

            $(document).on('click.esft.menu.' + id, function (event) {
                self.hide(id);
            });

            this.currentMenuId = id;
        };

        /**
         * Hide menu
         *
         * @param {Number} id
         *
         */
        MenuService.prototype.hide = function hide(id) {
            var node = this.menus[id].node;
            node.removeClass('open');
            this.currentMenuId = null;
            $(document).off('click.esft.menu');
        };

        /**
         * Remove menu
         *
         * @param {Number} id
         *
         */
        MenuService.prototype.remove = function remove(id) {
            var menu = this.menus[id];
            $(document).off('click.esft.menu');
            this.menus[id].node.remove();
            delete this.menus[id];
            this.currentMenuId = null;
        };

        return MenuService
    });
