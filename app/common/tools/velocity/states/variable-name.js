/**
 * Created by Timofey Novitskiy on 19.05.2015.
 */
define([
        'app/common/tools/tlp/state',
        'app/common/utils/object-utils'
    ],
    function (State, ObjectUtils) {
        VariableName.$type = 'VARIABLE_NAME';

        function VariableName () {
            State.apply(this, arguments);
            this.type = Variable.$type;
            this.regExp = [/^\[a-zA-Z][a-zA-Z0-9\-_]+$/];
            this.priority = 1;
        }

        return ObjectUtils.inherit(VariableName, State);
    });
