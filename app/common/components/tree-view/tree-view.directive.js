/**
 * Created by Timofey Novitskiy on 17.02.2015.
 *
 * @name eTreeView
 *
 * @description компонент дерева, поддерживает пользовательские шаблоны для элементов
 *
 * @param {Expression} isOpened выражение должно возвращать true если элемент расскрыт по умолчанию
 * @param {Expression} hasChildren выражение должно возвращать true если у элемента
 * есть потомки и false если нет, в выражение передается аргумент $item - текущий элемент
 * @param {Expression} getChildren выражение должно возвращать список потомков элемента, в
 * выражение передается аргумент $item - текущий элемент
 * @param {Array} eTreeView список элементов верхнего уровня
 * @param {Expression} filter функция фильтрации элементов, получает два параметра:
 *      $items - список элементов
 *      $filter - текущий фильтр должна вернуть отфильтрованный список элементовю
 * @param {String} filterValue свойство скопа содержащее значение текущего фильтра
 * @param {Expression} onSelect выражение, вызваемое при клике на элемент, получает параметры:
 *      $item - текущий элемент
 *      $parent - родительский элемент
 *      $index - номер текущего элемента
 *      $event - событие клика
 * Если выражение вернет false, то элемент списка не расскроетеся
 * @param {parentController} родительский контролер, если необходимо вызывать какие либо
 * методы из контролера элемента в который вставляется дерево, можно использовать этот параметр
 *
 *
 * @example
 *
 `
 <div class="menu-tree"
    get-children="$item.children"
    parent-controller="platformController"
    has-children="$item.children.length > 0"
    on-select="platformController.onSelectMenuItem($item, $parent, $index, $event)"
    e-tree-view="platformController.menu.elements">
        <span class="menu-tree-element"
            ng-click="$event.preventDefault()"
            ng-class="{'has-icon' : !!$item.icon,
            active: parentController.isActiveWindow($item.branchId, $item.fid)}">
            <span title="{{::$item.name}}"
                    class="menu-icon"
                    ng-bind-html="::$item.icon"></span></i>
            <span ng-if="!parentController.isSideBarHidden()">{{::$item.name}}</span>
            <sup ng-show="$item.count">({{$item.count}})</sup>
        </span>
 </div>
 `
 *
 */

define([
        'text!./tree-view.tmpl.html',
        'app/common/utils/string-utils',
        'angular'
    ],
    function (template, StringUtils, angular) {
        ETreeView.$inject = [];
        ETreeView.$name = 'eTreeView';
        /**
         *
         */
        function ETreeView() {
            return {
                restrict: 'A',
                template: template,
                transclude: true,
                controllerAs: 'eTreeViewController',
                require: ['eTreeView', '?ngModel'],
                scope: {
                    isOpened: '&',
                    hasChildren: '&',
                    filter: '&',
                    items: '=eTreeView',
                    getChildren: '&',
                    filterValue: '=',
                    onSelect: '&',
                    parentController: '='
                },
                controller: ['$scope', function ($scope) {
                    var ngModelCtrl;

                    this.init = function init(_ngModelCtrl) {
                        ngModelCtrl = _ngModelCtrl;
                    };

                    this.getChildren = function getChildren(item) {
                        return $scope.getChildren({
                            $item: item
                        });
                    };

                    this.isOpened = function isOpened(item) {
                        return $scope.isOpened({
                            $item: item
                        });
                    };

                    this.hasChildren = function hasChildren(item) {
                        return $scope.hasChildren({
                            $item: item
                        });
                    };

                    this.applyFilter = function applyFilter() {
                        var filteredElements = $scope.filter({
                            $items: $scope.items,
                            $filter: $scope.filterValue
                        });

                        $scope.filteredItems = filteredElements == null ? $scope.items : filteredElements;
                    };

                    this.select = function select(item, parent, index, event) {
                        ngModelCtrl && ngModelCtrl.$setViewValue(item);
                        return $scope.onSelect({
                            $item: item,
                            $parent: parent,
                            $index: index,
                            $event: event
                        });
                    };
                }],

                link: function (scope, iElement, iAttr, ctrls) {
                    var treeViewCtrl = ctrls[0],
                        ngModelCtrl = ctrls[1];

                    treeViewCtrl.init(ngModelCtrl);

                    scope.$watch('filterValue', function () {
                        scope.items && treeViewCtrl.applyFilter();
                    });

                    scope.$watch('items', function (newValue, oldValue) {
                        treeViewCtrl.applyFilter();
                    });

                    scope.$on('$destroy', function(){
                        iElement.remove();
                    });
                }
            };
        }

        return ETreeView;
    });