/**
 * Created by Timofey Novitskiy on 16.02.2016.
 */
define([
    'angular',
    'app/common/directives/form/is-ident.validator.directive'
], function (angular, isIdent) {
    describe("isIdent validator", function () {
        var $compile, tmpls, scope, element, $rootScope;

        angular.module('is-ident', []).directive(isIdent.$name, isIdent);

        beforeEach(module('is-ident'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;

            scope = $rootScope.$new();
            element = $compile(tmpls)(scope);
        }));

        afterEach(()=>{
            scope.$destroy();
            element.remove();
        });

        it('pristine', function () {
            scope.$digest();
            var ngModelCtrl = element.controller('ngModel');

            expect(ngModelCtrl.$valid).to.be.true;
            expect(ngModelCtrl.$error.isIdent).to.be.not.true;
        });

        it('forwrad connectivity', function () {
            scope.$digest();
            var ngModelCtrl = element.controller('ngModel');

            scope.field1 = 'field1';
            scope.field2 = 'field2';
            scope.$digest();
            expect(ngModelCtrl.$valid).to.be.false;
            expect(ngModelCtrl.$error.isIdent).to.be.true;

            scope.field1 = 'field2';
            scope.$digest();
            expect(ngModelCtrl.$valid).to.be.true;
            expect(ngModelCtrl.$error.isIdent).to.be.not.true;
        });

        it('backwrad connectivity', function () {
            scope.$digest();
            var ngModelCtrl = element.controller('ngModel');

            scope.field1 = 'field1';
            scope.$digest();
            expect(ngModelCtrl.$valid).to.be.false;
            expect(ngModelCtrl.$error.isIdent).to.be.true;

            scope.field2 = 'field1';
            scope.$digest();
            expect(ngModelCtrl.$valid).to.be.true;
            expect(ngModelCtrl.$error.isIdent).to.be.not.true;

            scope.field2 = 'field2';
            scope.$digest();
            expect(ngModelCtrl.$valid).to.be.false;
            expect(ngModelCtrl.$error.isIdent).to.be.true;

            scope.field1 = 'field2';
            scope.$digest();
            expect(ngModelCtrl.$valid).to.be.true;
            expect(ngModelCtrl.$error.isIdent).to.be.not.true;
        });

        tmpls = `
            <input ng-model="field1" type="input" is-ident="field2"/>`;
    });
});