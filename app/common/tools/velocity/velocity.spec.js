/**
 * Created by god on 28.04.2015.
 */
define([
    'app/common/tools/velocity/velocity'
], function (Velocity) {
    describe("parser test", function () {
        // individual tests go here
        it('Velocity parser test', function() {
            var inst = new Velocity();
            inst.parse('test ${var1}, $var2, #asd asd- - $-var3');

        });
    });
});