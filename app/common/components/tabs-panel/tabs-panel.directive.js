/**
 * Created by Timofey Novitskiy on 16.04.2015.
 *
 * @name eTabsPanel
 *
 * @description отзывчивые вклаки, при нехватки места для вкладок
 * не поместившиеся вкладки будут отображаться в раскрывающемся меню
 * поддерживает пользовательскую разметку вкладки, а также размещение
 * панели вкладов в модальных окнах (@see ePopup)
 *
 * @param {Array} eTabsPanel
 * список вкладок
 * @param {Boolean} isClosable отображение кнопки закрыть
 * @param {Expression} onClose колбек при нажатии на кнопку закрыть
 * @param {Expression} isVisible вызывается для определения видима вкладка
 * или нет, что вкладка была не видима выражение должно вернуть false
 * @param {Expression} isActive вызывается для определения активна ли вкладка
 * активной, вкладке добавляется класс active
 * @param {Expression} isLoading вызывается для определения находится ли вкладка
 * в состоянии загрузки, вкладке добавляется класс loading
 * @param {Expression} activate колбэк вызываемый при клике на вкладку для активации
 *
 * Во всех выражения, колбеках, а также в шаблоне элемента вкладка доступна
 * через переменную $tab
 *
 *
 * @example
 *
 `
 <div
     e-tabs-panel="tabs"
     is-loading="$tab.isLoading()"
     is-visible="$tab.isVisible()"
     activate="$tab.activate()"
     on-close="$tab.closed = true; $tab.visible = false"
     is-active="$tab.isActive()"
     is-loading="$tab.isLoading()"
     is-closable="false">
        {{tab.text}}
 </div>',

 `
 *
 */
define([
        '_',
        'text!./tabs-panel.tmpl.html'
    ],
    function (_, template) {
        TabsPanel.$inject = [];
        TabsPanel.$name = 'eTabsPanel';

        function TabsPanel() {
            return {
                template: template,
                restrict: 'A',
                transclude: true,
                scope: {
                    tabs: '=eTabsPanel',
                    isClosable: '=',
                    onClose: '&',
                    isVisible: '&',
                    isActive: '&',
                    isLoading: '&',
                    activate: '&'
                },
                require: [TabsPanel.$name, '?^ePopup'],
                controllerAs: 'tabsController',
                controller: ['$scope', '$element', function controller($scope, $element) {
                    var self = this,
                        id = _.uniqueId(),
                        resizeEventHandler = 'resize.tabs-panel-' + id;

                    this.visibleTabs = [];
                    this.hiddenTabs = [];

                    this.isVisible = function isVisible(tab) {
                        return $scope.isVisible({$tab: tab}) !== false;
                    };

                    this.isLoading = function isLoading(tab) {
                        return $scope.isLoading({$tab: tab});
                    };

                    this.isActive = function isActive(tab) {
                        return $scope.isActive({$tab: tab});
                    };

                    this.onClose = function onClose(tab) {
                        $scope.onClose({$tab: tab});
                    };

                    this.activate = function activate(tab) {
                        $scope.activate({$tab: tab});
                    };

                    this.init = function init(transcludeFn) {
                        this.transcludeFn = transcludeFn;
                    };

                    $(window).on(resizeEventHandler, _.debounce(function () {
                        $scope.$apply(function () {
                            self.layout(true);
                        });
                    }, 100));

                    $scope.$on('$destroy', function () {
                        $(window).off(resizeEventHandler);
                    });

                    this.layout = function layout(reloadVisibleTabs) {
                        var container = $element.find('div[role=navigation]')[0],
                            startFrom = 0,
                            totalWidth = container.getBoundingClientRect().width,
                            tabsSize = 0,
                            self = this,
                            repeat, i, activeIndex, tabsWidth;

                        if (reloadVisibleTabs) {
                            this.visibleTabs = ($scope.tabs || [])
                                .filter(function (tab, index) {
                                    return this.isVisible(tab);
                                }, this);
                        }

                        for (i = 0; i < this.visibleTabs.length; i++) {
                            if (this.isActive(this.visibleTabs[i])) {
                                activeIndex = i;
                                break;
                            }
                        }

                        tabsWidth = [];
                        $element.find('.tabs-wrapper > li[e-tab=tab]')
                            .each(function (index, li) {
                                tabsWidth.push(li.getBoundingClientRect().width);
                            });

                        do {
                            repeat = false;
                            this.hiddenTabs = [];
                            tabsSize = 0;
                            tabsWidth.forEach(function (width, index) {
                                tabsSize += width;
                                if (tabsSize < totalWidth) {
                                    startFrom = index;
                                } else {
                                    this.hiddenTabs.push(this.visibleTabs[index]);
                                }
                            }, this);

                            if (activeIndex > startFrom) {
                                this.visibleTabs = this.visibleTabs.splice(activeIndex, 1).concat(this.visibleTabs);
                                tabsWidth = tabsWidth.splice(activeIndex, 1).concat(tabsWidth);
                                activeIndex = 0;
                                repeat = true;
                            }
                        } while (repeat);
                    }
                }],
                compile: function compile(element, attrs, transclude) {
                    return {
                        pre: function link(scope, tElement, tAttrs, controllers, transclude) {
                            var controller = controllers[0],
                                popupController = controllers[1];

                            controller.init(transclude);

                            scope.$watchCollection('tabs', function (value) {
                                controller.visibleTabs = value;
                                scope.$evalAsync(function () {
                                    //Dialogs will appear after rendering content
                                    //so we need to do layout after it was appeared
                                    var tab = (controller.visibleTabs || [])[0];
                                    if (tab) {
                                        if (popupController) {
                                            $(popupController.getElement())
                                                .one('shown.bs.modal', function () {
                                                controller.layout(true);
                                            });
                                        } else {
                                            controller.layout(true);
                                        }
                                    }
                                });
                            });
                        }
                    }
                }

            };
        }

        return TabsPanel;
    });
