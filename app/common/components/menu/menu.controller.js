/**
 * Created by Timofey Novitskiy on 27.04.2015.
 */
define([],
    function () {
        MenuController.$inject = ['$scope', 'MenuService'];
        /**
         * @param {Scope} $scope
         */
        function MenuController($scope, MenuService) {
            var self = this;

            this.items = [];
            this.menuService = MenuService;

            this.init = function init (scope, element, transcludeFn) {
                this.menuService.init(this, transcludeFn);

                $scope.$on('$destroy', function (event) {
                    self.menuService.remove(self.id);
                    delete self.menuService;
                });
            };
        }

        /**
         *
         * @param {DOMEvent} event
         */
        MenuController.prototype.show = function show (event) {
            this.menuService.show(this.id, event);
        };

        MenuController.prototype.hide = function hide () {
            this.menuService.hide(this.id);
        };

        MenuController.prototype.addItem = function addItem (item) {
            this.items.push(item);
        };

        return {
            controller: MenuController,
            controllerAs: 'eMenuController'
        };
    });