/**
 * Created by Timofey Novitskiy on 20.03.2015.
 */
define(function () {
    EventDispatcher.id = 0;

    function EventDispatcher () {
        var
        /**
         * слушатели событий
         * @type {HashMap<String, {}>}
         */
        eventListeners = {},
        eventsOrder = {};

        this.getEventsOrder = function getEventsOrder(){
            return eventsOrder;
        };
        
        this.getEventListeners = function getEventListeners() {
            return eventListeners;
        };

        this.setEventsOrder = function setEventsOrder(_eventsOrder){
            eventsOrder = _eventsOrder;
        };

        this.setEventListeners = function setEventListeners(_eventListeners) {
            eventListeners = _eventListeners;
        };
    }

    EventDispatcher.prototype.copyEventListenersTo = function copyEventListenersTo (dest) {
        angular.forEach(this.getEventsOrder(), function (value, eventName) {
            value.forEach(function(id){
                dest.addEventListener(eventName, this.getEventListeners()[id]);
            }, this);
        }, this);
    };

    /**
     * Добавить слушателя события
     *
     * @param eventName имя события
     * @param {EventListener|Function} listener  слушатель
     */
    EventDispatcher.prototype.addEventListener = function addEventListener(eventName, listener) {
        var listeners = this.getEventListeners(),
            order = this.getEventsOrder()[eventName],
            id = EventDispatcher.id++,
            self = this;

        if (!order) {
            order = this.getEventsOrder()[eventName] = [];
        }

        order.push(id);
        listeners[id] = listener;
        return {
            id : id,
            remove : function () {
                self.removeEventListener(eventName, id);
            }
        };
    };

    /**
     * Добавить слушателя события
     *
     * @param eventName имя события
     * @param {EventListener|Function} listener  слушатель
     */
    EventDispatcher.prototype.removeAllEventListener = function removeAllEventListener() {
        this.setEventListeners({});
        this.setEventsOrder({});
    };

    /**
     * Удаляет слушателя события
     *
     * @param eventName имя события
     * @param {Number} id  слушатель
     */
    EventDispatcher.prototype.removeEventListener = function removeEventListener(/*String*/ eventName, id) {
        var listeners = this.getEventListeners(),
            order = this.getEventsOrder()[eventName],
            indexOfId;

        if (!order) {
            return;
        }

        indexOfId = order.indexOf(id);
        indexOfId !== -1 && order.splice(indexOfId, 1);
        delete listeners[id];
    };

    /**
     * Получить слушателей события
     *
     * @param eventName имя события
     * @return список слушателей
     */
    EventDispatcher.prototype.getListeners = function getListeners(/*String*/ eventName) {
        var listeners = this.getEventListeners();

        return (this.getEventsOrder()[eventName] || []).map(function(eventId){
            return listeners[eventId];
        }, this);
    };

    EventDispatcher.prototype.hasListeners = function hasListeners(/*String*/ eventName) {
        var events = this.getEventsOrder()[eventName];
        return events && events.length > 0;
    };

    /**
     * Запустить слушателей события
     *
     * @param {String} eventName имя события
     * @param {UniData|Event} in входные параметры
     * @param {HashMap} properties
     * @return {UniData} полученный результат
     */
    EventDispatcher.prototype.invokeEvent = function invokeEvent(/*String*/ eventName, /*UniData*/ _in, /*HashMap*/ properties) {
        var listeners = this.getListeners(eventName),
            params = Array.prototype.slice.call(arguments, 1);
        if (listeners != null) {
            listeners.forEach(function (listener) {
                if (angular.isFunction(listener)) {
                    _in = listener.apply(listener, params);
                } else {
                    _in = listener.invoke(_in, properties);
                }
            });
        }
        return _in;
    };


    return EventDispatcher;
});