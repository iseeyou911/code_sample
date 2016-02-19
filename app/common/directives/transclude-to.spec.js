/**
 * Created by Timofey Novitskiy on 17.02.2016.
 */
define([
    'angular',
    'app/common/directives/transclude-to.directive'
], function (angular, transcludeTo) {
    describe("eTranscludeTo", function () {
        var $compile,
            $rootScope;

        angular.module('e-transclude-to', [])
            .directive(transcludeTo.$name, transcludeTo)
            .directive('dir0', function () {
                return {
                    transclude: 'true',
                    template: '<div ng-transclude=""></div>',
                    require: 'dir0',
                    controllerAs: 'dir0Ctrl',
                    controller: function () {
                        this.name = 'dir0';
                    },
                    link: function () {
                    }
                };
            })
            .directive('dir1', function () {
                return {
                    transclude: 'true',
                    template: '<div ng-transclude=""></div>',
                    require: 'dir1',
                    controller: function () {
                        this.name = 'dir1';
                    },
                    link: function () {
                    }
                };
            })
            .directive('dir2', function () {
                return {
                    require: ['dir2', '^dir0'],
                    template: '{{dir2Ctrl.dir0.name}}',
                    controllerAs: 'dir2Ctrl',
                    controller: function () {
                        var self = this;
                        this.name = 'dir2';

                        this.init = function (_dir0) {
                            self.dir0 = _dir0;
                        }
                    },
                    link: function (scope, el, attrs, ctrls) {
                        ctrls[0].init(ctrls[1]);
                    }
                };
            });

        beforeEach(module('e-transclude-to'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('work as expected', function () {
            var scope1 = $rootScope.$new(),
                scope2 = $rootScope.$new(),
                toElement = $('<div id="transcludeHere">'), elements;
            $('body').append(toElement);

            scope2.name = 'element2';
            scope1.name = 'element1';
            [scope1, scope2].forEach((scope)=> {
                $compile(`<div e-transclude-to="#transcludeHere">
                            <span id="{{name}}">{{name}} is transcluded</span>
                            </div>`)(scope);
            });

            scope1.$digest();
            scope2.$digest();

            elements = $('#transcludeHere div');
            expect(elements).to.have.length(2);

            expect($('span#element1', elements).text().trim()).to.be.equal('element1 is transcluded');
            expect($('span#element2', elements).text().trim()).to.be.equal('element2 is transcluded');

            scope1.$destroy();

            elements = $('#transcludeHere div');
            expect(elements).to.have.length(1);

            expect($('span#element1', elements)).to.have.length(0);
            expect($('span#element2', elements).text().trim()).to.be.equal('element2 is transcluded');

            scope2.$destroy();

            elements = $('#transcludeHere div');
            expect(elements).to.have.length(0);
            toElement.remove();
        });

        it('parent controllers', ()=> {
            var scope1 = $rootScope.$new(),
                toElement = $('<div id="transcludeHere">'), elements;
            $('body').append(toElement);

            $compile(`<div dir0="">
                                <div dir1="">
                                <div e-transclude-to="#transcludeHere" parent-controllers="{dir0: dir0Ctrl}">
                                    <div dir2="" ></div>
                                    </div>
                                </div>
                            </div>`)(scope1);

            scope1.$digest();

            expect($('#transcludeHere [dir2]').text().trim()).to.be.equal('dir0');

            scope1.$destroy();
            toElement.remove();
        });

        it('parent controllers in case of selector is undefined', ()=> {
            var scope1 = $rootScope.$new(),
                toElement = $('<div id="transcludeHere">'), elements;
            $('body').append(toElement);

            var element = $compile(`<div dir0="">
                                <div dir1="">
                                <div e-transclude-to="" parent-controllers="{dir0: dir0Ctrl}">
                                    <div dir2="" ></div>
                                    </div>
                                </div>
                            </div>`)(scope1);

            scope1.$digest();

            expect($('[dir2]', element).text().trim()).to.be.equal('dir0');

            scope1.$destroy();
            toElement.remove();
        });
    });
});