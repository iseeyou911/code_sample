/**
 * Created by Timofey Novitskiy on 16.02.2016.
 */
define([
    'angular',
    'app/common/collections/map/hash-map',
    '_'
], function (angular, HashMap, _) {
    describe("HashMap", function () {
        var map;
        beforeEach(function(){
            map = new HashMap({'key1': 'value1', 'key2': 'value2'});
        });

        it('#Constructor', ()=>{
            expect(map.containsKey('key1')).to.be.true;
            expect(map.containsKey('key2')).to.be.true;
            expect(map.size()).to.be.eq(2);
            expect(map.isEmpty()).to.be.false;
            map = new HashMap();
            expect(map.isEmpty()).to.be.true;
        });

        it('#isEmpty', ()=>{
            map = new HashMap();
            expect(map.isEmpty()).to.be.true;
            map.put('key2', 'value2');
            expect(map.isEmpty()).to.be.false;
        });

        it('#put', ()=>{
            map = new HashMap();
            expect(map.put('key1', 'value1')).to.be.eq('value1');
            expect(map.put('key2', 'value2')).to.be.eq('value2');
            expect(map.get('key1')).to.be.eq('value1');
        });

        it('#get', ()=>{
            expect(map.put('key1', 'value1')).to.be.eq('value1');
            expect(map.get('key1')).to.be.eq('value1');
            expect(map.get('key3')).to.be.null;
        });

        it('#putAll', ()=>{
            map.putAll({'key3': 'value3', 'key4': 'value4'});
            expect(map.size()).to.be.eq(4);
        });

        it('#clear', ()=>{
            map.putAll({'key3': 'value3', 'key4': 'value4'});
            expect(map.isEmpty()).to.be.false;
            map.clear();

            expect(map.size()).to.be.eq(0);
            expect(map.isEmpty()).to.be.true;
        });

        it('#containsKey', ()=>{
            expect(map.containsKey('key3')).to.be.false;
            expect(map.containsKey('key1')).to.be.true;
            expect(map.containsKey('key2')).to.be.true;
        });

        it('#containsValue', ()=>{
            expect(map.containsValue('key3')).to.be.false;
            expect(map.containsValue('value1')).to.be.true;
            expect(map.containsValue('value2')).to.be.true;
        });

        it('#keys', ()=>{
            var keys = map.keys(),
            _keys = ['key1', 'key2'];
            while (keys.hasMoreElements()) {
                expect(_.indexOf(_keys, keys.nextElement())).to.be.not.eq(-1);
            }
        });

        it('#entrySet', ()=>{
            var e,
                _keys = ['key1', 'key2'],
                _values = ['value1', 'value2'],
                entrySet = map.entrySet().iterator();

            while (entrySet.hasNext()) {
                e = entrySet.next();
                expect(_.indexOf(_keys, e.getKey())).to.be.not.eq(-1);
                expect(_.indexOf(_values, e.getValue())).to.be.not.eq(-1);
            }
        });

        it('#keySet', ()=> {
            expect(_.intersection(map.keySet(), ['key1', 'key2'])).to.have.length(2);
        });

        it('#values', ()=> {
            expect(_.intersection(map.values(), ['value1', 'value2'])).to.have.length(2);
        });

        it('#equals', ()=> {
            var map2 = new HashMap({key1: 'value1', key2: 'value2'}),
                map3 = new HashMap({key2: 'value3', key3: 'value1'});

            expect(map.equals(map2)).to.be.true;
            expect(map.equals(map3)).to.be.false;
        });

        it('#clone', ()=> {
            var map2 = map.clone();

            expect(map2).to.be.not.eq(map);
            expect(map.equals(map2)).to.be.true;
        });
    });
});