/**
 * Created by Timofey Novitskiy on 16.04.2015.
 */
define([
        'text!./tabs-panel.tmpl.html'
    ],
    function (template) {
        var id = 0;

        TabsPanel.$inject = [];
        TabsPanel.$name = 'eTabsPanel';

        function TabsPanel() {
            return {
                template: template,
                restrict: 'A',
                transclude: true,
                scope: {
                    tabs: '=eTabsPanel',
                    isClosable: '='
                },
                require: TabsPanel.$name,
                controllerAs: 'tabsController',
                controller: ['$scope', '$element', function controller($scope, $element) {
                    var self = this,
                        id = id++,
                        resizeEventHandler = 'resize.tabs-panel-' + id;

                    this.visibleTabs = [];
                    this.hiddenTabs = [];

                    this.init = function init(transcludeFn) {
                        this.transcludeFn = transcludeFn;
                    };

                    $(window).on(resizeEventHandler, function(){
                        $scope.$applyAsync(function(){
                            self.layout(true);
                        });
                    });

                    $scope.$on('$destroy', function(){
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
                                    return tab.isVisible();
                                });
                        }

                        for (i = 0; i < this.visibleTabs.length; i++) {
                            if (this.visibleTabs[i].isActive()) {
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
                        pre: function link(scope, tElement, tAttrs, controller, transclude) {
                            controller.init(transclude);
                            scope.$watchCollection('tabs', function (value) {
                                controller.visibleTabs = value;
                                scope.$evalAsync(function () {
                                    //Dialogs will appear after rendering content
                                    //so we need to do layout after it was appeared
                                    var eWindow,
                                        tab = (controller.visibleTabs || [])[0];
                                    if (tab) {
                                        eWindow = tab.getForm ? tab.getForm().getWindowContainer() : null;
                                        if (eWindow && eWindow.isDialog) {
                                            eWindow.container
                                                .whenVisible.then(function(){
                                                    controller.layout(true);
                                                });
                                        } else {
                                            controller.layout(true);
                                        }
                                    }
                                });
                            });
                        },
                        post: function post() {
                        }
                    }
                }

            };
        }

        return TabsPanel;
    });
