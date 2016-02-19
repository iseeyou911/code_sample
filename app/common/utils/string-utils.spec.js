/**
 * Created by Timofey Novitskiy on 18.02.2016.
 */
define([
    'app/common/utils/string-utils'
], function (StringUtils) {
    describe("StringUtils", function () {
        it('#trim', function () {
            var str = '   Test    ';

            expect(StringUtils.trim('Test')).to.be.eq('Test');
            expect(StringUtils.trim('   Test')).to.be.eq('Test');
            expect(StringUtils.trim('Test    ')).to.be.eq('Test');
            expect(StringUtils.trim(str)).to.be.eq('Test');

            expect(str).to.be.eq('   Test    ');
        });

        it('#isEmpty', function () {
            expect(StringUtils.isEmpty()).to.be.true;
            expect(StringUtils.isEmpty(null)).to.be.true;
            expect(StringUtils.isEmpty(undefined)).to.be.true;
            expect(StringUtils.isEmpty('test')).to.be.false;
        });

        it('#isNotEmpty', function () {
            expect(StringUtils.isNotEmpty()).to.be.false;
            expect(StringUtils.isNotEmpty(null)).to.be.false;
            expect(StringUtils.isNotEmpty(undefined)).to.be.false;
            expect(StringUtils.isNotEmpty('test')).to.be.true;
        });

        it('#endsWith', function () {
            expect(StringUtils.endsWith('test amd', 'est')).to.be.false;
            expect(StringUtils.endsWith('test', 'est')).to.be.true;
            expect(StringUtils.endsWith('and test and', 'est')).to.be.false;
            expect(StringUtils.endsWith('and test', 'est')).to.be.true;
        });
    });

    describe('String', function () {
        it('#equals', function () {
            expect('Test'.equals('Test')).to.be.true;
            expect('Test'.equals('Test1')).to.be.false;
            expect('Test'.equals(null)).to.be.false;
            expect('1'.equals(1)).to.be.false;
        });

        it('#trim', function () {
            var str = '   Test    ';
            expect('Test'.trim()).to.be.eq('Test');
            expect('   Test'.trim()).to.be.eq('Test');
            expect('Test    '.trim()).to.be.eq('Test');
            expect(str.trim()).to.be.eq('Test');
            expect(str).to.be.eq('   Test    ');
        });

        it('#replaceAll', function () {
            var str = 'test and test',
                expectStr = 'replaced and replaced';

            expect(str.replaceAll('test', 'replaced')).to.be.equal(expectStr);
            expect(str.replaceAll(/test/, 'replaced')).to.be.equal(expectStr);
            expect('Test and Test'.replaceAll(/test/i, 'replaced')).to.be.equal(expectStr);
            expect('4 and 4'.replaceAll(4, 'replaced')).to.be.equal(expectStr);
            expect('do the coca-cola'.replaceAll(/test/, 'replaced')).to.be.equal('do the coca-cola');
        });

        it('#replace', function () {
            var str = 'test and test',
                expectStr = 'replaced and test';

            expect(str.replace('test', 'replaced')).to.be.equal(expectStr);
            expect(str.replace(/test/, 'replaced')).to.be.equal(expectStr);
            expect('Test and test'.replace(/test/i, 'replaced')).to.be.equal('replaced and test');
            expect('test and 4'.replace(4, 'replaced')).to.be.equal('test and replaced');
            expect('do the coca-cola'.replace(/test/, 'replaced')).to.be.equal('do the coca-cola');
        });

        it('#replaceFirst', function () {
            var str = 'test and test',
                expectStr = 'replaced and test';

            expect(str.replaceFirst('test', 'replaced')).to.be.equal(expectStr);
            expect(str.replaceFirst(/test/, 'replaced')).to.be.equal(expectStr);
            expect('test and Test'.replaceFirst(/test/i, 'replaced')).to.be.equal('replaced and Test');
            expect('test and 4'.replaceFirst(4, 'replaced')).to.be.equal('test and replaced');
            expect('do the coca-cola'.replaceFirst(/test/, 'replaced')).to.be.equal('do the coca-cola');
        });

        it('#isEmpty', function () {
            expect(''.isEmpty()).to.be.true;
            expect('Test'.isEmpty()).to.be.false;
        });

        it('#isNotEmpty', function () {
            expect('Test'.isNotEmpty()).to.be.true;
            expect(''.isNotEmpty()).to.be.false;
        });

        it('#contains', function () {
            expect('Test'.contains('es')).to.be.true;
            expect('Test'.contains('as')).to.be.false;
            expect('Test.for.dots'.contains('.for.')).to.be.true;
            expect('Testfordots'.contains('.for.')).to.be.false;
        });
    });
});