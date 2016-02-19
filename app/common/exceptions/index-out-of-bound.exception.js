/**
 * Created by Timofey Novitskiy on 15.02.2016.
 */

define([
        'app/common/utils/object-utils'
    ],
    function (ObjectUtils) {
        function IndexOutOfBoundsException() {
            Error.call(this, 'IndexOutOfBoundsException');
        }

        ObjectUtils.inherit(IndexOutOfBoundsException, Error);

        return IndexOutOfBoundsException;
    });
