/**
 * Created by Timofey Novitskiy on 10.03.2015.
 */
define([
    'app/common/marshallers/marshaller-factory',
    'app/core/uni-data/uni-data-table-fields',
    'app/common/marshallers/uni-data-table',
    'app/common/collections/map/hash-map'
], function (MarshallerFactory, UniDataTableFields,UniDataTableMarshaller, HashMap) {
    var MarshallerUtils;

    require(['app/common/marshallers/marshaller-utils'], function(_MarshallerUtils){
        MarshallerUtils = _MarshallerUtils;
    });

    return MarshallerFactory(
        /*Serialize*/
        function (uniDataTableFields) {
            return uniDataTableFields && uniDataTableFields.toJson();
        },

        /*Deserialize*/
        function (jsonData) {
            var uniDataTableFields =  new UniDataTableFields();

            uniDataTableFields.attributes.putAll(jsonData.attributes || {});

            angular.forEach(jsonData.fields || {}, function(field, fieldName){
                var type = field.type,
                    value = field.value;

                if (type === 'Boolean') {
                    uniDataTableFields.setField(fieldName, value);
                } else if (type === 'Long') {
                    uniDataTableFields.setField(fieldName, +value);
                } else if (type === 'Double' || type === 'Number' || type === 'BigDecimal') {
                    uniDataTableFields.setField(fieldName, +value);
                } else if (type === 'String') {
                    uniDataTableFields.setField(fieldName, value);
                } else if (type === 'Integer') {
                    uniDataTableFields.setField(fieldName, +value);
                } else if (type === 'UniData') {
                    uniDataTableFields.setField(fieldName, MarshallerUtils.unidata.deserialize(value));
                } else if (type === 'UniDataTable') {
                    uniDataTableFields.setField(fieldName, UniDataTableMarshaller.deserialize(value));
                } else if (type === 'Date' || type === 'Timestamp' || type === 'TimezonelessDate' || type === 'JsDate') {
                    uniDataTableFields.setField(fieldName, MarshallerUtils.date.deserialize(value));
                    type = 'Date';
                } else if (type === 'HashMap') {
                    uniDataTableFields.setField(fieldName, new HashMap(value));
                } else if (type === 'ByteArray') {
                    uniDataTableFields.setField(fieldName, value);
                } else {
                    console.warn('Deserializer was not found for field with type {}', type);
                    uniDataTableFields.setField(fieldName, value);
                }

                uniDataTableFields.setFieldType(fieldName, type);
            });

            return uniDataTableFields;
        });
});