/**
 * Created by Timofey Novitskiy on 17.02.2015.
 */
define([
    'app/common/components/tree-view/tree-view.directive',
    'app/common/components/tree-view/tree-view-node.directive',
    'angular'
],function (TreeViewDirective, TreeViewNodeDirective, angular) {
    angular.module('common.components.tree-view', [])
        .directive('eTreeViewNode', TreeViewNodeDirective)
        .directive(TreeViewDirective.$name, TreeViewDirective);
});