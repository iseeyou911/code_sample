/**
 * Created by Timofey Novitskiy on 10.03.2015.
 */
define([
    'app/common/marshallers/marshaller-factory',
    'app/core/uni-data/uni-data',
    'app/common/marshallers/uni-data-table-fields',
    'app/common/marshallers/uni-client-data'
], function (MarshallerFactory, UniData, UniDataTableFieldsMarshaller, UniClientDataMarshaller) {
    return MarshallerFactory(
        /*Serialize*/
        function (uniData) {
            return uniData && uniData.toJson();
        },

        /*Deserialize*/
        function (jsonData) {
            var uniData, fields, processInstances, formError;
            if (!jsonData) {
                return null;
            }

            fields = UniDataTableFieldsMarshaller.deserialize(jsonData.fields);
            processInstances = jsonData.ProcessInstances;
            formError = jsonData.formError;

            if (jsonData.exception) {
                uniData = new UniData({message: jsonData.exception.message}, "");
            } else {
                uniData = new UniData();
            }

            uniData.setClientData(UniClientDataMarshaller.deserialize(jsonData.clientData));

            formError && uniData.setFormError(formError);
            processInstances && uniData.ProcessInstances.putAll(processInstances);

            uniData.replace(fields, 4);

            angular.forEach(jsonData.fields.fieldAttributes || {}, function (attrs, field) {
                angular.forEach(attrs, function (value, name) {
                    uniData.setFieldAttribute(field, name, value);
                });
            });

            angular.forEach(jsonData.fields.errors || {}, function (error, field) {
                uniData.setFormError(field, error);
            });

            return uniData;
        });
});