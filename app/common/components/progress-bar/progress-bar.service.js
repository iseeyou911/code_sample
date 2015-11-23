/**
 * Created by Timofey Novitskiy on 02.11.2015.
 */
define([],
    function () {
        ProgressBarService.$inject = ['progressBarFactory'];
        ProgressBarService.$name = 'ProgressBarService';
        /**
         *
         */
        function ProgressBarService(progressBarFactory) {
            this.progressBars = {};

            this.getProgressBarFactory = function getProgressBarFactory () {
                return progressBarFactory;
            };
        }

        /**
         *
         * Initialization of new ProgressBar
         *
         * @param {String} description
         * @param {Number} max
         */
        ProgressBarService.prototype.init = function init (description, max) {
            var progressBar = this.getProgressBarFactory().create(description, max);
            this.progressBars[progressBar.id] = progressBar;
            return progressBar;
        };

        /**
         *
         * Show progress bar window
         *
         * @param {String|Number} progressBarId
         */
        ProgressBarService.prototype.show = function show (progressBarId) {
            var progressBar = this.progressBars[progressBarId];
            progressBar && progressBar.show();
        };

        /**
         *
         * Close progress bar window
         *
         * @param {String|Number} progressBarId
         */
        ProgressBarService.prototype.close = function close (progressBarId) {
            var progressBar = this.progressBars[progressBarId];
            progressBar && progressBar.destroy();
            delete this.progressBars[progressBarId];
        };
        return ProgressBarService;
    });