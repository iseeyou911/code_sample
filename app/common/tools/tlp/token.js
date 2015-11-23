/**
 * Created by Timofey Novitskiy on 28.04.2015.
 */
define([],
    function () {
        function Token (value, previousToken) {
            this.availableStates = [];

            this.value = value;
            this.prev = previousToken;

            if (previousToken) {
                previousToken.next = this;
            }
        }

        Token.prototype.test = function test (states) {
            return this.availableStates = states.map(function(state){
                return state.test(this.value);
            }, this);
        };

        return Token;
    });
