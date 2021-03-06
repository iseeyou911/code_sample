/**
 * Created by Timofey Novitskiy on 25.02.2015.
 */

define([
        'app/common/exceptions/no-such-element.exception'
    ],
    function (NoSuchElementException) {
        function Enumerator(obj) {
            var keys = Object.keys(obj),
                iterator = -1;

            this.hasMoreElements = function hasMoreElements() {
                return iterator < keys.length - 1;
            };

            this.nextElement = function nextElement() {
                if (!this.hasMoreElements()) {
                    throw new NoSuchElementException;
                }
                iterator++;
                return keys[iterator];
            };
        }

        return Enumerator;
    });
