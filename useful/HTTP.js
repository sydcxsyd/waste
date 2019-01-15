//测试
// var URL =  "https://local.game.111mj.cn/snake/user";
// var LoginURL = "https://local.game.111mj.cn/snake/login";
var URL = "https://joyzoo.game.111mj.cn/joyzoo/user";
var LoginURL = "https://joyzoo.game.111mj.cn/joyzoo/login";
var HTTP = cc.Class({
    extends: cc.Component,

    statics: {
        inGameScene:false,
        LoginURL:LoginURL,
        sessionId: 0,
        userId: 0,
        master_url: URL,
        url: URL,
        sendRequest: function (path, data, handler, extraUrl) {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            var str = "?";
            for (var k in data) {
                if (str != "?") {
                    str += "&";
                }
                str += k + "=" + data[k];
            }
            if (extraUrl == null) {
                extraUrl = HTTP.url;
            }
            var requestURL = extraUrl + path + encodeURI(str);
            console.log("RequestURL:" + requestURL);
            xhr.open("POST", requestURL, true);
            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    try {
                        // cc.log("111111")
                        // cc.log(xhr.responseText)
                        var ret = xhr.responseText;
                        if (typeof (ret) == "string")
                            ret = JSON.parse(ret)
                        cc.log(ret)
                        if (handler !== null) {
                            handler(ret);
                        }                        /* code */
                    }
                    catch (e) {
                    }
                    finally {
                    }
                }
            };
            xhr.send();
            return xhr;
        },
    },
});


