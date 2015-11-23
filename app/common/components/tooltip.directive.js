/**
 * Created by Timofey Novitskiy on 12.02.2015.
 */

define([
    ],
    function () {
        ETooltip.$inject = ['$parse'];

        function ETooltip ($parse) {
            return {
                link : function link (scope, element, attrs, ngModel) {

                    scope.$watch(attrs.eTooltipIf, function(newValue, oldValue){
                        if (newValue || newValue === oldValue) {
                            $(element).tooltip({
                                html : true,
                                title : attrs.eTooltip,
                                trigger : attrs.eTooltipTrigger || 'focus',
                                placement : attrs.eTooltipPlacement || 'auto'
                            });
                            if (element.is(':focus')) {
                                $(element).tooltip('show');
                            }
                        } else {
                            $(element).tooltip('destroy');
                        }
                    });

                    scope.$on('$destroy', function(){
                        $(element).tooltip('destroy');
                    })
                }
            };
        }

        return ETooltip;
    });