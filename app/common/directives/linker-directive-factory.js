/**
 * Created by Timofey Novitskiy on 08.05.2015.
 *
 * @name LinkerFactory
 *
 * @description
 *
 * Фабрика для создания директивы, позволяющей получить доступ к
 * контроллеру дочерней директивы, из родительской
 * У родительской директивы должна быть функция имя которой указывается в параметре
 * directive-name, в данную функцию будет передан дочерний контроллер.
 *
 * @param {String} directive-name имя функции родительского контролера,
 * в которую будет передан дочерний контроллер
 *
 * @example
 *
 `
 //index.js
 angular.module('linker-directive-factory', [])
 .directive('dir1', function () {
                return {
                    transclude: 'true',
                    template: '<div ng-transclude=""></div>',
                    require:'dir1',
                    controller: function () {
                        this.name = 'dir1';
                        this.$link = (controller)=>{
                            this.name2 = controller.name;
                        }
                    },
                    link: function () {
                    }
                };
            })
 .directive('dir2', function () {
                return {
                    controller: function () {
                        this.name = 'dir2';
                    },
                    link: function () {
                    }
                };
            })
 .directive('linker', linkerDirectiveFactory('dir1', 'dir2'));

 //index.html
 <div dir1="" ><div dir2="" linker=""></div></div>
 `
 */
define(function () {
    /**
     *
     * @param directiveName
     * @param parentDirectiveName
     * @param childDirectiveName
     * @returns {Function}
     * @constructor
     */
    function LinkerFactory (directiveName, parentDirectiveName, childDirectiveName) {
        return function () {
            return {
                scope: {
                    link: '@' + directiveName
                },
                require: ['^' + parentDirectiveName, childDirectiveName],
                //terminal: true,
                link: function (scope, element, attrs, controllers) {
                    var parentController = controllers[0],
                        childController = controllers[1];
                    parentController[scope.link] && parentController[scope.link](childController);

                    scope.$on('$destroy', function(){
                        parentController[scope.link] && parentController[scope.link](childController, true);
                    });
                }
            };
        };
    }
    return LinkerFactory;
});