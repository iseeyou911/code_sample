/**
 * Created by Timofey Novitskiy on 04.02.2015.
 */
define([
    'app/common/marshallers/marshaller-factory'
], function (MarshallerFactory) {
    return MarshallerFactory(
        /*Serialize*/
        function (date) {
            try {
                return date && +date;
            } catch (e) {
                return null;
            }
        },

        /*Deserialize*/
        function (date) {
            try {
                return date && new Date(date);
            } catch (e) {
                return null;
            }
        });
});