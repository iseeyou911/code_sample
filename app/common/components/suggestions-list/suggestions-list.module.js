/**
 * Created by Timofey Novitskiy on 30.04.2015.
 */
define([
    'app/common/components/suggestions-list/suggestions-list.directive',
    'app/common/components/suggestions-list/suggestion-item.directive'
],function (SuggestionsListDirective, SuggestionItemDirective) {
    angular.module('common.components.suggestions-list', [])
        .directive(SuggestionsListDirective.$name, SuggestionsListDirective)
        .directive(SuggestionItemDirective.$name, SuggestionItemDirective);
});