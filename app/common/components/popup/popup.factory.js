/**
 * Created by Timofey Novitskiy on 13.03.2015.
 */

define([
        'app/common/utils/object-utils',
        'app/core/events/event-dispatcher'
    ],
    function (ObjectUtils, EventDispatcher) {
        var idGenerator = 0;
        PopupFactory.$inject = ['$compile', '$injector', '$rootScope', '$q'];

        Popup.EVENTS = {
            'onClose': 'onClose',
            'onShow': 'onShow'
        };

        /**
         * Constructor
         *
         * @param {Object{window : Window}} context
         * @param {Object} params
         * @param {String} template
         * @param {String|Long} popupId
         * @param PopupService
         * @constructor
         */
        ObjectUtils.inherit(Popup, EventDispatcher);
        function Popup(popupId, params, context, template, title, PopupService) {
            EventDispatcher.apply(this);
            var popupDom;
            params = params || {};

            this.controllers = params.controllers || {};
            this.opened = false;
            this.id = popupId == null ? 'popup-' + (idGenerator++) : popupId;
            this.context = context;
            this.title = title;

            popupDom = $('<div>')
                .attr('e-popup', '')
                .attr('id', this.id);

            angular.forEach(params.attrs || {}, function (val, key) {
                if (key === 'class') {
                    popupDom.addClass(val);
                    return;
                }

                popupDom.attr(key, val);
            });

            popupDom.attr('is-modal', !!params.isModal);
            if (params.size) {
                popupDom.attr('modal-size', 'modal-' + params.size);
            }

            this.popup = popupDom.append($(template));

            this.getPopupService = function getPopupService() {
                return PopupService;
            };

        }

        Popup.prototype.init = function init($compiler, $rootScope, $q) {
            var scope = $rootScope.$new(),
                self = this, defer = $q.defer();
            this.whenVisible = defer.promise;

            scope.context = this.context;
            scope.title = this.title;
            scope.popup = function popup () {
                return self;
            };

            this.scope = scope;

            $compiler(this.popup)(scope);
            this.popup.modal({
                show: false
            });

            this.popup.on('hidden.bs.modal', function (e) {
                if (self.opened) {
                    self.invokeEvent(Popup.EVENTS.onClose);
                    //self.getPopupService().destroy(self);
                }
            });

            this.popup.on('shown.bs.modal', function (e) {
                defer.resolve();
            });

            this.popup.on('show.bs.modal', function (e) {
                if (!self.opened) {
                    self.invokeEvent(Popup.EVENTS.onShow);
                }
            });
        };

        Popup.prototype.show = function show() {
            this.opened = true;
            this.getPopupService().show(this);
        };

        Popup.prototype.hide = function hide() {
            this.getPopupService().hide(this);
            this.opened = false;
        };

        Popup.prototype.update = function update() {
            var popup = this.popup;

            $(document.body).addClass('modal-open');
            popup.modal('resetScrollbar');
            popup.modal('enforceFocus');
        };

        Popup.prototype.destroy = function destroy() {
            this.getPopupService()._remove(this);

            if (this.opened) {
                this.hide();
                this.invokeEvent(Popup.EVENTS.onClose);
                this.popup.modal('removeBackdrop');
            }

            this.id = null;
            this.popup.remove();
            this.popup = null;
            this.scope.$destroy();
            delete this.scope;
            this.removeAllEventListener();
        };

        Popup.prototype.toggle = function toggle() {
            this.opened = !this.opened;
            this.getPopupService().toggle(this);
        };

        /**
         *
         */
        function PopupFactory($compile, $injector, $rootScope, $q) {
            var popupService;
            this.$q = $q;

            this.getCompiler = function getCompiler() {
                return $compile;
            };

            this.getRootScope = function getRootScope() {
                return $rootScope;
            };

            this.getPopupService = function getPopupService() {
                return popupService = popupService || $injector.get('PopupService');
            };
        }

        /**
         *
         * @param {String|Long} popupId
         * @param {Object{isModal : Boolean, class, ng-class..}} attrs
         * @param {Object{window : Window}} context
         * @param {String} template
         * @param {String|Function} title
         * @return {Popup}
         */
        PopupFactory.prototype.create = function create(popupId, attrs, context, template, title) {
            var popup = new Popup(popupId, attrs, context, template, title, this.getPopupService(), this.getCompiler());
            popup.init(this.getCompiler(), this.getRootScope(), this.$q);
            return popup;
        };

        return PopupFactory;
    });