/**
 * Created by Timofey Novitskiy on 13.11.2015.
 */
define(function(){
    function TableUtils () {
    }

    /**
     *
     * Return td element from event
     *
     * @param event
     * @returns {Number}
     */
    TableUtils.prototype.getTd = function getTd(event) {
        var target = $(event.target);

        if (!target.is('td')) {
            target = target.parents('td');
        }

        return target;
    };

    /**
     *
     * Return index of td element from event
     *
     * @param event
     * @returns {Number}
     */
    TableUtils.prototype.getTdIndex = function getTdIndex(event) {
        var target = this.getTd(event);
        if (target) {
            return target.index();
        }
    };

    /**
     *
     * Return index of tr element from event
     *
     * @param event
     * @returns {Number}
     */
    TableUtils.prototype.getRowIndex = function getRowIndex(event) {
        var target = $(event.target);

        if (!target.is('tr')) {
            target = target.parents('tr');
        }

        return target && target.index();
    };

    TableUtils.prototype.getColIndex = function getColIndex(event) {
        var target = this.getTd(event);
        return target.data('colIndex');
    };
    return new TableUtils();
});