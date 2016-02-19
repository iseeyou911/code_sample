/**
 * Created by Timofey Novitskiy on 10.02.2016.
 */
define([
    '_',
    'angular',
    'app/common/components/tabs-panel/tabs-panel.module'
], function (_) {
    describe("eTabsPanel", function () {
        var $compile, $rootScope, linker, scope, container,
            active = 0,
            tmpl = '<div e-tabs-panel="tabs" is-visible="$tab.visible" activate="$tab.activate()" on-close="$tab.closed = true; $tab.visible = false" is-active="$tab.isActive()" is-loading="$tab.loading"  is-closable="true">{{$tab.text}}</div>',
            tabs;

        beforeEach(module('common.components.tabs-panel'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            linker = $compile(tmpl);
            tabs = ['tab 1', 'tab 2', 'tab 3', 'tab 4', 'tab 5', 'tab 6']
                .map(function (text, index) {
                    return {
                        text: _.repeat(text, index + 3),
                        visible: true,
                        loading: index === 3,
                        isActive: function () {
                            return active == index;
                        },
                        activate: function () {
                            active = index;
                        }
                    }
                });
            scope = $.extend($rootScope.$new(), {tabs: tabs});
        }));

        afterEach(function(){
            scope.$destroy();
            container.remove();
        });

        it('directive', function () {
            container = $('<div style="width: 1200px">');
            $('body').append(container);

            var element = linker(scope),
                controller = element.controller('eTabsPanel'),
                promise, items;

            container.append(element);
            scope.$digest();

            items = $('.tabs-container li.e-tab-item', element);
            expect(items).to.have.length(6);
            expect($(items[0])).to.have.class('active');
            expect($(items[3])).to.have.class('loading');

            $(items[2]).click();
            expect($(items[0])).to.not.have.class('active');
            expect($(items[2])).to.have.class('active');

            scope.$apply(function(){tabs[1].visible = false});

            expect($('li.e-tab-item', element)).to.have.length(5);

            $('.fa-close', items[0]).click();
            expect($('li.e-tab-item', element)).to.have.length(4);
        });

        it('responsive', function (done) {
            container = $('<div style="width: 1200px">');
            $('body').append(container);

            var element = linker(scope),
                controller = element.controller('eTabsPanel'),
                promise, items;

            container.append(element);
            scope.$digest();
            expect(controller.visibleTabs).to.have.length(6);
            expect(controller.hiddenTabs).to.have.length(0);

            container.css('width', '900px');

            promise = new Promise(function(resolve){
                $(window).resize();
                scope.$applyAsync(function(){
                    expect(controller.hiddenTabs).to.have.length(1);
                    resolve();
                });
            });

            promise.then(function(){
                container.css('width', '500px');
                $(window).resize();

                scope.$applyAsync(function(){
                    expect(controller.hiddenTabs).to.have.length(3);
                    done();
                });
            });

            return done;
        });

        it('Right Menu', function () {
            container = $('<div style="width: 500px">');
            $('body').append(container);
            var element = linker(scope),
                controller = element.controller('eTabsPanel'),
                promise, items;

            container.append(element);
            scope.$digest();

            $('.dropdown li.e-tab-item:first-of-type', element).click();
            items = $('.tabs-container li.e-tab-item', element);

            expect($(items[0])).to.have.class('active');
            expect($(items[0]).text().trim()).to.be.equal(tabs[3].text);
            expect(controller.hiddenTabs).to.contain(tabs[2]);
        });
    });
});