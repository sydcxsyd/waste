window.G_Common = {
    log (info,...more){
        this._log(info);
        if(more){
            for(let i in more){
                this._log(more[i]);
            }
        }
    },

    _log (info){
        if(typeof(info) == "object" || typeof(info) == "object"){
            cc.log(JSON.stringify(info));
        }else{
            cc.log(info);
        }
    },

    shareToWx (callBack,title,imageUrl) {
        if(!CC_WECHATGAME){
            return;
        }
        console.log("shareToWx");
        if(!title){
            title = "test";
        }
        if(!imageUrl){
            imageUrl = "";
        }

        wx.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: "",
            cancel : function(){
                console.log("share cancel ")
            }
        });
        //  全局的监听 onshow
        wx.onShow(function(res) {
            callBack();
        });
    },
};