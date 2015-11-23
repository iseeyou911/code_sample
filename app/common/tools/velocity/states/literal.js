/**
 * Created by Timofey Novitskiy on 19.05.2015.
 */
define([
        'app/common/tools/tlp/state',
        'app/common/utils/object-utils'
    ],
    function (State, ObjectUtils) {
        Literal.$type = 'LITERAL';
        Literal.$priority = 0;

        function Literal () {
            State.apply(this, arguments);
            this.type = Literal.$type;
            this.priority = Literal.$priority;
            this.regExp = [/.*/];
        }

        return ObjectUtils.inherit(Literal, State);
    });
