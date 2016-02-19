/**
 * Created by Timofey Novitskiy on 18.02.2016.
 */
define([
    'angular',
    'app/common/filters/byte.filter'
], function (angular, eByteFilter) {
    describe("eByteFilter", function () {
        var $filter;

        angular.module('byte.filter', [])
            .filter(eByteFilter.$name, eByteFilter);

        beforeEach(module('byte.filter'));

        beforeEach(inject(function (_$filter_) {
            $filter = _$filter_;
        }));

        it('1kb = 1024b', function () {
            var filter = $filter('eByte');
            expect(filter()).to.be.eq('0 B');
            expect(filter(1)).to.be.eq('1 B');
            expect(filter(1024)).to.be.eq('1.0 KiB');
            expect(filter(2048)).to.be.eq('2.0 KiB');
            expect(filter(1024 * 2.9)).to.be.eq('2.9 KiB');
            expect(filter(1024 * 1024 * 3.5)).to.be.eq('3.5 MiB');
            expect(filter(1024 * 1024 * 1024 * 10.25)).to.be.eq('10.3 GiB');
        });

        it('1kb = 1000b', function () {
            var filter = $filter('eByte');
            expect(filter()).to.be.eq('0 B');
            expect(filter(1, true)).to.be.eq('1 B');
            expect(filter(1000, true)).to.be.eq('1.0 kB');
            expect(filter(1000 * 2, true)).to.be.eq('2.0 kB');
            expect(filter(1000 * 2.9, true)).to.be.eq('2.9 kB');
            expect(filter(1000 * 1000 * 3.5, true)).to.be.eq('3.5 MB');
            expect(filter(1000 * 1000 * 1000 * 10.25, true)).to.be.eq('10.3 GB');
        });
    });
});