/**
 * Created by shipeifei on 16/7/5.
 */
var apiKey = "IloveKEjian",
    token = "",
    platform = 1, //平台 1:pc 2:cms 3:mobile 4:android 5:ios
    version = "1.0.0"; //版本号


function httpRequestService() {

}

httpRequestService.prototype.get = function(url, parames, successCallback, failCallback, dataType, cache) {
    if (typeof successCallback === "undefined") {
        return;
    }
    if (typeof failCallback === "undefined") {
        return;
    }
    var parames = parames || {};
    parames.platform = platform;
    parames.apiKey = apiKey;
    parames.version = version;
    dataType = dataType || 'json';
    cache = cache || false;
    $.ajax({
        type: 'GET',
        url: url,
        data: parames,
        dataType: dataType,
        beforeSend: function() {},
        success: function(data) {
            successCallback.call(null, data);

        },
        error: function(error) {
            failCallback.call(null, error);

        }
    });
};

httpRequestService.prototype.post = function(url, parames, successCallback, failCallback, dataType, cache) {

    if (typeof successCallback === "undefined") {
        return;
    }
    if (typeof failCallback === "undefined") {
        return;
    }
    var parames = parames || {};
    parames.platform = platform;
    parames.apiKey = apiKey;
    parames.version = version;
    dataType = dataType || 'json';
    cache = cache || false;
    $.ajax({
        type: 'POST',
        url: url,
        data: parames,
        dataType: dataType,
        beforeSend: function() {},
        success: function(data) {
            successCallback.call(null, data);

        },
        error: function(error) {
            failCallback.call(null, error);

        }

    });
};
module.exports = httpRequestService;