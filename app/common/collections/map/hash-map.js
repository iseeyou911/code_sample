/**
 * Created by Timofey Novitskiy on 25.02.2015.
 */

define([
        'app/common/collections/set/hash-set',
        'app/common/collections/utils/enumerator'
    ],
    function (HashSet, Enumerator) {
        function HashMap() {
        }

        function EntrySet (key, value) {
            this.getKey = function getKey () {
                return key;
            };

            this.getValue = function getValue () {
                return value;
            };

            this.toString = function toString () {
                return 'key : ' + key + ', value : ' + value;
            };
        }

        HashMap.prototype.clear = function clear() {
            this.keySet().forEach(function(key){
               delete this[key];
            }, this);
        };

        HashMap.prototype.containsKey = function (key) {
            return this.hasOwnProperty(key);
        };

        HashMap.prototype.containsValue = function containsValue(value) {
            var key;

            for (key in this) {
                if (this.hasOwnProperty(key) && value === this[key]) {
                    return true;
                }
            }
        };

        HashMap.prototype.entrySet = function entrySet() {
            return new HashSet(Object.keys(this).map(function (key) {
                return new EntrySet(key, value);
            }));
        };

        HashMap.prototype.equals = function equals(o) {
            if (o === this) {
                return true;
            }
            return o.hasCode ? o.hashCode() === this.hashCode() : false;
        };

        HashMap.prototype.hashCode = function hashCode() {
            return this.entrySet().toString();
        };

        HashMap.prototype.isEmpty = function isEmpty() {
            return this.size() === 0;
        };

        HashMap.prototype.keySet = function keySet() {
            return new HashSet(Object.keys(this));
        };

        HashMap.prototype.put = function put(key, value) {
            return this[key] = value;
        };

        HashMap.prototype.putAll = function putAll(m) {
            angular.extend(this, m || {});
        };

        HashMap.prototype.remove = function remove(key) {
            delete this[key];
        };

        HashMap.prototype.size = function size() {
            return Object.keys(this).length;
        };

        HashMap.prototype.get = function get(key) {
            return this[key];
        };

        HashMap.prototype.keys = function keys() {
            return new Enumerator(this);
        };

        HashMap.prototype.clone = function clone() {
            return angular.copy(this);
        };

        HashMap.prototype.values = function values() {
            return Object.keys(this).map(function (key) {
                return this[key];
            });
        };

        return HashMap;
    });
