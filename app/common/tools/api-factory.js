/**
 * Created by Timofey Novitskiy on 02.02.2016.
 */

define([
    'app/common/tools/url-builder',
    'app/common/marshallers/marshaller-utils',
    'stomp',
    'sockjs',
    '_'
], function (urlBuilder, MarshallerUtils, Stomp, SockJS, _) {
    APIFactory.$inject = ['$http', '$upload', '$q', 'FileDownloader'];
    APIFactory.$name = 'APIFactory';

    function APIFactory($http, $upload, $q, FileDownloader) {
        return function get(base, api, serviceObject) {
            _.forEach(api, function (path, service) {
                /**
                 *
                 * @param {Object} request
                 * @param fileOrErrback file to send, or errback for filedownloding with iframe
                 * @returns {Promise}
                 */
                serviceObject[service] = function APIExecutor(request, fileOrErrback) {
                    var conf = api[service],
                        headers = {},
                        sse, webSocket, dfd, url, method, stompService, contentType;
                    if (_.isString(conf)) {
                        url = conf;
                        method = 'post';
                        contentType = 'application/json';
                    } else {
                        url = conf.url;
                        method = (conf.method || 'post').toLocaleLowerCase();
                        contentType = conf.type;
                    }

                    if (conf.isWebSocket) {
                        dfd = $q.defer();
                        webSocket = new SockJS(urlBuilder('http://' + location.host, url));
                        stompService = Stomp.over(webSocket);
                        stompService.debug = null;
                        stompService.connect({
                            user: request.connectionId
                        }, function (frame) {
                            dfd.resolve(stompService);
                        }, function (error) {
                            fileOrErrback(error);
                        });
                        dfd.promise.$service = stompService;
                        return dfd.promise;
                    }

                    if (conf.isSse) {
                        dfd = $q.defer();
                        sse = new EventSource(urlBuilder(base, url));
                        sse.addEventListener('ping', function (event) {
                            dfd.notify(event);
                        });

                        sse.addEventListener('message', function (event) {
                            var data = angular.fromJson(event.data),
                                response = {
                                    sessionId: data.sessionId,
                                    event: MarshallerUtils.unidata.deserialize(data.event)
                                };
                            dfd.notify(response);
                        });

                        sse.addEventListener('close', function (event) {
                            dfd.notify(event);
                        });

                        sse.onerror = function (error) {
                            console.log(error);
                        };

                        return dfd.promise;
                    }

                    if (conf.downloading) {
                        conf = _.clone(conf);
                        conf.url = urlBuilder(base, url);

                        if (conf.downloading === 'ajax') {
                            return FileDownloader.getFile(
                                conf,
                                request
                            );
                        } else {
                            return FileDownloader.download(
                                conf,
                                request,
                                fileOrErrback
                            );
                        }
                    }

                    if (conf.uploading) {
                        return $upload.upload({
                            url: urlBuilder(base, url),
                            fields: request,
                            file: fileOrErrback,
                            sendObjectsAsJsonBlob: true
                        }).then(function (response) {
                            return response.data;
                        });
                    }

                    headers['Content-Type'] = contentType;
                    if (conf.accept) {
                        headers['Accept'] = conf.accept;
                    }
                    return $http({
                        url: urlBuilder(base, url, undefined, request),
                        method: method,
                        headers: headers,
                        data: request
                    }).
                    then(function (response) {
                        return response.data;
                    });
                }
            });

        };
    }

    return APIFactory;
});