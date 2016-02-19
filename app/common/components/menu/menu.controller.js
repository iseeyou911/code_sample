/**
 * Created by Timofey Novitskiy on 27.04.2015.
 *
 * @name MenuController
 *
 * @description
 * Контроллер для директивы eMenu
 *
 * @see eMenu
 *
 */
define(['_'],
    function (_) {
        MenuController.$inject = ['$scope', 'MenuService'];
        /**
         * @param {Scope} $scope
         */
        function MenuController($scope, MenuService) {
            var self = this,
                id = $scope.eMenuId || 'e-menu-id-autogen-' + _.uniqueId();

            this.items = [];
            this.menuService = MenuService;

            this.init = function init (scope, element, transcludeFn) {
                this.menuService.init(this, transcludeFn);

                $scope.$on('$destroy', function (event) {
                    self.menuService.remove(id);
                    delete self.menuService;
                });
            };

            this.getId = function getId(){
                return id;
            }
        }

        /**
         * Show menu
         *
         * @param {DOMEvent} event
         */
        MenuController.prototype.show = function show (event) {
            this.menuService.show(this.getId(), event);
        };

        /**
         * Hide menu
         */
        MenuController.prototype.hide = function hide () {
            this.menuService.hide(this.getId());
        };

        /**
         * add menu item
         *
         * @param item
         */
        MenuController.prototype.addItem = function addItem (item) {
            this.items.push(item);
        };

        return {
            controller: MenuController,
            controllerAs: 'eMenuController'
        };
    });