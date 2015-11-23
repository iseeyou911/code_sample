/**
 * Created by Timofey Novitskiy on 10.03.2015.
 */
define([
    'app/common/marshallers/marshaller-factory',
    'app/core/uni-data/uni-client-data'
], function (MarshallerFactory, UniClientData) {
    return MarshallerFactory(
        /*Serialize*/
        function (uniClientData) {
            return uniClientData && uniClientData.toJson();
        },

        /*Deserialize*/
        function (jsonData) {
            return new UniClientData();
        });
});