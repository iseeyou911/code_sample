/**
 * Created by Timofey Novitskiy on 15.02.2016.
 */
define([
    'app/common/collections/list/linked-list',
    'app/common/exceptions/index-out-of-bound.exception'
], function (LinkedList, IndexOutOfBoundsException) {
    describe("LinkedList", function () {
        var list;

        beforeEach(()=> {
            list = new LinkedList;
        });

        it('#Constructor', function () {
            expect(new LinkedList()).to.have.length(0);
            expect(new LinkedList(3)).to.have.length(3);
            expect(new LinkedList(1, 2, 3, 4)).to.have.length(4)
                .and
                .to
                .contains(4);
            expect(new LinkedList).to.be.instanceOf(Array);
            expect(new LinkedList(0, 1, 2, 3, 4, 5, 6, 7).clone())
                .to.have.length(8);
        });

        it('#toArray', ()=> {
            expect(LinkedList.fromArray([0, 1, 2, 3, 4, 5, 6, 7]).toArray())
                .to.have.length(8);
        });

        it('#fromArray', ()=> {
            expect(LinkedList.fromArray([0, 1, 2, 3, 4, 5, 6, 7]))
                .to.have.length(8);
        });

        it('#add', function () {
            expect(list.isEmpty()).to.be.true;
            expect(list.add(0)).to.be.ok;
            expect(list.add(1)).to.be.ok;
            expect(list.add(2)).to.be.ok;
            expect(list.add(4)).to.be.ok;
            expect(list.isEmpty()).to.be.false;
            expect(list.size()).to.be.eq(4);
            expect(list.get(2)).to.be.eq(2);

            expect(list).to.have
                .length(4)
                .and.property(3).to.eq(4);

            expect(list.add(3, 3)).to.be.ok;

            expect(list).to.have.length(5);
            expect(list.contains(3)).to.be.true;
            expect(list.contains(32)).to.be.false;
            expect(list.get(4)).to.eq(4);
        });

        it('#subList', ()=> {
            list.addAll([0, 1, 2, 3, 4, 5, 6, 7]);
            expect(list.subList(2, 5).equals(LinkedList.fromArray([2, 3, 4])))
                .to.be.ok;
        });

        it('#size', ()=> {
            expect(list.size()).to.eq(0);
            list.addAll([0, 1, 2, 3, 4, 5, 6, 7]);
            expect(list.size()).to.eq(8);
        });

        it('#isEmpty', ()=> {
            expect(list.isEmpty()).to.be.true;
            list.addAll([0, 1, 2, 3, 4, 5, 6, 7]);
            expect(list.isEmpty()).to.be.false;
        });

        it('#addAll', ()=> {
            expect(list.addAll([0, 1])).to.be.ok;
            expect(list).to.have.length(2);
            expect(list.addAll([2, 3, 4])).to.be.ok;
            expect(list).to.have.length(5);
            expect(list.addAll([5, 6, 7])).to.be.ok;
            expect(list).to.have.length(8);
        });

        it('#equals', ()=> {
            list.addAll([0, 1, 2, 3, 4, 5, 6, 7]);
            expect(list.equals(LinkedList.fromArray([0, 1, 2, 3, 4, 5, 6, 7])))
                .to.be.true;
            expect(list.equals(LinkedList.fromArray([0, 1, 5, 6, 7])))
                .to.be.false;
        });

        it('#remove', () =>{
            list.addAll([0, 1, 2, 3, 4]);
            expect(list.remove(0)).to.be.eq(0);
            expect(list.size()).to.be.eq(4);
            expect(list.remove(1)).to.be.eq(2);
            expect(list.equals(new LinkedList(1, 3, 4))).to.be.ok;
            list.remove();
            expect(list.equals(new LinkedList(3, 4))).to.be.ok;

            var testO1 = {},
                testO2 = {},
                list1 = new LinkedList(testO1, testO2);

            expect(list1.size()).to.be.eq(2);
            expect(list1.remove(testO2)).to.be.eq(testO2);
            expect(list1.size()).to.be.eq(1);
        });

        it('#removeAll', ()=> {
            list.addAll([0, 1, 2, 3, 4]);
            list.removeAll([1, 5]);
            expect(list.size()).to.be.eq(4);
        });

        it('#retainAll', ()=> {
            list.addAll([0, 1, 2, 3, 4]);
            list.retainAll([3]);
            expect(list.size()).to.be.eq(1);
        });

        it('#clear', ()=> {
            list.addAll([0, 1, 2, 3, 4]);
            list.clear();
            expect(list.size()).to.be.eq(0);
        });

        it('#get', function () {
            list.addAll([0, 1]);
            expect(list.get(1)).to.be.eq(1);
            expect(list.get.bind(list, 2, 1)).to.throw(IndexOutOfBoundsException);
            expect(list.get.bind(list, -2, 1)).to.throw(IndexOutOfBoundsException);
        });

        it('#set', function () {
            list.addAll([0, 1]);
            expect(list.set(1, 3)).to.be.eq(3);
            expect(list.get(1)).to.be.eq(3);
            expect(list.set.bind(list, 2, 1)).to.throw(IndexOutOfBoundsException);
            expect(list.set.bind(list, -2, 1)).to.throw(IndexOutOfBoundsException);
        });

        it('#equals', ()=> {
            list.addAll([0, 1, 2, 3, 4, 5, 6, 7]);
            expect(list.equals(list.clone())).to.be.true;
            expect(list).to.be.not.eq(list.clone());
        });

        it('#iterator', function () {
            var list = new LinkedList(0, 1, 2, 3, 4),
                it = list.iterator(),
                i = 0;

            while (it.hasNext()) {
                expect(it.next()).to.be.eq(i++);
            }


            it = list.iterator();
            while (it.hasNext()) {
                it.next();
                it.remove();
            }
            expect(list.size()).to.be.eq(0);

        });


    });

});