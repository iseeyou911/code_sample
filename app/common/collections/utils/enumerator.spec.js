/**
 * Created by Timofey Novitskiy on 18.02.2016.
 */
define([
    'app/common/collections/utils/enumerator',
    'app/common/exceptions/no-such-element.exception'
], function (Enumerator, NoSuchElementException) {
    describe("Enumerator", function () {
        var obj = {key1: 'value1', key2: 'value2', key3: 'value3'};
        it('Enumerator', function () {
            it('#hasMoreElements', ()=>{
                var enumerator = new Enumerator(obj);

                while (enumerator.hasMoreElements()) {
                    enumerator.nextElement()
                }
            });

            it('#nextElement', ()=>{
                var i = 0,
                    enumerator = new Enumerator(obj);

                while (enumerator.hasMoreElements()) {
                    expect(_.indexOf(['value1', 'value2', 'value3'], enumerator.nextElement()))
                        .to.be.not.eq(-1);
                    i++;
                }
                expect(function(){enumerator.nextElement()}).to.throw(NoSuchElementException);
                expect(i).to.be.equal(3);
            });
        });
    });
});