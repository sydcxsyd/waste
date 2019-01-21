cc.Class({
    extends: cc.Component,

    properties: {
        pageNode : cc.Node,
        inputBox : cc.EditBox,

        gotPage : cc.Node,
        enterPage : cc.Node,
        historyPage : cc.Node,

        brilliantLabel : cc.Label,  //智商
        strongLabel : cc.Label,     //打架能力
        talkLabel : cc.Label,       //bb能力 骂娘能力 喷人能力
        speedLabel : cc.Label,      //逃跑速度
        bigLabel : cc.Label ,       //容量
        fightLabel : cc.Label ,       //容量
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

    onClickWriteBtn (){
        this.enterPage.active = true;
    },

    onClickHistoryBtn(){
        this.historyPage.active = true;
    },


});
