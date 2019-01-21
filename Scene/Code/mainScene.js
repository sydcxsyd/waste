cc.Class({
    extends: cc.Component,

    properties: {
        pageNode : cc.Node,
        inputBox : cc.EditBox,
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame
    update: function (dt) {

    },

    onClickThrow (){
        let string = this.inputBox.string;
        let rewardDic = G_Fuc.getGotDic(string);
        G_Common.log(rewardDic);
    },

    onClickShare (){
        G_Common.shareToWx(function () {
            console.log("雅蠛蝶")
        })
    },
});
