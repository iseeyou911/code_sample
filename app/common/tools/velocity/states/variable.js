/**
 * Created by Timofey Novitskiy on 19.05.2015.
 */
define([
        'app/common/tools/tlp/state',
        'app/common/utils/object-utils'
    ],
    function (State, ObjectUtils) {
        Variable.$type = 'VARIABLE';
        Variable.$priority = 1;

        function Variable () {
            State.apply(this, arguments);
            this.type = Variable.$type;
            this.trigger = /^\$.*/;
            this.minLength = 2;
            this.regExp = [/^\$[a-zA-Z][a-zA-Z0-9\-_]*$/, /^\$\{/];
            this.priority = Variable.$priority;
        }

        return ObjectUtils.inherit(Variable, State);
    });