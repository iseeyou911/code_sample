/**
 * Created by Timofey Novitskiy on 08.05.2015.
 */
define(function () {
    function LinkerFactory (parentDirectiveName, childDirectiveName) {
        return function () {
            return {
                require: ['^' + parentDirectiveName, childDirectiveName],
                //terminal: true,
                link: function (scope, element, attrs, controllers) {
                    var parentController = controllers[0],
                        childController = controllers[1];
                    parentController.$link && parentController.$link(childController);
                }
            };
        };
    }
    return LinkerFactory;
});