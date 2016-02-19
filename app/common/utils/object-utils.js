/**
 * Created by Timofey Novitskiy on 26.02.2015.
 */

define([
        '_'
    ],
    function (_) {
        function ObjectUtils() {
        }

        /**
         * Наследование через прототип
         *
         * @param {Function} Child
         * @param {Function} Parent
         * @return {Function}
         */
        ObjectUtils.prototype.inherit = function inherit(Child, Parent) {
            var F = function () {
                _.assign(this, Child.prototype);
                delete this.constructor;
            };

            F.prototype = Parent.prototype;
            F.prototype.constructor = Parent;

            Child.prototype = new F();
            Child.prototype.constructor = Child;
            Child.superclass = Parent;
            return Child;
        };

        /**
         * is object looks like promise
         *
         * @param {Object} object
         * @returns {boolean}
         */
        ObjectUtils.prototype.isPromise = function isPromise(object) {
            return object != null
                && typeof object === 'object'
                && typeof object.then === 'function';
        };

        /**
         *
         * Convert package names to object structure
         *
         * @param {Object} scope parent object
         * @param {String} _package dot separated path
         * @param {*} value
         * @returns {Object}
         */
        ObjectUtils.prototype.buildFromPath = function buildFromPath(scope, _package, value) {
            var _currentPackage;
            if (!_package) {
                return;
            }

            _currentPackage = scope;
            _package.split('.').forEach(function (item, index, source) {
                _currentPackage = _currentPackage[item] = _currentPackage[item] || (source.length - 1 === index ? value : {});
            });

            return _currentPackage;
        };
        return new ObjectUtils();
    });
