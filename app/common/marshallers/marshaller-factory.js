/**
 * Created by Timofey Novitskiy on 04.02.2015.
 */
define([

], function (){
    /**
     * Marshaller factory
     *
     * @param {Function} serializeFn function for serialize object to JSON format
     * @param {Function} deserializeFn function for deserialize JSON format
     *
     * @return {Marshaller}
     */
    return function MarshallerFactory (serializeFn, deserializeFn) {
        return {
            serialize : serializeFn,
            deserialize : deserializeFn
        };
    }
});