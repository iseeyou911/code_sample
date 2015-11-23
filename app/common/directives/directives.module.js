/**
 * Created by Timofey Novitskiy on 11.02.2015.
 */

define([
        'app/common/directives/form/fields-ident-validation.directive',
        'app/common/directives/form/email-validation.directive',
        'app/common/directives/form/io-file.directive',
        'app/common/directives/transclude-to.directive',
        'app/common/directives/is-dirty.directive'
    ],
    function (IsIdentValidation, EmailValidation, ioFileDirective, TranscludeToDirective, isDirtyDirective) {
        angular.module('common.directives', [])
            .directive('isIdent', IsIdentValidation)
            .directive('ioFile', ioFileDirective)
            .directive('isEmail', EmailValidation)
            .directive(isDirtyDirective.$name, isDirtyDirective)
            .directive(TranscludeToDirective.$name, TranscludeToDirective);
    });
