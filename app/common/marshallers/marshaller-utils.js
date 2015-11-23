/**
 * Created by Timofey Novitskiy on 27.02.2015.
 */
define([
    'app/common/marshallers/boolean',
    'app/common/marshallers/date',
    'app/common/marshallers/number',
    'app/common/marshallers/uni-data',
    'app/common/marshallers/form-state'

],function (_Boolean, _Date, _Number, UniData, FormState) {
    function MarshallerUtils () {
        this.boolean = _Boolean;
        this.date = _Date;
        this.number = _Number;
        this.unidata = UniData;
        this.formstate = FormState;
    }

    return new MarshallerUtils();
});