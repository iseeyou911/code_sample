/**
 * Created by god on 13.11.2015.
 */
define(function(){
    function TableUtils () {
    }

    TableUtils.prototype.getTdIndex = function getTdIndex(event) {
        var target = $(event.target);

        if (!target.is('td')) {
            target = target.parents('td');
        }

        return target;
    };

    TableUtils.prototype.getColIndex = function getColIndex(event) {
        var target = this.getTdIndex(event);
        return target.data('colIndex');
    };
    return new TableUtils();
});