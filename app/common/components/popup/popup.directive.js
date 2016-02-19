/**
 * Created by Timofey Novitskiy on 13.03.2015.
 *
 * @name ePopup
 *
 * @description
 * Директива модального окна, по умолчанию предусмотрено два шаблона:
 * twitter bootstrap modal, поодерживает отображение заголовка и кнопки закрыть,
 * задание нужного размера с помощью параметра modalSize
 * Чистый шаблон
 *
 * Для открытия окна необходимо использовать сервис PopupService
 * @see PopupService
 *
 *
 * @param {@String} popup-id идентификатор попапа, должен быть уникальным,
 * если идентификатор не указан, то он будет сгенерирован авоматически
 * @param {=Object} e-popup контекст модального окна доступен в шаблоне как context
 * @param {@Boolean} is-modal если true, то будет использован
 * шаблон модального окна, основанный на twitter bootstrap,
 * иначе будет использован пустой шаблон
 * @param {@String} modal-size размер модального окна {modal-lg|modal-md|modal-sm}
 * @param {=String|Function} title заголовок модального окна
 * @param {&Expression} on-close колбек, вызывающийся при закрытии окна, нажатием на крестик
 * @param {&Expression} on-show колбек, вызывающийся при начале анимации открытия окна
 * @param {&Expression} on-shown колбек, вызывающийся после анимация открытия окна
 *
 * @example
 *
 * Пример использования
 `
 scope = {
    title: 'Title',
    context: {text: 'Test},
    controllers: {}
 }
 <div
 e-popup="context"
 popup-id="some-id"
 controllers="controllers"
 title="title"
 modal-size="modal-lg"
 is-modal="true">
    <div id="modal-content">{{context.text}}</div>
 </div>
 `
 *
 */

define([
        'text!./popup.tmpl.html',
        'text!./modal.tmpl.html',
        'app/common/components/popup/popup-consts',
        '_'
    ],
    function (template, modalTemplate, PopupConsts, _) {
        PopupDirective.$inject = ['$compile', 'PopupService'];
        PopupDirective.$name = 'ePopup';

        /**
         *
         */
        function PopupDirective($compile, PopupService) {
            return {
                transclude: true,
                controller: ['$scope', '$element', function ($scope, $element, $attrs) {
                    var id;

                    this.init = function init (_id) {
                        id = _id;
                    };

                    this.hide = function hide() {
                        $($element).modal('hide');
                    };

                    this.show = function show() {
                        $($element).modal('show');
                    };

                    this.toggle = function toggle() {
                        $($element).modal('toggle');
                    };

                    this.destroy = function destroy() {
                        $scope.$destroy();
                    };

                    this.getId = function getId() {
                        return id;
                    };

                    this.getElement = function getElement() {
                        return $element;
                    };
                }],
                scope: {
                    isModal: '@',
                    modalSize: '@',
                    context: '=ePopup',
                    title: '=',
                    controllers: '=',
                    onClose: '&',
                    onShow: '&',
                    onShown: '&',
                    popupId: '@'
                },
                controllerAs: 'popupController',
                require: 'ePopup',
                compile: function compile(cElement, cAttrs) {
                    var isModal = cAttrs.isModal === 'true',
                        linker = $compile(isModal ? modalTemplate : template);

                    return function link(scope, element, attrs, ePopupController, transclude) {
                        var jqElement = $(element[0]);
                        scope.popupId = scope.popupId || 'popup-auto-id-'+ _.uniqueId();

                        ePopupController.init(scope.popupId);
                        linker(scope, function (clone, scope) {
                            element.append(clone);
                            transclude(function (clone) {
                                element
                                    .find('[e-transclude]')
                                    .append(clone);
                            });
                        }, {
                            transcludeControllers: scope.controllers
                            && _.mapValues(scope.controllers(), function (instance) {
                                return {instance: instance};
                            })
                        });

                        element.addClass('e-popup');

                        scope.template = {
                            size: [attrs.modalSize || '']
                        };

                        scope.getTitle = typeof scope.title === 'function' ? scope.title : function () {
                            return scope.title;
                        };

                        jqElement.modal({
                            show: false
                        });

                        scope.$on('$destroy', function () {
                            jqElement.off('hidden.bs.modal');
                            jqElement.off('show.bs.modal');
                            jqElement.off('shown.bs.modal');
                            jqElement.modal('removeBackdrop');
                            jqElement.modal('hide');
                            element.remove();
                            PopupService._remove(ePopupController);
                        });

                        jqElement.on('hidden.bs.modal', function (e) {
                            scope.onClose({});
                        });

                        jqElement.on('shown.bs.modal', function (e) {
                            scope.onShown({});
                        });

                        jqElement.on('show.bs.modal', function (e) {
                            scope.onShow({});
                        });

                        PopupService._add(ePopupController);
                    };
                }
            }
        }

        return PopupDirective;
    });