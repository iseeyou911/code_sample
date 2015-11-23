/**
 * Created by Timofey Novitskiy on 30.04.2015.
 */
define([],
    function () {
        SuggestionItemDirective.$inject = [];
        SuggestionItemDirective.$name = 'eSuggestionItem';
        /**
         *
         */
        function SuggestionItemDirective() {
            return {
                require: ['eSuggestionItem', '^eSuggestionsList'],
                controller: ['$element', function ($element) {
                    this.focus = function(){
                        $element.focus();
                    };
                }],
                scope: {
                    $item: '=eSuggestionItem'
                },
                compile: function (element, attrs, transclude) {
                    return function link(scope, element, attrs, controllers) {
                        var id, eSuggestionsList = controllers[1];

                       eSuggestionsList.addItem(controllers[0]);

                        transclude(scope, function (clone) {
                            element.append(clone);
                        });

                        element.on('keyup', function (event) {

                            var stopPropagation = event.keyCode === 13 ||
                                event.keyCode === 40 || event.keyCode === 38;

                            scope.$apply(function () {

                                if (event.keyCode === 13) {
                                    eSuggestionsList.select(scope.$item);
                                } else if (event.keyCode === 40) {
                                    eSuggestionsList.focusNext(controllers[0]);
                                } else if (event.keyCode === 38) {
                                    eSuggestionsList.focusPrev(controllers[0]);
                                }

                            });
                            if (stopPropagation) {
                                event.preventDefault();
                                event.stopPropagation();
                                event.stopImmediatePropagation();
                                return false;
                            }
                        });

                        element.on('dblclick', function (event) {
                            scope.$apply(function () {
                                eSuggestionsList.select(scope.$item);
                            });
                        });

                        scope.$on('$destroy', function (){
                            eSuggestionsList.removeItem(id);
                        });
                    }
                }
            };
        }

        return SuggestionItemDirective;
    });