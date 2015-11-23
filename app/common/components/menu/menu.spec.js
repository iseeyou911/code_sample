/**
 * Created by god on 27.04.2015.
 */

define([
    'app/common/components/menu/menu.module'
], function () {
    describe("menu test", function () {
        var $compile,
            $rootScope;
        beforeEach(module('common.components.menu'));

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(function(_$compile_, _$rootScope_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        // individual tests go here
        it('Menu directive test', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile('<div e-menu=""></div>')($rootScope);
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
        });
    });
});