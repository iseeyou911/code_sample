/**
 * Created by Timofey Novitskiy on 13.03.2015.
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

        PopupService.prototype.show = function show (popup) {
            popup.popup.modal('show');
        };

        PopupService.prototype.hide = function hide (popup) {
            popup.popup.modal('hide');
        };

        PopupService.prototype.toggle = function toggle (popup) {
            popup.popup.toggle();
        };

        PopupService.prototype.destroy = function destroy (popup) {
            popup.destroy();
        };

        PopupService.prototype._remove = function _remove (popup) {
            delete this.popups[popup.id];
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
            var popup = this.getPopupFactory().create(id, attrs, context, template, title);

            this.popups[popup.id] = popup;
            return popup;
        };

        return PopupService;
    });