/**
 * Created by Timofey Novitskiy on 13.03.2015.
 *
 * @name PopupService
 *
 * @description
 * Сервис для создания и управления попапами
 *
 * @example
 `
 var popup = PopupService.create(id, {
                        isModal: true,
                        size: 'lg',
                        controllers: function () {
                            return {
                                'prntCtrl': instance
                            }
                        }
                    },
 {
     text: 'Text'
 }, '<div id="modal-content">{{context.text}}</div>', 'Title');

 popup.show();
 popup.hide();
 `
 */

define([],
    function () {

        PopupService.$inject = ['popupFactory'];

        /**
         *
         */
        function PopupService(popupFactory) {
            this.popups = {};

            this.getPopupFactory = function getPopupFactory () {
                return popupFactory;
            }
        }

        PopupService.prototype.show = function show (id) {
            var popup = this.popups[id];
            popup && popup.show();
        };

        PopupService.prototype.hide = function hide (id) {
            var popup = this.popups[id];
            popup && popup.hide();
        };

        PopupService.prototype.toggle = function toggle (id) {
            var popup = this.popups[id];
            popup && popup.toggle();
        };

        PopupService.prototype.destroy = function destroy (id) {
            var popup = this.popups[id];
            popup && popup.destroy();
        };

        /**
         *
         * remove popup from cache, call automaticaly by popup directive
         *
         * @param {ePopupController} popup
         * @private
         */
        PopupService.prototype._remove = function _remove (popup) {
            delete this.popups[popup.getId()];
        };

        /**
         * add popup to cache, call automaticaly by popup directive
         *
         * @param {ePopupController} popup
         * @private
         */
        PopupService.prototype._add = function _add (popup) {
            this.popups[popup.getId()] = popup;
        };

        /**
         *
         * @param {*} id
         * @param {Object} attrs
         * @param {Object} context
         * @param {String} template
         * @param {String|Function} title
         * @returns {Popup}
         */
        PopupService.prototype.create = function create (id, attrs, context, template, title) {
            return this.getPopupFactory().create(id, attrs, context, template, title);
        };

        return PopupService;
    });