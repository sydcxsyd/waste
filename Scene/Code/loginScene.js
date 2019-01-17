
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    start () {
        if(CC_WECHATGAME){
            wx.login();
        }

    },

    onClickEnterGame (){
        cc.director.loadScene("mainScene");
    },

});
