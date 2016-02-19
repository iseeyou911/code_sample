/**
 * Created by Timofey Novitskiy on 18.02.2016.
 */
define([
    'app/common/collections/map/properties',
    'app/common/collections/map/hash-map'
], function (Properties, HashMap) {
    describe("Properties", function () {
        var props;

        beforeEach(function(){
            props = new Properties;
            props.put('key1', 'value1');
            props.put('key2', 'value2');
            props.put('key3', 'value3');
        });

        it('#Constructor', function () {
            expect(props)
                .to.be.instanceof(Properties)
                .and
                .to.be.instanceof(HashMap);
        });

        it('#getProperty', function () {
            expect(props.getProperty('key1')).to.be.equal('value1');
            expect(props.getProperty('key2')).to.be.equal('value2');
            expect(props.getProperty('key3')).to.be.equal('value3');
            expect(props.getProperty('key4')).to.be.undefined;
            expect(props.getProperty('key4', 'value4')).to.be.equal('value4');
        });

        it('#setProperty', function () {
            expect(props.setProperty('key4', 'value4')).to.be.equal('value4');
            expect(props.getProperty('key4', 'value4')).to.be.equal('value4');
        });
    });
});