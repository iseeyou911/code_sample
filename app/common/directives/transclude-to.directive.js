/**
 * Created by Timofey Novitskiy on 28.04.2015.
 */
define([],
    function () {
        TranscludeToDirective.$inject = ['$compile'];
        TranscludeToDirective.$name = 'eTranscludeTo';
        /**
         *
         */
        function TranscludeToDirective($compile) {
            return {
                transclude: true,
                require: ['^?eWindow'],
                controller: function () {
                },
                link: function link(scope, element, attrs, controllers, transclude) {
                    var currentElement, linker,
                        selector = attrs[TranscludeToDirective.$name];

                    if (selector) {
                        linker = $compile('<div></div>');
                        linker(scope, function (parentClone, scope) {
                            transclude(function (clone) {
                                var container = $(attrs[TranscludeToDirective.$name]);

                                if (container.length === 1) {
                                    container.append(parentClone);
                                    parentClone.append(clone);
                                    currentElement = parentClone;
                                } else {
                                    element.append(clone);
                                    currentElement = clone;
                                }
                            });
                        }, {
                            transcludeControllers: {
                                eWindow: {
                                    instance: controllers[0]
                                }
                            }
                        });
                    } else {
                        transclude(function (clone) {
                            element.append(clone);
                            currentElement = clone;
                        });
                    }


                    scope.$on('$destroy', function (event) {
                        currentElement && currentElement.remove()
                    });
                }
            }
        }

        return TranscludeToDirective;
    });