/**
 * Created by Timofey Novitskiy on 30.10.2015.
 */
define(['sprintf'],
    function (sprintf) {
        ByteFilter.$inject = [];
        ByteFilter.$name = 'eByte';
        /**
         *
         */
        function ByteFilter() {
            return function ByteFilter (bytes, si) {
                var pre, exp, unit = si ? 1000 : 1024;

                if (bytes == null) {
                    return '0 B';
                }

                if (bytes < unit) {
                    return bytes + " B";
                }

                exp = Math.floor(Math.log(bytes) / Math.log(unit));
                pre = (si ? "kMGTPE" : "KMGTPE").charAt(exp-1) + (si ? "" : "i");
                return sprintf("%.1f %sB", bytes / Math.pow(unit, exp), pre);
            }

        }

        return ByteFilter;
    });