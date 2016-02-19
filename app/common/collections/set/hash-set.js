/**
 * Created by Timofey Novitskiy on 25.02.2015.
 */

define([
        'app/common/utils/object-utils',
        'app/common/collections/list/linked-list'
    ],
    function (ObjectUtils, LinkedList) {
        function HashSet(firstArg) {
            var args = [];
            if (arguments.length === 1 && firstArg instanceof Array) {
                fill(firstArg);
            } else if (arguments.length > 1) {
                fill([].slice.apply(arguments));
            } else {
                args = [firstArg];
            }

            function fill(items) {
                items.forEach(function(item){
                    if (args.indexOf(item) === -1) {
                        args.push(item);
                    }
                });
            }

            LinkedList.apply(this, args);
        }

        /**
         * Adds the specified element to this set if it is not already present.
         *
         * @param element
         * @returns {boolean}
         */
        HashSet.prototype.add = function add(element) {
            if (this.indexOf(element) === -1) {
                return this.push(element) >= 1;
            }
            return false;
        };

        ObjectUtils.inherit(HashSet, LinkedList);

        return HashSet;
    });
