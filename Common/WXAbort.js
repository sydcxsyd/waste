window.G_WX = {
    headUrl : "",
    userName : "",
    setWXData (url,userName){
        this.headUrl = url;
        this.userName = userName;
    },

    createWXUserInfoBtnByNode (node,authorizeCallback){
        //绘制userinfobutton  这部分走不走无所谓 其实就是服务器能不能获取到当前玩家的微信信息
        let btnSize = cc.size(node.width + 10, node.height + 10);
        let frameSize = cc.view.getFrameSize();
        console.log("frameSize: ", frameSize);
        let winSize = cc.director.getWinSize();
        console.log("winSize: ", winSize);
        // 适配不同机型来创建微信授权按钮
        let left = (winSize.width * 0.5 + node.x - btnSize.width * 0.5) / winSize.width * frameSize.width;
        console.log("left: ", left);
        let top = (winSize.height * 0.5 - node.y - btnSize.height * 0.5) / winSize.height * frameSize.height;
        console.log("top: ", top);
        let width = btnSize.width / winSize.width * frameSize.width;
        console.log("width: ", width);
        let height = btnSize.height / winSize.height * frameSize.height;
        console.log("height: ", height);
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                left: left,
                top: top,
                width: width,
                height: height,
                lineHeight: 0,
                backgroundColor: 'FFFFFFF',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        })

        //button点击事件
        button.onTap((res) => {
            console.log("点击用户授权button");
            // button.show();
            console.log("button.onTap", res);
            //用户是否同意授权   userinfo是否为空
            if (res.userInfo != null) {
                G_WX.setWXData(res.userInfo.avatarUrl,res.userInfo.nickName);

                if(authorizeCallback){
                    authorizeCallback();
                }
                button.destroy();
            } else {//用户没同意授权
                console.log("授权失败");
            }

        });
    },

    getWXHeadSpriteFrame (){
        if (!CC_WECHATGAME) {
            return;
        }
        let headUrl = G_WX.headUrl;
        try {
            let image = wx.createImage();
            image.onload = () => {
                try {
                    let texture = new cc.Texture2D();
                    texture.initWithElement(image);
                    texture.handleLoadedTexture();
                    return new cc.SpriteFrame(texture);
                } catch (e) {
                    cc.log(e);
                    return null;
                }
            };
            image.src = headUrl;
        } catch (e) {
            cc.log(e);
            return null;
        }
    },

    getWXNowDate (){
        if(CC_WECHATGAME){
            return new Date(wx.Performance.now());
        }else{
            return Date.now();
        }
    },

    shareToWx (callBack,imageUrl,title,query) {
        if(!title){
            title = "快来一起玩"
        }
        if(!query){
            query = "";
        }
        let wxShare_isSuccess = true;
        let wxShare_isShared = true;

        wx.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: query,
            cancel : function(){
                console.log("share shareAppMessage ")
                wxShare_isSuccess = false;
            }.bind(this)
        });

        wx.onShow(function(res){
            console.log("on show");
            setTimeout(function(){
                if(wxShare_isShared){
                    wxShare_isShared = false;
                    callBack(wxShare_isSuccess);
                }
            },100);
        });
        console.log("wxShare");
    },

    showVideo (){

    },

};