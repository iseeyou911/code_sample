/**
 * Created by Timofey Novitskiy on 09.02.2016.
 */
define([
    'angular',
    'app/common/components/progress-bar/progress-bar.module',
    'app/common/components/popup/popup.module'
], function () {
    describe("eProgressBar", function () {
        var $compile,
            $rootScope,
            ProgressBarService;

        beforeEach(module('common.components.popup'));
        beforeEach(module('common.components.progress-bar'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _ProgressBarService_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            ProgressBarService = _ProgressBarService_;
        }));

        it('ProgressBarService', function (done) {
            var progressBar = ProgressBarService.create('Test', 100);
            progressBar.show();
            var element = $('[popup-id="' + progressBar.getId() + '"]');
            $rootScope.$digest();

            expect(element).to.exist;

            expect($('.title', element)).to.have.text('Test');
            expect($('.progress-bar', element)).to.have.attr('style', 'width: 100%;');

            progressBar.loaded(10);

            expect($('.progress-bar', element)).to.have.attr('style', 'width: 10%;');

            progressBar.close();

            expect($('[popup-id="' + progressBar.getId() + '"]')[0]).to.not.exist;

            done();
            return done;
        });
    });
});