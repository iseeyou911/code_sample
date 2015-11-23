/**
 * Created by Timofey Novitskiy on 27.04.2015.
 */
/**
 * Created by Timofey Novitskiy on 11.02.2015.
 */

define([
        'app/common/components/tooltip.directive',
        'app/common/components/tabs-panel/tabs-panel.module',
        'app/common/components/tree-view/tree-view.module',
        'app/common/components/popup/popup.module',
        'app/common/components/menu/menu.module',
        'app/common/components/progress-bar/progress-bar.module',
        'app/common/components/suggestions-list/suggestions-list.module'
    ],
    function (Tooltip) {
        angular.module('common.components', [
            'common.components.tree-view',
            'common.components.tabs-panel',
            'common.components.popup',
            'common.components.menu',
            'common.components.progress-bar',
            'common.components.suggestions-list'
        ])
            .directive('eTooltip', Tooltip);

    });
