/**
 * Created by Timofey Novitskiy on 17.12.2015.
 */

define([
        'app/common/directives/mask/mask',
        'app/common/directives/mask/mask-optional-service.factory',
        'app/common/directives/mask/mask-service.factory',
        'app/common/directives/mask/mask-util-service.factory'
    ],
    function (Mask, MaskOptionsServiceFactory, MaskServiceFactory, MaskUtilServiceFactory) {
        angular.module('common.directives.mask', [])
            .directive(Mask.$name, Mask)
            .factory(MaskOptionsServiceFactory.$name, MaskOptionsServiceFactory)
            .factory(MaskServiceFactory.$name, MaskServiceFactory)
            .factory(MaskUtilServiceFactory.$name, MaskUtilServiceFactory);
    });
