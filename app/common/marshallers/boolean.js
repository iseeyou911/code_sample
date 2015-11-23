/**
 * Created by Timofey Novitskiy on 27.02.2015.
 */
define([
    'app/common/marshallers/marshaller-factory'
], function (MarshallerFactory) {
    return MarshallerFactory(
        /*Serialize*/
        function (boolean) {
            return boolean;
        },

        /*Deserialize*/
        function (boolean) {
            return boolean === 'true' || boolean === 1 || boolean === '1' ? true : false;
        });
});