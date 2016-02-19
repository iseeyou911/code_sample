/**
 * Created by Timofey Novitskiy on 17.02.2015.
 *
 * @name eTreeViewNode
 *
 * @description элемент @see eTreeView
 *
 */

define([
        'text!./tree-view-node.tmpl.html'
    ],
    function (template) {
        ETreeViewNode.$inject = ['$compile'];

        /**
         *
         */
        function ETreeViewNode ($compile) {
            return {
                restrict : 'A',
                require : ['^eTreeView', '^^?eTreeViewNode', 'eTreeViewNode'],
                controller : ['$scope', function($scope) {
                    this.getItem = function() {
                        return $scope.$item;
                    };
                }],
                compile : function() {
                    return function(scope, iElement, iAttr, ctrls, transclude) {
                        var
                            treeViewCtrl = ctrls[0],
                            parentTreeNode = ctrls[1],
                            clone,
                            tScope;

                        $compile(template, transclude)(scope, function(_clone, scope){
                            iElement.append(_clone);
                            clone = _clone;
                        });

                        scope.opened = treeViewCtrl.isOpened(scope.$item);

                        scope.getChildren = function() {
                            var item = scope.$item;
                            return treeViewCtrl.getChildren(item);
                        };

                        scope.hasChildren = function() {
                            var item = scope.$item;
                            return treeViewCtrl.hasChildren(item);
                        };

                        scope.select = function(event) {
                            var result = treeViewCtrl.select(scope.$item, scope.$parent && scope.$parent.$item, scope.$index, event);
                            if (result !== false) {
                                scope.opened = !scope.opened;
                            }
                        };

                        scope.$on('$destroy', function(){
                            iElement.remove();
                        });
                    };
                }
            };
        }

        return ETreeViewNode;
    });