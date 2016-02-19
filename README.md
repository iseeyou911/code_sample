# Dependencies
`angular`
`lodash`
`jquery`
`requireJS`

# Components

menu (Context menu service)
popup (Popups, modal service)
progress-bar (Popup progress bar service)
suggestions-list (Suggestions list directive)
tabs-panel (Responsive tabs directive)
tree-view (Tree view directive)

# Directives

`is-dirty` установка дефолтного значения $dirty
`linker-directive-factory` фабрика диркетив для связки связки дочерней директивы с родительской
`transclude-to` директивы для трасклюдинга элементов в другой узел DOM дерева, поддерживает множественное клонирование
`e-mail-validation` валидация емейлов для ngModel
`is-ident` валидация полей, значения которых должно быть равно значению другого поля (повторение пароля)
`io-file` директива для работы с input type="file", позволяет получить доступ к списку выбранных файлов в scope

# Collections (частичные реализации некоторых интерфейсов из Java Collections)

`linked-list` LinkedList
`hash-map` HashMap
`hash-set` HashSet
`properites` Properties
`iterator` Iterator
`enumerator` Enumnerator

# Filters

`byte` перевод значения из байтов в к,м,г-байты, поддерживает систему СИ

# Services

`file-downloader` сервис для скачивания файлов, поддерживает ajax загрузку и iframe 
