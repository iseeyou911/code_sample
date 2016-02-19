/**
 * Created by Timofey Novitskiy on 02.11.2015.
 */
define([
    'app/common/components/progress-bar/progress-bar.service',
    'app/common/components/progress-bar/progress-bar.directive',
    'app/common/components/progress-bar/progress-bar.factory'
],function (ProgressBarService, ProgressBarDirective, ProgressBarFactory) {
    angular.module('common.components.progress-bar', [])
        .service(ProgressBarService.$name, ProgressBarService)
        .service(ProgressBarFactory.$name, ProgressBarFactory)
        .directive(ProgressBarDirective.$name, ProgressBarDirective);
});