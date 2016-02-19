/**
 * Created by Timofey Novitskiy on 17.12.2015.
 */
define([],
    function () {
        MaskOptionalService.$inject = [];
        MaskOptionalService.$name = 'MaskOptionalService';
        /**
         *
         */
        function MaskOptionalService() {
            function getOptionalsIndexes(mask) {
                var indexes = [];

                try {
                    var regexp = /\?/g;
                    var match = [];

                    while ((match = regexp.exec(mask)) != null) {
                        // Save the optional char
                        indexes.push((match.index - 1));
                    }
                } catch (e) {
                    throw e;
                }

                return {
                    fromMask: function () {
                        return indexes;
                    },
                    fromMaskWithoutOptionals: function () {
                        return getOptionalsRelativeMaskWithoutOptionals(indexes);
                    }
                };
            }

            function getOptionalsRelativeMaskWithoutOptionals(optionals) {
                var indexes = [];
                for (var i = 0; i < optionals.length; i++) {
                    indexes.push(optionals[i] - i);
                }
                return indexes;
            }

            function removeOptionals(mask) {
                var newMask;

                try {
                    newMask = mask.replace(/\?/g, '');
                } catch (e) {
                    throw e;
                }

                return newMask;
            }

            return {
                removeOptionals: removeOptionals,
                getOptionals: getOptionalsIndexes
            }
        }


        return MaskOptionalService;
    });