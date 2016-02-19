/**
 * Created by Timofey Novitskiy on 25.02.2015.
 */

define([
    'app/common/exceptions/no-such-element.exception'
],
    function (NoSuchElementException) {
        function Iterator (array) {
            var iterator = -1;

            this.hasNext = function hasNext() {
                return iterator < array.length - 1;
            };

            this.next = function next() {
                if (!this.hasNext()) {
                    throw new NoSuchElementException;
                }
                iterator++;
                return array[iterator];
            };

            this.remove = function remove() {
                if (iterator >= 0) {
                    array.splice(iterator, 1);
                    iterator--;
                }
            };
        }

        return Iterator;
    });
