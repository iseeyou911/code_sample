/**
 * Created by Timofey Novitskiy on 02.11.2015.
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