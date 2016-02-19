/**
 * Created by Timofey Novitskiy on 28.04.2015.
 *
 * @name eTranscludeTo
 *
 * @description
 *
 * Директива позволяет трансклюдировать (перенести) узел (domnode) в другой узел/узлы.
 * Поиск нового родительского узла осуществляется с помощью jQuery селектора.
 * В случае если селектор соответсвует нескольким узлам, трансклюдируемый узел будет
 * клонирован во все найденные узлы. Если селектор отсутствует, то трансклюдируемый узел
 * будет оставлен на прежнем месте. С помощью атрибута parent-controller можно передать
 * экземпляры родительских контроллеров, необходимые внутренним директивам.
 *
 * @param {String|{{Expression}}} eTranscludeTo селектор
 * @param {{{ctrlInstance}ctrlName...}} parentController список родительских контроллеров
 *
 * @example
 *
 `
 <div id="" parent-controllers="{dir0: dir0Ctrl}">
 <div dir2="" ></di"></div>
 <div dir0="">
    <div dir1="">
        <div e-transclude-to="#transcludeHere" parent-controllers="{dir0: dir0Ctrl}">
            <div dir2="" ></div>
        </div>
    </div>
 </div>
 `
 *
 */
define(['_'],
    function (_) {
        TranscludeToDirective.$inject = ['$compile'];
        TranscludeToDirective.$name = 'eTranscludeTo';
        /**
         *
         */
        function TranscludeToDirective($compile) {
            return {
                transclude: 'element',
                scope: {
                    parentControllers: '='
                },
                controller: function () {
                },
                link: function link(scope, element, attrs, controllers, transclude) {
                    var elementsToRemove = [],
                        scopesToDestroy = [],
                        selector = attrs[TranscludeToDirective.$name],
                        container = $(attrs[TranscludeToDirective.$name]);

                    if (selector) {
                        container.each(function (index, node) {
                            transclude(function (clone, _scope) {
                                bindParentControllers(clone);
                                container.append(clone);
                                elementsToRemove.push(clone);
                                scopesToDestroy.push(_scope);
                            });
                        });

                    } else {
                        transclude(function (clone, _scope) {
                            bindParentControllers(clone);
                            element.after(clone);
                            elementsToRemove.push(clone);
                            scopesToDestroy.push(_scope);
                        });
                    }

                    scope.$on('$destroy', function (event) {
                        elementsToRemove.forEach(function (element) {
                            element.remove();
                        });
                        scopesToDestroy.forEach(function (_scope) {
                            _scope.$destroy();
                        });
                    });

                    function bindParentControllers (node) {
                        _.map(scope.parentControllers, function (instance, controllerName) {
                            node.data('$' + controllerName + 'Controller', instance);
                        });
                    }
                }
            }
        }

        return TranscludeToDirective;
    });