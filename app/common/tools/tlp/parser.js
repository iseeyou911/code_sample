/**
 * Created by Timofey Novitskiy on 28.04.2015.
 */
define([
        'app/common/tools/tlp/token',
        'app/common/tools/tlp/state-factory'
    ],
    function (Token, StateFactory) {

        /**
         *
         * @param {Array[State]} states
         * @constructor
         */
        function Parser (states, stateGraph) {
            this.stateGraph = stateGraph;
            this.stateFactory = new StateFactory(states);
        }

        /**
         * @param {String} str string for parsing
         */
        Parser.prototype.parse = function parse(str) {
            var token, i,
                str = str || '';

            for (i = 0; i < str.length; i++) {
                token = str.charAt(i);
                this.currentState = this.processToken(this.currentState, this.currentStateNode, token, str, i);
            }
        };

        Parser.prototype.processToken = function processToken(state, stateNode, token, source, index, parentState) {
            var i, nextStateCandidate, childrenStates,
                availableStates = this.stateGraph;

            if (stateNode && state && state.test(token)) {
                this.currentStateNode = stateNode;
                return state.append(token);
            }

            if (stateNode) {
                childrenStates = stateNode.children;
                if (childrenStates && childrenStates.length > 0) {
                    childrenStates = childrenStates.filter(function(childState){
                        var i;
                        if (childState.open) {
                            for (i = 0; i < childState.open.length; i++){
                                if (childState.open[i].test(token)) {
                                    return true;
                                }
                            }
                        } else {
                            return true;
                        }
                    });
                }
            }

            availableStates.sort(function(stateA, stateB){
                return (stateA.priority || stateA.clazz.$priority) <= (stateB.priority || stateB.clazz.$priority) ? 1 : -1;
            });

            if (source.length > index + 1) {
                for (i = 0; i < availableStates.length; i++) {
                    nextStateCandidate = availableStates[i];

                    if (state && state instanceof nextStateCandidate.clazz && state.test(token)) {
                        this.currentStateNode = nextStateCandidate;
                        return state.append(token);
                    }

                    nextStateCandidate = this.processToken(new stateNode.clazz(state), nextStateCandidate, token, source, index);
                    if (nextStateCandidate) {
                        this.currentStateNode = nextStateCandidate;
                        return nextStateCandidate;
                    }
                }
            }

            return false;
        };

        return Parser;
    });
