/**
 * Created by Timofey Novitskiy on 18.02.2016.
 */
define([
    'app/common/utils/number-utils'
], function () {
    describe("NumberUtils", function () {
        it('#equals', function () {
            expect(3..equals(3)).to.be.true;
            expect(3..equals(4)).to.be.false;
            expect(3..equals('3')).to.be.false;
            expect(3..equals(null)).to.be.false;
            expect(3..equals(undefined)).to.be.false;
            expect(3..equals(NaN)).to.be.false;
        });
    });
});