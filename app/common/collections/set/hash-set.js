/**
 * Created by Timofey Novitskiy on 25.02.2015.
 */

define([
        'app/common/utils/object-utils',
        'app/common/collections/list/linked-list'
    ],
    function (ObjectUtils, LinkedList) {
        function HashSet() {
            LinkedList.apply(this, arguments);
        }

        HashSet.prototype.add = function add(element) {
            if (this.indexOf(element) === -1) {
                return this.push(element) >= 1;
            }
            return false;
        };

        ObjectUtils.inherit(HashSet, LinkedList);

        return HashSet;
    });
