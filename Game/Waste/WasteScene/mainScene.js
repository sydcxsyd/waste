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
        this.reloadData();
    },

    // called every frame
    update: function (dt) {

    },

    //===================================== enter page =====================================
    onClickWriteBtn (){
        this.enterPage.active = true;
    },

    onClickThrow (){
        let string = this.inputBox.string;
        let rewardDic = G_Fuc.getGotDic(string);
        this.enterPage.active = false;
        G_Common.log(rewardDic);
        this.showReward(rewardDic);
        for(var i in rewardDic){
            G_User.user[i] += rewardDic[i];
        }

        this.reloadData();
    },

    playThrowAction (){

    },

    //===================================== reward page =====================================
    showReward (rewardDic){

    },

    onClickShare (){
        G_WX.shareToWx(function () {
            console.log("雅蠛蝶")
        })
    },

    //===================================== history page =====================================
    onClickHistoryBtn(){
        this.historyPage.active = true;
    },

    //===================================== home page =====================================
    reloadData (){
        brilliantLabel.string = G_User.user.brilliant;
        strongLabel.string = G_User.user.strong;
        talkLabel.string = G_User.user.talk;
        speedLabel.string = G_User.user.speed;
        bigLabel.string = G_User.user.big;
        fightLabel.string = G_User.getFightNum();
    },

    reloadHead (){

    },
});
