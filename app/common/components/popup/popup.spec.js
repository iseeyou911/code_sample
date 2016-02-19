/**
 * Created by Timofey Novitskiy on 04.02.2016.
 */


define([
    'angular',
    'app/common/components/popup/popup.module',
    '_'
], function (angular) {
    describe("ePopup", function () {
        var $compile,
            $rootScope,
            element,
            PopupService,
            popupFactory,
            currentScope,
            ctrl = function () {
                this.iAmParentController = true;
            };

        angular.module('common.components.popup.test', [])
            .directive('test', function () {
                return {
                    require: ['^prntCtrl'],
                    link: function (scope, el, attr, ctrl) {
                        el.append(ctrl[0].iAmParentController)
                    }
                }
            });

        beforeEach(module('common.components.popup'));
        beforeEach(module('common.components.popup.test'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _PopupService_, _popupFactory_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            PopupService = _PopupService_;
            popupFactory = _popupFactory_;
        }));

        beforeEach(function () {
            currentScope = $rootScope.$new();
            currentScope.title = 'Title';
            currentScope.context = {
                text: 'Test'
            };
            currentScope.controllers = function () {
                return {
                    'prntCtrl':  new ctrl
                }
            };
        });

        afterEach(function () {
            currentScope.$destroy();
        });

        it('directive', function () {
            var id = 'e-popup-' + _.uniqueId(),
                decendantId = '[popup-id="' + id + '"]',
                element = $compile('<div ' +
                    'e-popup="context" ' +
                    'popup-id="' + id + '" ' +
                    'controllers="controllers" ' +
                    'title="title" ' +
                    'modal-size="modal-lg" ' +
                    'is-modal="true">' +
                    '<div id="modal-content">{{context.text}}<div test=""></div></div>' +
                    '</div>')(currentScope);
            currentScope.$digest();

            expect(PopupService.popups, 'e-popup should add himself to popup-service')
                .to.include.keys(id);

            expect($('body'), 'e-popup should not be in body before show method called')
                .to.not.have
                .descendants(decendantId);

            $(element).modal('show');

            expect($('body'), 'e-popup should be in body')
                .to.have
                .descendants(decendantId);

            expect($(element), 'e-popup should have class in after opening')
                .to.not
                .class('.in');

            expect($(element), 'e-popup should have modal-dialog')
                .to.have
                .descendants('.modal-dialog');

            expect($('#modal-content', element), 'e-popup should have access to parent ctrl and #modal-content with text Texttrue')
                .to.have
                .text('Testtrue');

            expect($('.modal-title', element), 'e-popup should have title with text Title')
                .to.have
                .text('Title');

            $('.close', element).click();

            expect($(element), 'e-popup should not be in body after close btn  clicked')
                .to.not.have
                .class('.in');

            expect($('.modal-backdrop'), 'backdrop should be hidden')
                .to.not.have
                .class('.in');
        });

        it('onclose event listener', function (done) {
            currentScope.onClose = function () {
                expect('onclose').to.be.ok;
                done();
            };

            var element = $compile('<div e-popup="context" is-modal="true" on-close="onClose()">' +
                '<div id="modal-content">{{context.text}}</div>' +
                '</div>')(currentScope);
            currentScope.$digest();
            $(element).modal('show');
            $('.close', element).click();

            return done;
        });

        it('PopupService close event', function (done) {
            var id = 'e-popup-' + _.uniqueId(),
                popup = PopupService.create(id, {},
                    {
                        text: 'Text'
                    }, '<div id="modal-content">{{context.text}}</div>', 'Title');
            $rootScope.$digest();

            popup.addEventListener('onClose', function(){
                expect('onclose').to.be.ok;
                popup.destroy();
                done();
            });
            popup.show();
            popup.hide();

            return done;
        });

        it('PopupService show event', function (done) {
            var id = 'e-popup-' + _.uniqueId(),
                popup = PopupService.create(id, {},
                    {
                        text: 'PopupService show event test'
                    }, '<div id="modal-content">{{context.text}}</div>', 'Title');
            $rootScope.$digest();

            popup.addEventListener('onShow', function(){
                expect('onshow').to.be.ok;
                done();
            });

            popup.addEventListener('onShown', function(){
                popup.destroy();
            });

            popup.show();
            return done;
        });

        it('PopupService shown event', function (done) {
            var id = 'e-popup-' + _.uniqueId(),
                popup = PopupService.create(id, {},
                    {
                        text: 'PopupService shown event test'
                    }, '<div id="modal-content">{{context.text}}</div>', 'Title');
            $rootScope.$digest();

            popup.addEventListener('onShown', function(){
                expect(popup.opened).to.be.true;
                done();
                popup.destroy();
            });

            popup.show();

            return done;
        });

        it('PopupService', function (done) {
            var id = 'e-popup-' + _.uniqueId(),
                popup = PopupService.create(id, {
                        isModal: true,
                        size: 'lg',
                        controllers: function () {
                            return {
                                'prntCtrl': new ctrl
                            }
                        }
                    },
                    {
                        text: 'Text'
                    }, '<div id="modal-content">{{context.text}}</div>', 'Title');
            $rootScope.$digest();

            expect(popup.opened).to.be.false;

            popup.show();

            expect(popup.opened).to.be.true;

            expect($('body'), 'popup should exists')
                .to.have.descendants('[popup-id=' + id + ']');

            popup.destroy();

            expect($('body'), 'popup should be destroyed')
                .to.not.have.descendants('[popup-id=' + id + ']');

            expect(popup.destroyed).to.be.true;
            expect(popup.opened).to.be.false;

            expect(PopupService.popups, 'e-popup should remove himself to popup-service')
                .to.not.include.keys(id);

            done();
            return done;
        });
    });
});