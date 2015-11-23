/**
 * Created by Timofey Novitskiy on 27.02.2015.
 */
define([
    'app/common/marshallers/marshaller-factory'
], function (MarshallerFactory) {
    return MarshallerFactory(
        /*Serialize*/
        function (number) {
            return +number;
        },

        /*Deserialize*/
        function (number) {
            return +number;
        });
});