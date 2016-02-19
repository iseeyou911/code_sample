/**
 * Created by Timofey Novitskiy on 30.04.2015.
 *
 * @name eSuggestionsList
 *
 * @description
 * директива отображения списка подстановок, поддерживает
 * пользовательские шаблоны для элементов списка, поддерживает
 * управление с клавитатуры
 *
 * @param {Array} eSuggestionsList элементы списка
 * @param {Boolean} isVisible скрыть\показать список
 * @param {Expression} onSelect колбек, вызываемый при выборе элемента,
 * в него передается выбранное значение $item
 * @param {Expression} onBlur колбэк, вызываемый при потери фокуса при вызове
 * доступен параметр $event
 * @param {Expression} onHide колбэк, вызываемый при закрытии списка
 *
 * @example
 *
 `
 <div
 e-suggestions-list="template.suggestions"
 on-select="onSelectSuggestion($item)"
 on-hide="onHideSuggestionsList($event)"
 is-visible="template.showSuggestionsList">
    <h4 class="list-group-item-heading">{{$item.text}}</h4>
    <p class="list-group-item-text" ng-if="$item.description">{{$item.description}}</p>
 </div>
 `
 *
 */
define([
        'text!./suggestions-list.tmpl.html'
    ],
    function (template) {
        var suggestionListCounter = 0;

        SuggestionsListDirective.$inject = [];
        SuggestionsListDirective.$name = 'eSuggestionsList';
        /**
         *
         */
        function SuggestionsListDirective() {
            return {
                template: template,
                transclude: true,
                scope: {
                    items: '=eSuggestionsList',
                    onSelect: '&',
                    onHide: '&',
                    onBlur: '&',
                    isVisible : '='
                },
                controller: SuggestionsListController,
                link: function link(scope, element, attrs, controllers, transclude) {
                    suggestionListCounter++;
                    scope.elementId = SuggestionsListDirective.$name + '_' + suggestionListCounter;
                    scope.onKeyUp = function onKeyUp (event) {
                        if (event.keyCode === 27) {
                            scope.onHide({$event : event});
                            event.preventDefault();
                            event.stopImmediatePropagation();
                            return false;
                        }
                    };

                    scope.$on('$destroy', function(){
                        $(document).off('click.' + scope.elementId);
                        element.remove();
                    });

                    scope.$watch('isVisible', function(value){
                        if (!value) {
                            $(document).off('click.' + scope.elementId);
                        } else {
                            $(document).on('click.' + scope.elementId, function(event){
                                scope.$apply(function(){
                                    element.has(document.activeElement).length === 0 && scope.onHide({$event : event});
                                });
                            });
                        }
                    });

                }
            }
        }

        SuggestionsListController.$inject = ['$element', '$scope'];
        function SuggestionsListController($element, $scope) {
            var items = [];
            this.addItem = function addItem(itemCtrl) {
                items.push(itemCtrl);
            };

            this.removeItem = function removeItem(itemCtrl) {
                var indexOf = items.indexOf(itemCtrl);
                items.splice(indexOf, 1);
            };

            this.isFocused = function isFocused(event){
                return $element.has(event.relatedTarget || document.activeElement).length === 1;
            };

            this.focusNext = function (itemCtrl) {
                var indexOf;

                if (items.length === 0) {
                    return;
                }
                indexOf = items.indexOf(itemCtrl);
                indexOf = indexOf === items.length - 1 ? 0 : indexOf + 1;

                items[indexOf].focus();
            };

            this.focusPrev = function (itemCtrl) {
                var indexOf;

                if (items.length === 0) {
                    return;
                }
                indexOf = items.indexOf(itemCtrl);
                indexOf = indexOf === 0 ? items.length - 1 : indexOf - 1;

                items[indexOf].focus();
            };

            this.focus = function (itemCtrl) {
                if (items.length === 0) {
                    return;
                }
                (itemCtrl || items[0]).focus();
            };

            this.select = function (item) {
                $scope.onSelect({
                    $item: item || $scope.items[0]
                });
            };
        }

        return SuggestionsListDirective;
    });