/**
 * Created by Timofey Novitskiy on 02.11.2015.
 *
 * @name eProgressBar
 *
 * @description
 *
 * Директива отображения прогресса
 *
 * @param {{{Number}max, {String}description, {Number} loaded}} eProgressBar контекст
 * если не указать loaded, то будет отображена заполненная анимированная полоска
 */
define([
        'text!./progress-bar.tmpl.html'
    ],
    function (template) {
        ProgressBarDirective.$inject = [];
        ProgressBarDirective.$name = 'eProgressBar';
        /**
         *
         */
        function ProgressBarDirective() {
            return {
                scope : {
                    context : '=' + ProgressBarDirective.$name
                },
                template: template,
                link: function link(scope, element, attrs, controllers, transclude) {
                }
            }
        }

        return ProgressBarDirective;
    });