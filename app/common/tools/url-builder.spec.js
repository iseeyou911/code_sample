/**
 * Created by Timofey Novitskiy on 18.02.2016.
 */
define([
    'app/common/tools/url-builder'
], function (urlBuilder) {
    describe("urlBuilder", function () {
        it('create url', function () {
            var isAdmin = true,
                text = '&=%123dd',
                prefix = (baseUrl, url) => {return isAdmin ? 'admin' : ''};

            expect(urlBuilder('http://localhost/api', 'entry/remove/${id}', prefix, {id: 1}))
                .to.be.eq('http://localhost/api/admin/entry/remove/1');

            expect(urlBuilder('http://localhost/api/', '/entry/remove/${id}', null, {id: 1}))
                .to.be.eq('http://localhost/api/entry/remove/1');

            expect(urlBuilder('http://localhost/api/', '/search?text=${text}', null, {text}))
                .to.be.eq('http://localhost/api/search?text=' + encodeURIComponent(text));
        });
    });
});