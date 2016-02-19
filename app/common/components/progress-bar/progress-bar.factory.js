/**
 * Created by Timofey Novitskiy on 02.11.2015.
 *
 * @name progressBarFactory
 *
 * @description
 *
 * Фабрика для создания прогрессбаров, прогрессбар открывается в
 * своем отдельном попапе @see ePopup
 *
 * @param {String} description строка описания
 * @param {Number} [max] максимальное значение счетчика, по умолчанию 100
 *
 * @return ProgressBar
 *
 * @See ProgressBarService
 */
define(['_'],
    function (_) {
        var template = '<div e-progress-bar="context"></div>';

        ProgressBarFactory.$inject = ['PopupService', '$injector'];
        ProgressBarFactory.$name = 'progressBarFactory';

        /**
         * @param {PopupService} PopupService
         * @param {ProgressBarService} ProgressBarService
         * @param {String} description
         * @param {Number} [max]
         * @param {Number} [loaded]
         * @constructor
         */
        function ProgressBar(PopupService, ProgressBarService, description, max, loaded) {
            this.id = 'progress-bar-' + (_.uniqueId());
            this.context = {
                max : max || 100,
                description : description,
                loaded: loaded
            };

            this.getPopupService = function getPopupService () {
                return PopupService;
            };

            this.getProgressBarService = function getProgressBarService () {
                return ProgressBarService;
            };
        }

        /**
         * Setter for loaded value
         */
        ProgressBar.prototype.loaded = function loaded (value) {
            var self = this;
            this.container.apply(function(){
                self.context.loaded = value;
            });
        };

        /**
         * Hide and destroy progress bar
         */
        ProgressBar.prototype.close = function close () {
            this.getProgressBarService().close(this.getId());
        };

        /**
         * Destroy progress bar
         */
        ProgressBar.prototype.destroy = function destroy () {
            this.container && this.container.destroy();
        };

        /**
         * Show progress bar
         */
        ProgressBar.prototype.show = function show () {
            this.container = this.getPopupService().create(this.id, {
                attrs : {
                    'class': 'modal e-progress-bar-modal'
                }
            }, this.context, template);
            this.container.show();
        };

        /**
         * Get id of progress bar
         * @return {string|*}
         */
        ProgressBar.prototype.getId = function getId () {
            return this.id;
        };

        function ProgressBarFactory (PopupService, $injector) {
            var progressBarService;
            return {

                /**
                 *
                 * @param {String} description
                 * @param {Number} [max]
                 * @param {Number} [loaded]
                 *
                 * @return {ProgressBar}
                 */
                create : function create (description, max, loaded) {
                    progressBarService = progressBarService || $injector.get('ProgressBarService');
                    return new ProgressBar(PopupService, progressBarService, description, max, loaded);
                }
            }
        }

        return ProgressBarFactory;
    });