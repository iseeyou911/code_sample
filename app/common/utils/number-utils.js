/**
 * Created by Timofey Novitskiy on 26.02.2015.
 */

define([],
    function () {

        Number.prototype.equals = function equals (number) {
            return this.valueOf() == number;
        };

        function NumberUtils () {
        }

        return new NumberUtils();
    });
