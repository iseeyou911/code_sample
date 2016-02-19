/**
 * Created by Timofey Novitskiy on 11.02.2015.
 */

define([
        'app/common/directives/form/is-ident.validator.directive',
        'app/common/directives/form/is-email.validator.directive',
        'app/common/directives/form/io-file.directive',
        'app/common/directives/transclude-to.directive',
        'app/common/directives/form/is-dirty.directive',
        'app/common/directives/mask/mask.module'
    ],
    function (IsIdentValidation, isEmail, ioFileDirective, TranscludeToDirective, isDirtyDirective) {
        angular.module('common.directives', [
                'common.directives.mask'
        ])
            .directive('isIdent', IsIdentValidation)
            .directive('ioFile', ioFileDirective)
            .directive(isEmail.$name, isEmail)
            .directive(isDirtyDirective.$name, isDirtyDirective)
            .directive(TranscludeToDirective.$name, TranscludeToDirective);
    });
