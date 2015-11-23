/**
 * Created by Timofey Novitskiy on 26.02.2015.
 */

define([],
    function () {

        String.prototype.equals = function equals (str) {
            return this.toString() === str;
        };
        String.prototype.trim = function trim () {
            return StringUtils.prototype.trim(this);
        };
        String.prototype.replaceAll = function replaceAll(regexp, replaceText) {
            return this.toString().replace(new RegExp(regexp), replaceText);
        };

        String.prototype.replaceFirst = function replaceFirst(from, replaceText) {
            return this.toString().replace(from, replaceText);
        };

        String.prototype.isEmpty = function isEmpty () {
            return StringUtils.prototype.isEmpty(this);
        };

        String.prototype.isNotEmpty = function isNotEmpty () {
            return StringUtils.prototype.isNotEmpty(this);
        };

        String.prototype.contains = function contains (substr) {
            return !!this.match((substr || '').replace(/\./g, '\\.'));
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
