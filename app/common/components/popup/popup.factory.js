/**
 * Created by Timofey Novitskiy on 13.03.2015.
 *
 * @name popupFactory
 *
 * @description
 * Фабрика для создания попапов программным путем. Объект Popup
 * позволяет контролирвать открытие, закрытие, удаление попапа.
 *
 * Объект params может содержвать следующие значения
 * {Boolean} isModal true - использовать шаблон модального окна, false (по умолчанию) - нет
 * {String} class - классы которые будут добавлены к тэгу попапа,
 * {String} size - размеры модально окна, допустимые значения lg|sm|md
 * {Object} controllers - родительские контроллеры, которые будут доступны внутри попапа,
 * объект имеет следующий формат:
 * {CONTROLLER_NAME: CONTROLLER_INSTANCE,...}
 *
 * @param {String|Long} popupId идентификатор попапа, если не
 * указан будет использован случайный идентификатор.
 * @param {Object} context
 * @param {Object} params параметры использующиеся при создании
 * @param {String} template DOM шаблок попапа
 * @param {String|Function} title заголовок попапа, может быть функцией
 *
 * @return {Popup}
 *
 * @example
 *
 * @see PopupService
 *
 * @see ePopup
 */

define([
        'app/common/utils/object-utils',
        'app/common/components/events/event-dispatcher',
        'app/common/components/popup/popup-consts',
        '_'
    ],
    function (ObjectUtils, EventDispatcher, PopupConsts, _) {
        PopupFactory.$inject = ['$compile', '$injector', '$rootScope', '$q'];

        Popup.EVENTS = PopupConsts.EVENTS;

        /**
         * Constructor
         *
         *
         * @param {String|Long} popupId
         * @param {Object} context
         * @param {Object} params
         * @param {String} template
         * @param {String} title
         * @param {PopupService} PopupService
         * @constructor
         */
        ObjectUtils.inherit(Popup, EventDispatcher);
        function Popup(popupId, params, context, template, title, PopupService) {
            EventDispatcher.apply(this);
            var popupDom;
            params = params || {};

            this.controllers = params.controllers || {};
            this.opened = false;
            this.id = popupId == null ? 'popup-' + (_.uniqueId()) : popupId;
            this.context = context;
            this.title = title;

            popupDom = $('<div>')
                .attr('e-popup', 'context')
                .attr('title', 'title')
                .attr('controllers', 'controllers')
                .attr('on-close', 'onClose()')
                .attr('on-show', 'onShow()')
                .attr('on-shown', 'onShown()')
                .attr('popup-id', this.id);

            _.forEach(params.attrs || {}, function (val, key) {
                if (key == 'class') {
                    popupDom.addClass(val);
                    return;
                }

                popupDom.attr(key, val);
            });

            popupDom.attr('is-modal', !!params.isModal);
            if (params.size) {
                popupDom.attr('modal-size', 'modal-' + params.size);
            }

            this.popupDom = popupDom.append($(template));

            this.getPopupService = function getPopupService() {
                return PopupService;
            };

        }

        Popup.prototype._init = function _init($compiler, $rootScope, $q) {
            var scope = $rootScope.$new(), element,
                self = this, defer = $q.defer();
            this.whenVisible = defer.promise;

            scope.context = this.context;
            scope.title = this.title;
            scope.controllers = function controllers() {
                return self.controllers;
            };

            scope.onClose = function onClose() {
               self.opened = false;
               self.invokeEvent(Popup.EVENTS.onClose);
            };

            scope.onShow = function onShow() {
                if (!self.opened) {
                    self.opened = true;
                    self.invokeEvent(PopupConsts.EVENTS.onShow);
                }
            };

            scope.onShown = function onShown() {
                defer.resolve();
                self.invokeEvent(PopupConsts.EVENTS.onShown);
            };

            this.scope = scope;
            scope.$on('$destroy', function(){
                self.cleanup();
            });

            $compiler(this.popupDom)(scope);
        };

        /**
         * Change something in scope context
         */
        Popup.prototype.apply = function apply(_func) {
            this.scope && this.scope.$apply(_func);
        };

        /**
         * Open popup
         */
        Popup.prototype.show = function show() {
            this.getPopupService().show(this.id);
        };

        /**
         * Hide popup
         */
        Popup.prototype.hide = function hide() {
            this.getPopupService().hide(this.id);
            this.opened = false;
        };

        /**
         * Update scrolls focus and class modal-open in body
         */
        Popup.prototype.update = function update() {
            var popup = this.popupDom;

            $(document.body).addClass('modal-open');
            popup.modal('resetScrollbar');
            popup.modal('enforceFocus');
        };

        /**
         * Cleanup properties after destruction of popup
         */
        Popup.prototype.cleanup = function cleanup(){
            this.opened = false;
            this.destroyed = true;
            delete this.scope;
            delete this.popupDom;
            delete this.context;
            this.removeAllEventListener();
        };

        /**
         * Destroy popup scope and popup directive
         */
        Popup.prototype.destroy = function destroy() {
            if (this.destroyed) {
                return;
            }

            this.scope.$destroy();
        };

        /**
         * Toggle popup
         */
        Popup.prototype.toggle = function toggle() {
            this.opened = !this.opened;
            this.getPopupService().toggle(this);
        };

        /**
         * @constructor
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
         * @param {Object} context
         * @param {{[{Boolean} isModal], [{String} class], [{String} size], [{Object} controllers}]} params
         * @param {String} template
         * @param {String} title
         * @return {Popup}
         */
        PopupFactory.prototype.create = function create(popupId, attrs, context, template, title) {
            var popup = new Popup(popupId, attrs, context, template, title, this.getPopupService(), this.getCompiler());
            popup._init(this.getCompiler(), this.getRootScope(), this.$q);
            return popup;
        };

        return PopupFactory;
    });