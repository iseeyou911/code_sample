/**
 * Created by Timofey Novitskiy on 25.02.2015.
 */

define([
        'app/common/utils/object-utils',
        'app/common/collections/utils/iterator',
        'app/common/exceptions/index-out-of-bound.exception'
    ],
    function (ObjectUtils, Iterator, IndexOutOfBoundsException) {
        function LinkedList(firstArg) {
            if (arguments.length === 1 && firstArg instanceof Array) {
                this.push.apply(this, firstArg);
            } else {
                this.push.apply(this, Array.apply([], arguments));
            }
        }

        LinkedList.fromArray = function fromArray(array) {
            var list = new LinkedList();
            list.addAll(array);
            return list;
        };

        ObjectUtils.inherit(LinkedList, Array);

        /**
         *
         * If one argument provided then appends the specified element to the end
         * of this list.
         * If two arguments provided then Inserts the specified element at the
         * specified position in this list.
         *
         * @param indexOrElement
         * @param element
         * @returns {boolean}
         */
        LinkedList.prototype.add = function add(indexOrElement, element) {
            if (arguments.length === 2) {
                this.push.apply(this, [element].concat(this.splice(indexOrElement, this.length)));
                return true
            } else if (arguments.length === 1) {
                return this.push(indexOrElement) >= 1;
            }
            return false;
        };

        /**
         * Appends all of the elements in the specified collection to the end of this list,
         * in the order that they are returned by the specified collection's iterator.
         *
         * @param list
         * @returns {boolean}
         */
        LinkedList.prototype.addAll = function add(list) {
            this.push.apply(this, list || []);
            return true;
        };

        /**
         * Removes all of the elements from this list.
         */
        LinkedList.prototype.clear = function clear() {
            this.splice(0);
        };

        /**
         * Returns true if this list contains the specified element.
         *
         * @param element
         * @returns {boolean}
         */
        LinkedList.prototype.contains = function contains(element) {
            return this.indexOf(element) !== -1;
        };

        /**
         * Returns true if this collection contains
         * all of the elements in the specified collection.
         * @param elements
         * @returns {*}
         */
        LinkedList.prototype.containsAll = function contains(elements) {
            return elements.every(this.contains, this);
        };

        /**
         * Equals test
         *
         * @param o
         * @returns {boolean}
         */
        LinkedList.prototype.equals = function equals(o) {
            if (o === this) {
                return true;
            }
            return o.hashCode ? o.hashCode() === this.hashCode() : false;
        };

        /**
         * HashCode generator
         *
         * @returns {string}
         */
        LinkedList.prototype.hashCode = function hashCode() {
            return this.toString();
        };

        /**
         * Returns true if this collection contains no elements.
         *
         * @returns {boolean}
         */
        LinkedList.prototype.isEmpty = function isEmpty() {
            return this.length === 0;
        };

        /**
         *
         * @returns {Iterator}
         */
        LinkedList.prototype.iterator = function iterator() {
            return new Iterator(this);
        };

        /**
         *
         * If arguments count is zero
         * Retrieves and removes the head (first element) of this list.
         *
         * If first argument is Number
         * Removes the element at the specified position in this list.
         *
         * If first argument is Object
         * Removes a single instance of the specified element from this collection,
         * if it is present (optional operation).
         * More formally, removes an element e such that (o==null ? e==null : o.equals(e)),
         * if this collection contains one or more such elements.
         * Returns true if this collection contained the specified element
         * (or equivalently, if this collection changed as a result of the call).
         *
         * @param indexOrObject
         * @returns {*}
         */
        LinkedList.prototype.remove = function remove(indexOrObject) {
            if (arguments.length === 0) {
                return this.remove(0);
            }
            if (typeof indexOrObject !== 'number') {
                indexOrObject = this.indexOf(indexOrObject);
            }
            if (indexOrObject >= 0 && indexOrObject <= this.length - 1) {
                return this.splice(indexOrObject, 1)[0];
            }
            return null;
        };

        /**
         *
         * Removes all of this collection's elements that are also contained in
         * the specified collection (optional operation).
         * After this call returns, this collection will contain
         * no elements in common with the specified collection.
         *
         * @param elements
         */
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

        /**
         * Retains only the elements in this collection that are contained in
         * the specified collection (optional operation). In other words,
         * removes from this collection all of its elements that are
         * not contained in the specified collection.
         *
         * @param elements
         */
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

        /**
         * Replaces the element at the specified position in this list with
         * the specified element
         *
         * @param index
         * @param element
         * @returns {*}
         */
        LinkedList.prototype.set = function set(index, element) {
            if (this.length <= index || index < 0) {
                throw new IndexOutOfBoundsException;
            }
            this[index] = element;
            return element;
        };

        /**
         * Returns the first element in this list.
         */
        LinkedList.prototype.getFirst = function getFirst() {
            return this.get(0);
        };

        /**
         * Returns the last element in this list.
         */
        LinkedList.prototype.getLast = function getLast() {
            return this.get(this.length - 1);
        };

        /**
         *
         Returns the element at the specified position in this list.

         * @param index
         * @returns {*}
         */
        LinkedList.prototype.get = function get(index) {
            if (this.length <= index || index < 0) {
                throw new IndexOutOfBoundsException;
            }
            return this[index];
        };

        /**
         * Returns the number of elements in this list.
         * @returns {*}
         */
        LinkedList.prototype.size = function size() {
            return this.length;
        };

        /**
         *
         * Returns a view of the portion of this list between the specified
         * fromIndex, inclusive, and toIndex, exclusive.
         * (If fromIndex and toIndex are equal, the returned list is empty.)
         * The returned list is backed by this list, so non-structural changes
         * in the returned list are reflected in this list, and vice-versa.
         * The returned list supports all of the optional list operations
         * supported by this list.
         *
         * @param fromIndex
         * @param toIndex
         * @returns {LinkedList}
         */
        LinkedList.prototype.subList = function subList(fromIndex, toIndex) {
            return new LinkedList(this.slice(fromIndex, toIndex));
        };

        /**
         * Returns an array containing all of the elements in this
         * list in proper sequence (from first to last element).
         *
         * @returns {Array.<T>}
         */
        LinkedList.prototype.toArray = function toArray() {
            return Array.prototype.slice.apply(this);
        };

        LinkedList.prototype.clone = function clone() {
            return LinkedList.fromArray(this);
        };

        LinkedList.prototype.poll = function poll() {
            if (this.length === 0) {
                return null;
            }
            return this.shift();
        };

        /**
         * Retrieves and removes the head (first element) of this list.
         *
         * @returns {*}
         */
        LinkedList.prototype.pollFirst = function pollFirst() {
            return this.poll();
        };

        /**
         *Retrieves and removes the last element of this list, or returns null
         * if this list is empty.
         *
         * @returns {*}
         */
        LinkedList.prototype.pollLast = function pollLast() {
            if (this.length === 0) {
                return null;
            }
            return this.pop();
        };

        return LinkedList;
    });
