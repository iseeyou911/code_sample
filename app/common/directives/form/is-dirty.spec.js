/**
 * Created by Timofey Novitskiy on 16.02.2016.
 */
define([
    'angular',
    'app/common/directives/form/is-dirty.directive'
], function (angular, isDirty) {
    describe("eIsDirty", function () {
        var $compile,
            $rootScope;

        angular.module('is-dirty', []).directive(isDirty.$name, isDirty);

        beforeEach(module('is-dirty'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('control dirty param by some scope value', function () {
            var tmpls = `<input ng-model="email" type="email" e-is-dirty="isDirty">`,
                scope = $rootScope.$new(),
                element = $compile(tmpls)(scope),
                ngModelCtrl;

            scope.$digest();

            ngModelCtrl = element.controller('ngModel');
            expect(ngModelCtrl.$dirty).to.be.false;

            scope.isDirty = true;
            scope.$digest();
            expect(ngModelCtrl.$dirty).to.be.true;

            scope.isDirty = false;
            scope.$digest();
            expect(ngModelCtrl.$dirty).to.be.false;
        });

        it('check param only once', function () {
            var tmpls = `<input ng-model="email" type="email" once="true" e-is-dirty="isDirty">`,
                scope = $rootScope.$new(),
                element,
                ngModelCtrl;

            scope.isDirty = true;
            element = $compile(tmpls)(scope);
            scope.$digest();

            ngModelCtrl = element.controller('ngModel');
            expect(ngModelCtrl.$dirty).to.be.true;

            scope.isDirty = false;
            scope.$digest();
            expect(ngModelCtrl.$dirty).to.be.true;
        });

        it('set field dirty by default', function () {
            var tmpls = `<input ng-model="email" type="email" e-is-dirty="isDirty">`,
                scope = $rootScope.$new(),
                element,
                ngModelCtrl;

            element = $compile(tmpls)(scope);
            scope.isDirty = true;
            scope.$digest();

            ngModelCtrl = element.controller('ngModel');
            expect(ngModelCtrl.$dirty).to.be.true;
        });
    });
});