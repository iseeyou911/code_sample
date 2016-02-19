/**
 * Created by Timofey Novitskiy on 26.02.2015.
 */

define([],
    function () {

        String.prototype.equals = function equals (str) {
            return this.toString() === str;
        };

        String.prototype.trim = function trim () {
            return StringUtils.prototype.trim(this.toString());
        };

        String.prototype.replaceAll = function replaceAll(regexp, replaceText) {
            if (regexp instanceof RegExp) {
                regexp = RegExp(regexp, regexp.flags + 'gm');
            } else if (typeof regexp === 'string' || typeof regexp === 'number') {
                regexp = RegExp(regexp, 'mg');
            }
            return this.toString().replace(regexp, replaceText);
        };

        String.prototype.replaceFirst = function replaceFirst(from, replaceText) {
            return this.toString().replace(from, replaceText);
        };

        String.prototype.isEmpty = function isEmpty () {
            return StringUtils.prototype.isEmpty(this.toString());
        };

        String.prototype.isNotEmpty = function isNotEmpty () {
            return StringUtils.prototype.isNotEmpty(this.toString());
        };

        String.prototype.contains = function contains (substr) {
            return !!this.toString().match((substr || '').replace(/\./g, '\\.'));
        };

        function StringUtils () {
        }

        StringUtils.prototype.isEmpty = function isEmpty (str) {
            return str == null || str === '';
        };

        StringUtils.prototype.isNotEmpty = function isNotEmpty (str) {
            return !StringUtils.prototype.isEmpty(str);
        };

        StringUtils.prototype.endsWith = function endWith (str, sufix) {
            if (str == null) {
                return false;
            }
            return (new RegExp('^.*' + sufix + '$')).test(str);
        };

        StringUtils.prototype.trim = function trim (str) {
            if (str == null) {
                return;
            }
            return str.replace(/^[\s\t]*/, '').replace(/[\s\t]*$/, '');
        };

        return new StringUtils();
    });
