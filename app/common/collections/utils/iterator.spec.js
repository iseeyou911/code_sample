/**
 * Created by Timofey Novitskiy on 18.02.2016.
 */
define([
    'app/common/collections/utils/iterator',
    'app/common/exceptions/no-such-element.exception'
], function (Iterator, NoSuchElementException) {
    describe("Iterator", function () {

        it('#next', function () {
            var list = [0, 1, 2, 3, 4],
                it = new Iterator(list),
                i = 0;

            while (it.hasNext()) {
                expect(it.next()).to.be.eq(i++);
            }

            expect(function(){it.next()})
                .to.throw(NoSuchElementException);
        });

        it('#remove', function () {
            var list = [0, 1, 2, 3, 4],
                it = new Iterator(list);

            while (it.hasNext()) {
                it.next();
                it.remove();
            }

            expect(list).to.have.length(0);

        });
    });
});