/**
 * Created by Timofey Novitskiy on 16.02.2016.
 */
define([
    'angular',
    'app/common/directives/form/is-email.validator.directive'
], function (angular, isEmail) {
    describe("isEmail validator", function () {
        var $compile,
            $rootScope;

        angular.module('email-validation', []).
            directive(isEmail.$name, isEmail);

        beforeEach(module('email-validation'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('validation', function () {
            var tmpls = `<input ng-model="email" type="email" is-email="true">`,
                scope = $rootScope.$new(),
                element = $compile(tmpls)(scope),
                ngModelCtrl;

            scope.$digest();
            ngModelCtrl = element.controller('ngModel');
            expect(ngModelCtrl.$valid).to.be.false;
            expect(ngModelCtrl.$error.email).to.be.true;

            scope.email = '12345';
            scope.$digest();
            expect(ngModelCtrl.$valid).to.be.false;
            expect(ngModelCtrl.$error.email).to.be.true;

            scope.email = 'test1@test.com';
            scope.$digest();
            expect(ngModelCtrl.$valid).to.be.true;
            expect(ngModelCtrl.$error.email).to.be.not.true;

            scope.email = '12345';
            scope.$digest();
            expect(ngModelCtrl.$valid).to.be.false;
            expect(ngModelCtrl.$error.email).to.be.true;

            scope.$destroy();
            element.remove();
        });
    });
});