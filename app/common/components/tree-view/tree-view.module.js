/**
 * Created by Timofey Novitskiy on 17.02.2015.
 */
define([
    'app/common/components/tree-view/tree-view.directive',
    'app/common/components/tree-view/tree-view-node.directive'
],function (TreeViewDirective, TreeViewNodeDirective) {
    angular.module('common.components.tree-view', [])
        .directive('eTreeViewNode', TreeViewNodeDirective)
        .directive('eTreeView', TreeViewDirective);
});