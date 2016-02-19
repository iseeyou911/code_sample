/**
 * Created by Timofey Novitskiy on 15.02.2016.
 */

define([
        'app/common/utils/object-utils'
    ],
    function (ObjectUtils) {
        function NoSuchElementException() {
            Error.call(this, 'NoSuchElementException');
        }

        ObjectUtils.inherit(NoSuchElementException, Error);

        return NoSuchElementException;
    });
