/**
 * Created by Timofey Novitskiy on 10.03.2015.
 */
define([
    'app/common/marshallers/marshaller-factory',
    'app/core/uni-data/form-state'
], function (MarshallerFactory, FormState) {
    return MarshallerFactory(
        /*Serialize*/
        function (formState) {
            return formState;
        },

        /*Deserialize*/
        function (formState) {
            return new FormState(formState);
        });
});