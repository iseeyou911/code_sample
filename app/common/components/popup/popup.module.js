/**
 * Created by Timofey Novitskiy on 13.03.2015.
 */
define([
    'app/common/components/popup/popup.factory',
    'app/common/components/popup/popup.srv',
    'app/common/components/popup/popup.directive',
], function(PopupFactory, PopupService, PopupDirective){
    angular.module('common.components.popup', [])
        .service('PopupService', PopupService)
        .service('popupFactory', PopupFactory)
        .directive('ePopup', PopupDirective);
});