/**
 * Created by Timofey Novitskiy on 17.02.2016.
 */
define([
    'app/common/utils/object-utils'
], function (ObjectUtils) {
    describe("ObjectUtils", function () {
        var $q;
        beforeEach(inject((_$q_)=>{
            $q = _$q_;
        }));

        it('#isPromise', ()=> {
            expect(ObjectUtils.isPromise(3)).to.be.false;
            expect(ObjectUtils.isPromise('test')).to.be.false;
            expect(ObjectUtils.isPromise([3])).to.be.false;
            expect(ObjectUtils.isPromise(null)).to.be.false;
            expect(ObjectUtils.isPromise(undefined)).to.be.false;
            expect(ObjectUtils.isPromise({a: 2, v:3})).to.be.false;
            expect(ObjectUtils.isPromise({a: 2, then:3})).to.be.false;
            expect(ObjectUtils.isPromise({a: 2, then:{}})).to.be.false;
            expect(ObjectUtils.isPromise({a: 2, then:function(){}})).to.be.true;
            expect(ObjectUtils.isPromise(new Promise(function(resolve){resolve()}))).to.be.true;
            expect(ObjectUtils.isPromise($q.defer().promise)).to.be.true;
        });

        it('#buildFromPath', ()=>{
            var a = {};
            ObjectUtils.buildFromPath(a, 'test1.test2', 1);
            expect(a.test1.test2).to.be.eq(1);
        });

        it('#inherit', () => {
            function A() {
                B.call(this);
                this.prop1 = 'A prop1';
                this.method1 = function method1() {
                    return 'A method1';
                }
            }

            A.prototype.prop2 = 'A prop2';
            A.prototype.method2 = function method2() {
                return 'A method2';
            };

            function B() {
                this.prop1 = 'B prop1';
                this.prop3 = 'B prop3';
                this.method1 = function method1() {
                    return 'B method1';
                }
            }

            B.prototype.method3 = function method3() {
                return 'B method3';
            };

            function C() {
                A.call(this);
                this.prop3 = 'C prop3';
                this.method1 = function method1() {
                    return 'C method1';
                }
            }

            ObjectUtils.inherit(A, B);
            ObjectUtils.inherit(C, A);
            var a = new A(),
                c = new C();

            expect(a.prop1).to.be.eq('A prop1');
            expect(a.prop3).to.be.eq('B prop3');
            expect(a.prop2).to.be.eq('A prop2');

            expect(a.method1()).to.be.eq('A method1');
            expect(a.method2()).to.be.eq('A method2');
            expect(a.method3()).to.be.eq('B method3');

            expect(a).to.be.instanceof(A);
            expect(a).to.be.instanceof(B);

            expect(c.prop1).to.be.eq('A prop1');
            expect(c.prop3).to.be.eq('C prop3');
            expect(c.prop2).to.be.eq('A prop2');

            expect(c.method1()).to.be.eq('C method1');
            expect(c.method2()).to.be.eq('A method2');
            expect(c.method3()).to.be.eq('B method3');

            expect(c).to.be.instanceof(B);
            expect(c).to.be.instanceof(A);
            expect(c).to.be.instanceof(C);
        });
    });
});