/**
 * Created by Timofey Novitskiy on 28.04.2015.
 */
define([
        'app/common/tools/tlp/state'
    ],
    function (State) {
        function StateFactory (states) {
            this.types = [];
            this.states = {};
            (states || []).forEach(this.add, this);
        }

        /**
         *
         * Adding new state to factrory
         *
         * @param {State} state
         */
        StateFactory.prototype.add = function add (state) {
            var type = state.$type;

            this.types.push(type);
            this.states[type] = state;
        };

        /**
         *
         * @param {String} type
         * @returns {*}
         */
        StateFactory.prototype.get = function get (type) {
            if (!this.states[type]) {
                throw 'State with type [' + type + '] is not found';
            }
            return this.states[type];
        };

        return StateFactory;
    });
