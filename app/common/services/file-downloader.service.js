/**
 * Created by Timofey Novitskiy on 26.10.2015.
 */
define([],
    function () {
        var idGen = 0;
        FileDownloaderService.$inject = ['$rootScope', '$document', '$q', '$interval', '$http'];
        FileDownloaderService.$name = 'FileDownloader';
        /**
         *
         */
        function FileDownloaderService($rootScope, $document, $q, $interval, $http) {
            this.getDocument = function () {
                return $document[0];
            };
            this.getRootScope = function () {
                return $rootScope;
            };

            this.getQ = function () {
                return $q;
            };

            this.getInterval = function () {
                return $interval;
            };

            this.getHttp = function () {
                return $http.apply($http, arguments);
            }
        }

        FileDownloaderService.prototype.getFile = function getFile(httpConfig, data) {
            httpConfig.params = data;
            return this.getHttp(httpConfig);
        };

        FileDownloaderService.prototype.download = function download(httpConfig, data, errback) {
            var form, body, iframe,
                action = httpConfig.url,
                method = httpConfig.method,
                dfd = this.getQ().defer(),
                document = this
                    .getDocument();

            this.iframe && $(this.iframe).remove();

            this.iframe = iframe = document
                .body
                .appendChild(document.createElement('iframe'));
            document = iframe.contentWindow.document;
            iframe.name = 'downloader_' + (idGen++) + '_' + data.elementId + '_' + data.code;

            if (!document.body) {
                body = document.appendChild(document.createElement('body'));
            } else {
                body = document.body;
            }
            form = body
                .appendChild(document.createElement('form'));

            $(iframe).addClass('ng-hide');

            form.method = method;
            form.action = action;
            form.target = '_self';

            angular.forEach(data, function (value, key) {
                var
                    input = form.appendChild(document.createElement('input'));

                input.type = 'text';
                input.value = value;
                input.name = key;
            });

            form.submit();

            dfd.resolve();

            iframe.onload = function () {
                errback && errback();
                iframe.onload = null;
                //console.error('File downloading error');
            };
            return dfd.promise;
        };

        return FileDownloaderService;
    });