# Dependencies 

[`AngularJS`](https://angularjs.org/)
[`Lodash`](https://lodash.com)
[`jQuery`](https://jquery.com/)
[`RequireJS`](http://requirejs.org/)
[`FontAwesome`](https://fortawesome.github.io/Font-Awesome/)

#License

MIT

#Collection 
Partial implemetation of some interfaces from Java Collection

`app/common/collections/linked-list` LinkedList

`app/common/collections/hash-map` HashMap

`app/common/collections/properties` Properties

`app/common/collections/hash-set` HashSet

`app/common/collections/enumerator` Enumerator

`app/common/collections/iterator` Iterator

# Components
Usefull angular components, examples of usage and descriptions you may find in js files

`app/common/components/menu` Context menu, service + directive. Menu items support user's markup.

`app/common/components/popup` Modal, popup service + directive + factory, based on jQuery Modal, supports both styled modal dialog and unstyled popups. Also directive suppots parent controllers.

`app/common/components/progress-bar` Simple propgress bar in modal window

`app/common/components/suggestions-list` Suggestions dropdown with keyboard support. Suggestions items support user's markup.

`app/common/components/tabs-panel` Responsive tabs. Tabs that doesn't fit to screen showed in dropdown menu

`app/common/components/tree-view` Tree view, simple but powerfull, supports user's markup of items and user's expression for getting children

# Directives

`app/common/components/direcitves/linker-directive-facotry` Factory for link directives. Link directive make possible to get access to controller of some directive from parent directive controller, i.e. `<div dir1=""><div dir2="" linker="$link"></div></div>` in the case controller of dir2 will passed to $link function of controller dir1.

`app/common/components/direcitves/transclude-to` Directive perform transclude of hole element to another dom node. Supports jquiery selector syntax to find target node, multiple transcluding and parent controllers, in case if you make transclude simple node with child directives, that required some parent controller;

`app/common/components/direcitves/form/io-file` Simple directive for input[type=file] make access to file list from scope

`app/common/components/direcitves/form/is-dirty` Usefull in case, when you need to set default $dirty state for some ngModel

`app/common/components/direcitves/form/is-email` Email validator for ngModel

`app/common/components/direcitves/form/is-ident` The validator for ngModel, that value should be equal to value of another ngModel or some value from scope (i.e. password repeating)

# Services

`app/common/components/services/file-downloader` Service for files downloading without page reloading. Supports AJAX and iFrame.

# Filters

`app/common/components/filters/byte` Transform value of bytes to value of k,M,G-bytes

# Tools

`app/common/components/tools/url-builder` Building urls from parts, supports placeholders for parms/query and slash trim/add

# Utils 

`app/common/components/utils/object-utils` Some utils for work with objects: #inherit #isPromise #buildFromPath

`app/common/components/utils/string-utils` (deprecated) Partial implementation of Java StringUtils. Warn change prototype of String!

`table-utils` Utils usefull for event's delegation with <table>
