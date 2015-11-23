/**
 * Created by Timofey Novitskiy on 16.04.2015.
 */
define([
        'app/common/components/tabs-panel/tabs-panel.directive',
        'app/common/components/tabs-panel/tab.directive'
    ],
    function (TabsPanelDirective, TabDirective) {
        angular.module('common.components.tabs-panel', [])
            .directive('eTab', TabDirective)
            .directive('eTabsPanel', TabsPanelDirective);
    });