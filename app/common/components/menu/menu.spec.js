/**
 * Created by Timofey Novitskiy on 27.04.2015.
 */

define([
    'angular',
    'app/common/components/menu/menu.module'
], function () {
    describe("eMenu ", function () {
        var $compile,
            $rootScope,
            element,
            MenuService;

        beforeEach(module('common.components.menu'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _MenuService_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            MenuService = _MenuService_;
        }));

        it('directive and  controller', function () {
            var menuId = 'test-menu-id';
            $rootScope.menuElements = [{label: 1}, {
                label: 2, isVisible: function () {
                    return false;
                }
            }, 6];

            element = $compile('<div ' +
                'e-menu-id="' + menuId + '"' +
                'is-visible="$item.hasOwnProperty(\'isVisible\') ? $item.isVisible() : true"' +
                'e-menu="menuElements"' +
                'e-menu-show-event="show:menu"' +
                '>' +
                '<span>{{$item.label || $item}}</span></div>'
            )
            ($rootScope);

            $rootScope.$digest();

            expect($('body'), 'e-menu-container should be in body').to.have
                .descendants('.e-menu-container');

            expect($('.e-menu-container'),
                'e-menu node should be trunscluded to e-menu-container')
                .to.have
                .descendants('div.e-menu');

            var menuWrapperNode = $('.e-menu-container div.e-menu');
            var menuNode = $('.dropdown-menu', menuWrapperNode);

            expect($(' li', menuNode), '2 visible menu elements')
                .length(2);

            expect(menuWrapperNode, 'it should be closed')
                .to.not.have.class('open');

            $rootScope.$broadcast('show:menu', {pageX: 100, pageY: 100});
            $rootScope.$digest();

            expect(menuWrapperNode, 'it should be opened')
                .to.have.class('open');

            expect(menuNode, 'x position must be 100px')
                .to.have.css('left', '100px');

            expect(menuNode, 'y position must be 100px')
                .to.have.css('top', '100px');

            MenuService.hide(menuId);

            expect(menuWrapperNode, 'it should be closed be MenuService')
                .to.not.have.class('open');

            MenuService.show(element.controller('eMenu').getId(), {pageX: 100, pageY: 100});

            expect(menuWrapperNode, 'it should be opened be MenuService')
                .to.have.class('open');

            $(menuWrapperNode).click();
            expect(menuWrapperNode, 'it should be closed be click on screen')
                .to.not.have.class('open');

            MenuService.remove(element.controller('eMenu').getId());

            expect($('.e-menu-container'),
                'e-menu node should be trunscluded to e-menu-container')
                .to.not.have
                .descendants('div.e-menu');
        });
    });
});