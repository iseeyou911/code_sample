/**
 * Created by Timofey Novitskiy on 17.02.2015.
 */

define([
        'text!./tree-view.tmpl.html',
        'app/common/utils/string-utils'
    ],
    function (template, StringUtils) {
        ETreeView.$inject = ['$compile', '$parse'];

        /**
         *
         */
        function ETreeView ($compile, $parse) {
            return {
                scope : true,
                restrict : 'A',
                template : template,
                transclude : true,
                controllerAs : 'eTreeViewController',
                require : ['eTreeView', '?ngModel'],
                controller : ['$scope', function($scope) {
                    var ngModelCtrl, onSelect, filter,
                        self = this, getChildren, hasChildren;

                    this.init = function(_ngModelCtrl, _onSelect,
                                         _getChildren, _hasChildren, _filter) {
                        ngModelCtrl = _ngModelCtrl;
                        onSelect = _onSelect;
                        getChildren = _getChildren;
                        hasChildren = _hasChildren;
                        filter = _filter;
                    };

                    this.getChildren = function(item) {
                        return getChildren ? getChildren($scope, {$item : item}) : item.children;
                    };

                    this.hasChildren = function(item) {
                        return hasChildren ? hasChildren($scope, {$item : item}) : item.children && item.children.length > 0;
                    };

                    this.applyFilter = function applyFilter(filterValue) {
                        $scope.filteredItems = filter($scope, {
                            $items : $scope.items,
                            $filter : filterValue
                        });
                    };

                    this.select = function(item, parent, index, event) {
                        ngModelCtrl && ngModelCtrl.$setViewValue(item);
                        return onSelect($scope, {
                            $item : item,
                            $parent : parent,
                            $index : index,
                            $event : event
                        });
                    };
                }],

                link : function($scope, iElement, iAttr, ctrls) {
                    var treeViewCtrl = ctrls[0],
                        ngModelCtrl = ctrls[1],
                        onSelect = $parse(iAttr.onSelect),
                        filter = $parse(iAttr.filter),
                        getChildren = iAttr.getChildren && $parse(iAttr.getChildren),
                        hasChildren = iAttr.hasChildren && $parse(iAttr.hasChildren),
                        filterValue = $parse(iAttr.filterValue);

                    treeViewCtrl.init(ngModelCtrl, onSelect, getChildren, hasChildren, filter);

                    $scope.isChild = function(item) {
                        return item.isFolder;
                    };

                    iAttr.$observe('filterValue', function(value){
                        $scope.items && treeViewCtrl.applyFilter(value);
                    });

                    $scope.$watch(iAttr.eTreeView, function(newValue, oldValue) {
                        if (newValue && !angular.isArray(newValue)) {
                            newValue = [newValue];
                        } else if (!newValue){
                            newValue = [];
                        }

                        $scope.items = newValue;
                        treeViewCtrl.applyFilter(filterValue($scope));
                    });
                }
            };
        }

        return ETreeView;
    });