/**
 * Created by Timofey Novitskiy on 27.04.2015.
 */
define([
    'app/common/components/menu/menu.directive',
    'app/common/components/menu/menu-item.directive',
    'app/common/components/menu/menu-transcluder.directive',
    'app/common/components/menu/menu.srv'
],function (MenuDirective, MenuItemDirective, MenuTranscluderDirective, MenuService) {
    angular.module('common.components.menu', [])
        .directive(MenuDirective.$name, MenuDirective)
        .directive(MenuItemDirective.$name, MenuItemDirective)
        .directive(MenuTranscluderDirective.$name, MenuTranscluderDirective)
        .service(MenuService.$name, MenuService);
});
