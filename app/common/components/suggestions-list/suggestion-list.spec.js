/**
 * Created by Timofey Novitskiy on 10.02.2016.
 */
define([
    'angular',
    'app/common/components/suggestions-list/suggestions-list.module'
], function () {
    describe("eSuggestionsList", function () {
        var $compile,
            $rootScope,
            linker,
            context;

        beforeEach(module('common.components.suggestions-list'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;

            linker = $compile('<div ' +
                'e-suggestions-list="suggestions" ' +
                'is-visible="isVisible" ' +
                'on-select="onSelect($item)" ' +
                'on-hide="onHide($event)"><span>{{$item.text}}</span></div>');

            context = {
                suggestions: [{text: 1}, {text: 2}, {text: 3}],
                isVisible: false
            }
        }));

        it('directive', function () {
            var items,
                scope = $.extend($rootScope.$new(), context),
                element = linker(scope),
                listElement = $('.e-suggestion-list', element);

            $('body').append(element);
            scope.$digest();

            items = $('.list-group-item', listElement);

            expect(listElement, 'Should be hidden').to.has.class('ng-hide');
            expect(items, 'Should have 3 items').to.has.length(3);

            items.each(function(index, item){
                expect($('>span', item), index + 'element should have').to.have.text('' + (index + 1));
            });

            scope.isVisible = true;
            scope.$digest();
            expect(listElement, 'Should be visible').to.not.has.class('ng-hide');

            scope.$destroy();
        });

        it('Keyboard+controller', function (done) {
            var items,
                scope = $.extend($rootScope.$new(), context, {
                    isVisible: true,
                    onSelect: function($item){
                        expect($item.text).to.be.equal(1);
                    },
                    onHide: function(){
                        expect('everything').to.be.ok;
                        scope.$destroy()
                        done();
                    }
                }),
                element = linker(scope),
                listElement = $('.e-suggestion-list', element);

            $('body').append(element);
            scope.$digest();

            items = $('.list-group-item', listElement);
            element.controller('eSuggestionsList').focus();
            scope.$digest();

            //Key down
            expect(items[0]).to.be.equal(document.activeElement);
            dispatchKeyboardEvent(items[0], 'keyup', 40);

            expect(items[1]).to.be.equal(document.activeElement);
            dispatchKeyboardEvent(items[1], 'keyup', 40);

            expect(items[2]).to.be.equal(document.activeElement);
            dispatchKeyboardEvent(items[2], 'keyup', 40);

            expect(items[0]).to.be.equal(document.activeElement);

            //Key up
            dispatchKeyboardEvent(items[0], 'keyup', 38);

            expect(items[2]).to.be.equal(document.activeElement);
            dispatchKeyboardEvent(items[2], 'keyup', 38);

            expect(items[1]).to.be.equal(document.activeElement);
            dispatchKeyboardEvent(items[1], 'keyup', 38);

            expect(items[0]).to.be.equal(document.activeElement);

            dispatchKeyboardEvent(items[0], 'keyup', 13);
            dispatchKeyboardEvent(listElement[0], 'keyup', 27);

            return done;
        });

        function dispatchKeyboardEvent(element, type, keyCode) {
            var event = new KeyboardEvent(type);
            delete event.keyCode;
            Object.defineProperty(event, 'keyCode', {value: keyCode});
            element.dispatchEvent(event);
        }
    });
});