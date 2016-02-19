/**
 * Created by Timofey Novitskiy on 27.04.2015.
 *
 * @name eMenu
 *
 * @description
 * Директива контекстного меню, контент директивы содержит шаблон элемента,
 *
 * @param {Number|String|Object} eMenu сылка на
 * элемент скопа, содержащий список элементов меню, элемент может быть либо простым значением
 * либо объектом
 * @param {Expression} isVisible колбек, вызывается для определения видим ли элемент меню,
 * в колбек передается параметр $item содежащий текущий элемент меню
 * @param {String} eMenuShowEvent имя события по которому будет открываться меню, должно
 * быть уникальное
 * @param {Expression} onSelect колбек, вызываемый при клике на элемент меню,
 * в колбек передается параметр $item содежащий текущий элемент меню
 * @param {String} eMenuId идентификатор меню, если не указан, генерируется автоматически
 * @example
 *
 * Пример разметки
 `<div
 e-menu="element.actions.inline"
 is-visible="$item.isVisible()"
 e-menu-show-event="{{element.name}}:show:inline:actions:menu"
 on-select="$item.doAction()">
 <span ng-bind-html="$item.label"></span>
 </div>`
 *
 * Вызов события
 *
 * $scope.$broadcast($scope.element.name + ':show:inline:actions:menu', event);
 *
 */
define([
        'text!./menu.tmpl.html',
        'app/common/components/menu/menu.controller'
    ],
    function (template, MenuController) {
        MenuDirective.$inject = [];
        MenuDirective.$name = 'eMenu';

        function MenuDirective() {
            var directive = {
                template: template,
                transclude: true,
                scope: {
                    isVisible: '&',
                    items: '=eMenu',
                    eMenuShowEvent: '@eMenuShowEvent',
                    onSelect: '&',
                    eMenuId: '@'
                },
                require: 'eMenu',
                link: function link(scope, element, attrs, menuController, transclude) {
                    scope.$on(scope.eMenuShowEvent, function (descr, event) {
                        menuController.show(event);
                    });

                    scope.onSelectMenuItem = function onSelectMenuItem(item) {
                        scope.onSelect({
                            $item: item
                        });
                    };

                    scope._isVisible = function (item) {
                        return scope.isVisible ? scope.isVisible({
                            $item: item
                        }) : true;
                    }
                }
            };

            return angular.extend(directive, MenuController);
        }

        return MenuDirective;
    });