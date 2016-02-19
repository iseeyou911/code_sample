/**
 * Created by Timofey Novitskiy on 17.02.2016.
 */
define([
    'angular',
    'app/common/directives/linker-directive-factory'
], function (angular, linkerDirectiveFactory) {
    angular.module('linker-directive-factory', [])
        .directive('dir1', function () {
            return {
                transclude: 'true',
                template: '<div ng-transclude=""></div>',
                require:'dir1',
                controller: function () {
                    this.name = 'dir1';
                    this.$link = (controller)=>{
                        this.name2 = controller.name;
                    }
                },
                link: function () {
                }
            };
        })
        .directive('dir2', function () {
            return {
                controller: function () {
                    this.name = 'dir2';
                },
                link: function () {
                }
            };
        })
        .directive('linker', linkerDirectiveFactory('linker', 'dir1', 'dir2'));

    describe("linkerDirectiveFactory", function () {
        var $compile,
            $rootScope;

        beforeEach(module('linker-directive-factory'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('controller of dir1 should have $link to controller of dir2', function () {
            var scope = $rootScope.$new(),
                element = $compile('<div dir1="" ><div dir2="" linker="$link"></div></div>')(scope);

            scope.$digest();
            expect(element.controller('dir1').name2).to.be.eq('dir2');
            scope.$destroy();
        });
    });
});