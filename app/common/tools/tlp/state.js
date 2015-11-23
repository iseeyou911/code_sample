/**
 * Created by Timofey Novitskiy on 28.04.2015.
 */
define([
        'app/common/tools/tlp/const'
    ],
    function (CONST) {
        function State (parentState) {
            this.value = '';
            this.parentState = parentState;
            this.minLength = 1;
        }

        State.prototype.test = function test (token) {
            var testValue = this.value + token;

            if (this.minLength === 1 || this.minLength >= testValue.length) {
                return this.regExp.some(function(regExp){
                    return regExp.test(testValue);
                });
            } else if (this.minLength > 1 && this.minLength < testValue.length) {
                return this.trigger.test(testValue);
            }

            return false;
        };

        State.prototype.append = function append (token) {
            this.value += token;
            return this;
        };

        State.prototype.newState = function (value) {
            var newState = new State(value, this.parentState);

            //Реализация вложенных стейтов
            if (newState.state === CONST.OPEN) {
                //Если текущий стейт является литералом,
                //а следущий открывающей скобкой,
                //то выражение явлется функцией
                if (this.state === CONST.LITERAL) {
                    newState = this;
                    newState.isFunction = true;
                } else {
                    this.nextState = newState;
                    this.nextState.prevState = this;
                }

                newState.childState = new State();
                newState.childState.parentState = newState;
                return newState.childState;
            } else if (newState.state === CONST.CLOSE) {
                if (!this.parentState) {
                    throw 'Unexpected close statement';
                }
                return this.parentState;
            } else {
                this.nextState = newState;
                this.nextState.prevState = this;

                return this.nextState;
            }
        };

        return State;
    });
