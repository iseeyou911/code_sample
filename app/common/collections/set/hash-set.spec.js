/**
 * Created by Timofey Novitskiy on 18.02.2016.
 */
define([
    'app/common/collections/set/hash-set',
    'app/common/collections/list/linked-list'
], function (HashSet, LinkedList) {
    describe("HashSet", function () {
        it('#Constructor', function () {
            expect(new HashSet)
                .to.be.instanceof(HashSet)
                .and
                .to.be.instanceof(LinkedList);

            expect(new HashSet(1,2,3,4,5))
                .to.have.length(5);

            expect(new HashSet(1,2,1,4,1))
                .to.have.length(3);

            expect(new HashSet([1,2,1,4,1]))
                .to.have.length(3);
        });

        it('#add', function () {
            var set = new HashSet([1,2,3,4,5]);
            expect(set.add(6))
                .to.be.eq(true);

            expect(set.size())
                .to.be.eq(6);

            expect(set.add(2))
                .to.be.eq(false);

            expect(set.size())
                .to.be.eq(6);
        });
    });
});