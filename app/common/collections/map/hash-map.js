/**
 * Created by Timofey Novitskiy on 25.02.2015.
 */

define([
        'app/common/collections/set/hash-set',
        'app/common/collections/utils/enumerator',
        '_'
    ],
    function (HashSet, Enumerator, _) {
        function HashMap() {
            if (arguments.length === 1 && typeof arguments[0] === 'object') {
                this.putAll(arguments[0]);
            }
        }

        function EntrySet(key, value) {
            this.getKey = function getKey() {
                return key;
            };

            this.getValue = function getValue() {
                return value;
            };

            this.toString = function toString() {
                return 'key : ' + key + ', value : ' + value;
            };
        }

        /**
         *
         * Removes all of the mappings from this map.
         */
        HashMap.prototype.clear = function clear() {
            this.keySet().forEach(function (key) {
                delete this[key];
            }, this);
        };

        /**
         *
         * Returns true if this map contains a mapping for the specified key.
         *
         * @param {Object|String} key
         * @returns {boolean}
         */
        HashMap.prototype.containsKey = function containsKey (key) {
            return this.hasOwnProperty(key);
        };

        /**
         * Returns true if this map maps one or more keys to the specified value.
         *
         * @param {Object} value
         * @returns {boolean}
         */
        HashMap.prototype.containsValue = function containsValue(value) {
            var key;

            for (key in this) {
                if (this.hasOwnProperty(key) && value === this[key]) {
                    return true;
                }
            }
            return false;
        };

        /**
         * Returns a HashSet view of the mappings contained in this map.
         *
         * @returns {HashSet}
         */
        HashMap.prototype.entrySet = function entrySet() {
            return new HashSet(_.map(this, function (value, key) {
                return new EntrySet(key, value);
            }));
        };

        /**
         * Compares the specified object with this map for equality.
         * Returns true if the given object is also a map and the two
         * maps represent the same mappings. More formally, two maps
         * m1 and m2 represent the same mappings if
         * m1.entrySet().equals(m2.entrySet()).
         *
         * This ensures that the equals method works properly
         * across different implementations of the Map interface.
         * This implementation first checks if the specified object
         * is this map; if so it returns true. Then, it checks if
         * the specified object is a map whose size is identical
         * to the size of this map; if not, it returns false.
         * If so, it iterates over this map's entrySet collection,
         * and checks that the specified map contains each mapping
         * that this map contains. If the specified map fails to
         * contain such a mapping, false is returned.
         * If the iteration completes, true is returned.
         *
         * @param o
         * @returns {boolean}
         */
        HashMap.prototype.equals = function equals(o) {
            if (o === this) {
                return true;
            }
            return o.hashCode ? o.hashCode() === this.hashCode() : false;
        };

        /**
         * Returns the hash code value for this map.
         * The hash code of a map is defined to be
         * the sum of the hash codes of each entry
         * in the map's entrySet() view.
         * This ensures that m1.equals(m2) implies
         * that m1.hashCode()==m2.hashCode() for any two maps m1 and m2,
         * as required by the general contract of Object.hashCode().
         * This implementation iterates over entrySet(), calling hashCode()
         * on each element (entry) in the set, and adding up the results.
         *
         * @returns {string}
         */
        HashMap.prototype.hashCode = function hashCode() {
            return this.entrySet().toString();
        };

        /**
         * Returns true if this map contains no key-value mappings.
         *
         * @returns {boolean}
         */
        HashMap.prototype.isEmpty = function isEmpty() {
            return this.size() === 0;
        };

        /**
         * Returns a Set view of the keys contained in this map.
         *
         * @returns {HashSet}
         */
        HashMap.prototype.keySet = function keySet() {
            return new HashSet(_.keys(this));
        };

        /**
         * Associates the specified value with the specified key in this map.
         *
         * @param {Object|String} key
         * @param {Object} value
         * @returns {*}
         */
        HashMap.prototype.put = function put(key, value) {
            return this[key] = value;
        };

        /**
         * Copies all of the mappings from the specified map to this map.
         *
         * @param {Object|HashMap} m
         */
        HashMap.prototype.putAll = function putAll(m) {
            _.assign(this, m || {});
        };

        /**
         * Removes the mapping for the specified key from this map if present.
         *
         * @param {Object|String} key
         */
        HashMap.prototype.remove = function remove(key) {
            delete this[key];
        };

        /**
         * Returns the number of key-value mappings in this map.
         *
         * @returns {*}
         */
        HashMap.prototype.size = function size() {
            return Object.keys(this).length;
        };

        /**
         * Returns the value to which the specified key is mapped,
         * or null if this map contains no mapping for the key.
         *
         * @param key
         * @returns {*}
         */
        HashMap.prototype.get = function get(key) {
            if (this.hasOwnProperty(key)) {
                return this[key];
            } else {
                return null;
            }
        };

        /**
         * Returns an enumeration of the keys in this hashtable.
         *
         * @returns {Enumerator}
         */
        HashMap.prototype.keys = function keys() {
            return new Enumerator(this);
        };

        HashMap.prototype.clone = function clone() {
            return new HashMap(_.clone(this));
        };

        /**
         * Returns a Array view of the values contained in this map.
         *
         * @returns {Array}
         */
        HashMap.prototype.values = function values() {
            return _.values(this);
        };

        return HashMap;
    });
