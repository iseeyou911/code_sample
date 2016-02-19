/**
 * Created by Timofey Novitskiy on 18.02.2016.
 */
define([
    'app/common/utils/table-utils'
], function (TableUtils) {
    describe("TableUtils", function () {
        var tableTmpl = '<table><tr><td>0.0</td><td>0.1</td></tr><tr><td>1.0</td><td><div>1.1</div></td></tr></table>',
            table;

        beforeEach(function(){
            table = $(tableTmpl);
            table.appendTo('body');
        });

        afterEach(function(){
            table.remove();
        });

        it('#getTdIndex', function (done) {
            var results = [1, 0, 0, 1];
            table.on('click', function(event){
                var index = TableUtils.getTdIndex(event);
                expect(index).to.be.eq(results.shift());
                results.length === 0 && done();
            });

            $('tr:eq(0) td:eq(1)', table).click();
            $('tr:eq(1) td:eq(0)', table).click();
            $('tr:eq(0) td:eq(0)', table).click();
            $('tr:eq(1) td:eq(1) div', table).click();
            return done;
        });

        it('#getRowIndex', function (done) {
            var results = [0, 1];
            table.on('click', function(event){
                var index = TableUtils.getRowIndex(event);
                expect(index).to.be.eq(results.shift());
                done();
            });

            $('tr:eq(0) td:eq(1)', table).click();
            $('tr:eq(1) td:eq(1)', table).click();

            return done;
        });
    });
});