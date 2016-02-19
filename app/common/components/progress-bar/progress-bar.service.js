/**
 * Created by Timofey Novitskiy on 02.11.2015.
 *
 * @name ProgressBarService
 *
 * @description
 * Сервис для создания и управления прогресс барами
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
         * @param {Number} loaded
         *
         * @return {ProgressBar}
         */
        ProgressBarService.prototype.init = function init (description, max, loaded) {
            var progressBar = this.getProgressBarFactory().create(description, max, loaded);
            this.progressBars[progressBar.id] = progressBar;
            return progressBar;
        };

        /**
         *
         * @see ProgressBarService.init
         *
         * Init method alias
         *
         * @param {String} description
         * @param {Number} max
         * @param {Number} loaded
         *
         * @return {ProgressBar}
         */
        ProgressBarService.prototype.create = function create (description, max, loaded) {
            return this.init(description, max, loaded);
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
         * Close and destroy progress bar window
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