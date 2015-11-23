/**
 * Created by Timofey Novitskiy on 25.02.2015.
 */

define([
        'app/common/utils/object-utils',
        'app/common/collections/utils/iterator',
        'app/common/collections/utils/iterable'
    ],
    function (ObjectUtils, Iterator, Iterable) {
        function LinkedList() {
            this.push.apply(this, Array.apply([], arguments));
        }

        LinkedList.fromArray = function fromArray(array){
            var list = new LinkedList();
            list.addAll(array);
            return list;
        };

        ObjectUtils.inherit(LinkedList, Array);

        LinkedList.prototype.add = function add(indexOrElement, element) {
            var tail;
            if (arguments.length === 2) {
                this.push.apply(this, [element].concat(this.splice(indexOrElement, this.length)));
                return true
            } else if (arguments.length === 1) {
                return this.push(indexOrElement) >= 1;
            }
            return false;
        };

        LinkedList.prototype.addAll = function add(list) {
            this.push.apply(this, list || []);
            return true;
        };

        LinkedList.prototype.clear = function clear() {
            this.splice(0);
        };

        LinkedList.prototype.contains = function contains(element) {
            return this.indexOf(element) !== -1;
        };

        LinkedList.prototype.containsAll = function contains(elements) {
            return elements.every(this.contains, this);
        };

        LinkedList.prototype.equals = function equals(o) {
            if (o === this) {
                return true;
            }
            return o.hasCode ? o.hashCode() === this.hashCode() : false;
        };

        LinkedList.prototype.hashCode = function hashCode() {
            return this.toString();
        };

        LinkedList.prototype.isEmpty = function isEmpty() {
            return this.length === 0;
        };

        LinkedList.prototype.iterator = function iterator() {
            return new Iterator(this);
        };

        LinkedList.prototype.remove = function remove(indexOrObject) {
            if (typeof indexOrObject !== 'number') {
                indexOrObject = this.indexOf(indexOrObject);
            }
            if (indexOrObject >= 0 && indexOrObject <= this.length - 1) {
                return this.splice(indexOrObject, 1)[0];
            }
            return null;
        };

        LinkedList.prototype.removeAll = function removeAll(elements) {
            var list = Array.prototype.slice.apply(this),
                offset = 0;
            list.forEach(function (element, index) {
                if (elements.indexOf(element) !== -1) {
                    this.remove(index - offset);
                    offset++;
                }
            }, this);
        };

        LinkedList.prototype.retainAll = function retainAll(elements) {
            var list = Array.prototype.slice.apply(this),
                offset = 0;
            list.forEach(function (element, index) {
                if (elements.indexOf(element) === -1) {
                    this.remove(index - offset);
                    offset++;
                }
            }, this);
        };

        LinkedList.prototype.set = function set(index, element) {
            this[index] = element;
            return element;
        };

        LinkedList.prototype.get = function set(index) {
            return this[index];
        };

        LinkedList.prototype.size = function size() {
            return this.length;
        };

        LinkedList.prototype.subList = function subList(fromIndex, toIndex) {
            return this.slice(fromIndex, toIndex);
        };

        LinkedList.prototype.toArray = function toArray() {
            return Array.prototype.slice.apply(this);
        };

        LinkedList.prototype.clone = function clone() {
            return LinkedList.fromArray(this);
        };

        return LinkedList;
    });
