/**
 * Created by god on 02.11.2015.
 */
define([],
    function () {
        var id = 0,
            template = '<div e-progress-bar="context"></div>';

        ProgressBarFactory.$inject = ['PopupService', '$injector'];
        ProgressBarFactory.$name = 'progressBarFactory';

        /**
         * @param {PopupService} PopupService
         * @param {ProgressBarService} ProgressBarService
         * @param {String} description
         * @param {Number} [max]
         * @constructor
         */
        function ProgressBar(PopupService, ProgressBarService, description, max) {
            this.id = 'progress-bar-' + (id++);
            this.context = {
                max : max || 100,
                description : description
            };

            this.getPopupService = function getPopupService () {
                return PopupService;
            };

            this.getProgressBarService = function getProgressBarService () {
                return ProgressBarService;
            };
        }

        ProgressBar.prototype.close = function close () {
            this.getProgressBarService().close(this.getId());
        };

        ProgressBar.prototype.destroy = function destroy () {
            this.container && this.container.destroy();
        };

        ProgressBar.prototype.show = function show () {
            this.container = this.getPopupService().create(this.id, {
                attrs : {
                    'class': 'modal e-progress-bar-modal'
                }
            }, this.context, template);
            this.container.show();
        };

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
                 * @returns {ProgressBar}
                 */
                create : function create (description, max) {
                    progressBarService = progressBarService || $injector.get('ProgressBarService');
                    return new ProgressBar(PopupService, progressBarService, description, max);
                }
            }
        }

        return ProgressBarFactory;
    });