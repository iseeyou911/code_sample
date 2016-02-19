/**
 * Created by Timofey Novitskiy on 12.11.2015.
 */
define([
    '../../utils/object-utils',
    'app/common/collections/map/hash-map'
], function(ObjectUtils, HashMap){
    function Properties () {
        HashMap.apply(this, arguments);
    }

    /**
     * Get property by key, or if it isn't exist return defaultValue
     * @param {String} key
     * @param {String} defaultValue
     * @returns {Object}
     */
    Properties.prototype.getProperty = function getProperty(key, defaultValue) {
        if (this.containsKey(key)) {
            return this.get(key);
        } else {
            return defaultValue;
        }
    };

    /**
     * Set property by key,
     * @param {String} key
     * @param {String} value
     * @returns {Object}
     */
    Properties.prototype.setProperty = function setProperty(key, value) {
        return this.put(key, value);
    };

    ObjectUtils.inherit(Properties, HashMap);
    return Properties;
});