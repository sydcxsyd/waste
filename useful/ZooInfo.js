var GameConfig = require("./data/GameConfig")
var userData = require("./data/userData")
cc.Class({
    extends: cc.Component,

    properties: {
        animalNode: cc.Node, // 动物父节点
        animalPrefab: cc.Prefab,// 动物prefab
        animalSpriteAtlas: cc.SpriteAtlas,

        titleLabel: cc.Label,          //标题
        progressBar: cc.ProgressBar,
        progressLabel: cc.Label,

        pruduceInfoLabel: cc.Label, // 产出金币文本
        groundNode:cc.Node,

        houseLvLabel: cc.Label,    //场馆等级：LV1
        coinSpeedLabel: cc.Label,  //场馆赚钱速度：233金币/秒
        aniNumLabel: cc.Label,     //动物总量：233
        houseLVAddLabel: cc.Label, //场馆等级加成：400%
        feederNumLabel: cc.Label,  //饲养员数量：400
        feederAddLabel: cc.Label,  //饲养员加成：400%

        ruleNode : cc.Node,

        helpUserSpr:[cc.Sprite],
        addHelperBtn:[cc.Button],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //GameData.initData();
        
    },

    start () {

    },

    onClickClose: function(){
        this.node.destroy();
    },

    onClickCheckDetail: function(){
        this.ruleNode.active = true;
    },

    onClickAddFeeder: function(){
        var self = this;
        if (CC_WECHATGAME) {
            var mydate1 = new Date();
            self.shareBeforeTime = Date.parse(mydate1);

            var curData = new Date();
            var time = Math.floor(curData.getTime()); 

           var imageUrl = "https://img.mtxyx.com/joyzoo/sharepic/shareImg01.png?" + time;

            wx.shareAppMessage({
                title: "原来大家都在玩这个呀!",
                //imageUrl: "https://img.mtxyx.com/joyzoo/sharepic/shareImg01.png?",
                imageUrl: imageUrl,
                query: "inviteId=" + userData.info.userId + "_" + this.zooIdx + "_" + this.groundIdx,
            });
            //  全局的监听 onshow
            wx.onShow(function(res){
                if (self.shareBeforeTime) {
                    var mydate = new Date();
                    self.shareAfterTime = Date.parse(mydate);
                    console.log("刚点分享==",self.shareAfterTime,typeof(self.shareAfterTime));
                }
                console.log("分享到回到游戏时间差====", self.shareAfterTime - self.shareBeforeTime);
                //当天第一次分享
                // if (cc.sys.localStorage.getItem(cc.tools.GameConfig.Reward.SHARE_TIME) == 0) {
                //     cc.sys.localStorage.setItem(cc.tools.GameConfig.Reward.SHARE_TIME, 1);
                //     if (self.shareAfterTime - self.shareBeforeTime >= 2500) {
                //         if (self.shareBeforeTime>0) {
                //             //self.objManager.getGoldCoinFunc();
                //             console.log("当日第一次分享");
                //             self.shareBeforeTime = 0;
                //             self.shareAfterTime = 0;
                //             self.objManager = null;
                //         }
                //     }
                //     //当天第二次分享
                // } else {
                //     if (self.shareAfterTime - self.shareBeforeTime >= 4000) {
                //         console.log("diercialdsaljsfdp=",self.shareBeforeTime)
                //         if (self.shareBeforeTime>0) {
                //             console.log("当日第二次分享");
                //             //self.objManager.getGoldCoinFunc();
                //             self.shareBeforeTime = 0;
                //             self.shareAfterTime = 0;
                //             self.objManager = null;
                //         }
                //     } else {
                //         if (self.shareBeforeTime>0) {
                //             //self.objManager.showShareTip();
                //             self.shareBeforeTime = 0;
                //             self.shareAfterTime = 0;
                //             self.objManager = null;

                //         }
                //     }
                // }
                
            });
        }      

    },


    // getShareImages: function(){
    //     this.shareImageInfo = [];
    //     this.fdsoaugjsidof = "fafwerwasfd"
    //     this.fasgsaftwe = [];
    //     this.gwetgsdf = {}
    //     for(let i = 0; i < 1; i++){
    //         var successCb = function(resp){
    //             var info = JSON.parse(JSON.stringify(resp));
    //             if(info && info.data){  
    //                 Game.shareImageInfo[i] = [];
    //                 Game.shareImageInfo[i].title = info.data.res.des;
    //                 var remoteUrl = info.data.res.url;
    //                 console.log("remoteUrl: ", remoteUrl);
    //                 wx.downloadFile({
    //                     url: remoteUrl,
    //                     success: function(res){
    //                         Game.shareImageInfo[i].imageUrl = res.tempFilePath;
    //                         console.log("downLoadSuccess", res.tempFilePath, i, Game.shareImageInfo);
    //                         Game.shareImageInfo.push({
    //                             title: info.data.res.des,
    //                             imageUrl: res.tempFilePath
    //                         });
    //                     }
    //                 });
    //             }
    //         }
    //         var failCb = function(resp){
    //             console.log("getShareImgInfoFail");
    //         }
    //         var cfgObj = {
    //             url:'https://center.mtxyx.com/gamebox/conf/getSharePicInfo?appCode=' + GameConfig.gameName + '&position=' + '0',
    //         }
    //         Utils.httpGet(cfgObj, successCb, failCb);
    //     }
    // },


    setZooIdx: function(zooIdx, groundIdx, HelpUserArr){
        this.zooIdx = zooIdx;
        this.groundIdx = this.ground.groundIdx;

        // this.curAnimalArrCfg = GameData.getAnimalArrCfg(this.groundIdx);
        // this.curGroundData = GameData.getCurHouseData(this.groundIdx);
        // this.curGroundCfg = GameData.getCurHouseCfg(this.groundIdx);
        // console.log("this.curGroundData", this.curGroundData);

        this.curAnimalArrCfg = GameConfig.getAnimalArrCfg(this.ground.groundIdx);
        this.curGroundData = this.ground.curGroundData;
        this.curGroundCfg = this.ground.curGroundCfg;
        this.titleLabel.string = this.curGroundCfg.name + "馆";


        this.showAnimal();

        this.initDetail();

        this.initHelpList(HelpUserArr);
        
    },

    initHelpList:function( HelpUserArr ){

        //console.log( JSON.stringfy(HelpUserArr));
        if(HelpUserArr == null){
            console.log("HelpUserArr is null");
            return;
        }

        this.feederNumLabel.string = "饲养员数量："+ HelpUserArr.length; 
        this.feederAddLabel.string = "饲养员加成："+ HelpUserArr.length * 10 + "%"; 
        for(var i = 0;  i< HelpUserArr.length; i++)
        {
            this.createImage( HelpUserArr[i].icon, i);
        }

    },


    createImage(avatarUrl, i) {
        if (!CC_WECHATGAME) {
            return;
        }

        if (CC_WECHATGAME) {          
            try {
                let image = wx.createImage();
                image.onload = () => {
                    try {
                        let texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        this.helpUserSpr[i].spriteFrame = new cc.SpriteFrame(texture);
                        this.helpUserSpr[i].node.active = true;
                        this.addHelperBtn[i].node.active = false;
                    } catch (e) {
                        cc.log(e);
                        this.helpUserSpr[i].node.active = true;
                        this.helpUserSpr[i].node.active = false;
                    }
                };
                image.src = avatarUrl;
            } catch (e) {
                cc.log(e);
                this.helpUserSpr[i].node.active = true;
                this.helpUserSpr[i].node.active = false;
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, (err, texture) => {
                this.helpUserSpr[i].spriteFrame = new cc.SpriteFrame(texture);
                this.helpUserSpr[i].node.active = true;
                this.addHelperBtn[i].node.active = false;

            });
        }
    },


    initDetail:function(){
        this.houseLvLabel.string = "场馆等级：" + "LV" + this.ground.curGroundData.level;
        this.setProduct();
        this.feederNumLabel.string = "饲养员数量： 1" 
        this.feederAddLabel.string = "饲养员加成：400%"
    },

    showAnimal: function(){

        var count = 0;
        
        // for(var i = 0; i < 5; i ++){
        //     var animal = cc.instantiate(this.animalPrefab);
        //     this.animalNode.addChild(animal);

        //     var animalScript = animal.getComponent("Animal");
        //     animalScript.setCount(this.curGroundData.animalCount[i]);
        //     animalScript.setAnimalSprite(this.curAnimalArrCfg[i].id);

        //     animal.x = -400 + i * 200;
        //     count = animalScript.getCount() > 0 ? count + 1: count
        // }

        this.animalNode.removeAllChildren();
        this.animalTbl = []

        var animalCountTbl = this.curGroundData.animalCount;

        if(this.curGroundData.level <= 0){
            return;
        }
        for(var i = 0; i < animalCountTbl.length; i ++){
            if(Number(animalCountTbl[i]) > 0){
                var animal = cc.instantiate(this.animalPrefab);
                var animalScript = animal.getComponent("Animal");
                animalScript.game = this.game;

                animalScript.setAnimalSprite(this.curAnimalArrCfg[i].id, this.curAnimalArrCfg[i].level, animalCountTbl[i]);
                animalScript.moveAction();
                
                //animal.scale = 0.8;

                var randomX = (Math.random() * this.groundNode.width) - (this.groundNode.width / 2);
                var y = Math.random() * ((- this.groundNode.height / this.groundNode.width) * Math.abs(randomX) + this.groundNode.height / 2)
                var randomY = (Math.random() > 0.5 ? 1 : -1) * y;

                var randomPos = cc.v2(randomX, randomY)
                animal.position = randomPos;
                this.animalNode.addChild(animal);

                animal.id = this.curAnimalArrCfg[i].id;

                this.animalTbl.push(animal)
            }

        }


        this.progressBar.progress = count / 5;
        this.progressLabel.string = count + "/5";
    },

    // 生成每分钟产出
    setProduct: function(){
        var addtion = Number(this.curGroundCfg.addtion);
        var totalProduct = 0;
        var totalAnimalCount = 0;
        for(var idx in this.curAnimalArrCfg){
            if(Number(this.curGroundData.animalCount[idx]) > 0){
                var animalCount = Math.min(99, Number(this.curGroundData.animalCount[idx]))
                totalAnimalCount += animalCount;
                totalProduct += animalCount * Number(this.curAnimalArrCfg[idx].earngold);
            }
        }

        var friNum = userData.getFriendNum( String(this.zooIdx), String(this.curGroundData.houseBaseId));
        console.log(" zooInx：", this.zooInx);
        console.log(" houseBaseId：", this.curGroundData.houseBaseId);

        var friAdd = friNum * 0.1;      
        console.log(" 原始速度: " + totalProduct );
        console.log(" 好友加成: " + friAdd );
        var productPerSec = totalProduct *(1 + addtion + friAdd);
        productPerSec = Math.floor(productPerSec * 100) / 100; 
        this.pruduceInfoLabel.string = Math.floor(productPerSec);
        this.coinSpeedLabel.string = "场馆赚钱速度：" + productPerSec +"金币/s"
        this.aniNumLabel.string = "动物总量：" + totalAnimalCount;
        this.houseLVAddLabel.string = "场馆等级加成：" + addtion * 100 + "%";
    },

    // 动物随机坐标移动
    animalMove: function(animal){
        if(animal.dontMove){
            return
        }
        if( !animal.moveCD || animal.moveCD == 0){
            return
        }

        var destX = (Math.random() * this.groundNode.width) - (this.groundNode.width / 2);
        var y = Math.random() * ((- this.groundNode.height / this.groundNode.width) * Math.abs(destX) + this.groundNode.height / 2)
        var destY = (Math.random() > 0.5 ? 1 : -1) * y;
        var animalScript = animal.getComponent("Animal");
        //aniSpriNode = animalScript.animalSprite.node;
        animal.runAction(cc.sequence(
            cc.delayTime(animal.moveCD),
            cc.callFunc(function(){
                let NumNode = animal.getChildByName("NumNode");
                if(destX < animal.x){
                    animal.scaleX = - Math.abs(animal.scaleX);
                    NumNode.scaleX = - Math.abs(NumNode.scaleX);
                }else{
                    animal.scaleX = Math.abs(animal.scaleX);
                    NumNode.scaleX = Math.abs(NumNode.scaleX);
                }
            }),
            cc.moveTo(2, cc.v2(destX, destY)),
            cc.callFunc(function(sender){
                sender.moveCD = 0;
            })
        ))
    },

    update (dt) {

          // 小动物移动
          if(this.animalTbl && this.animalTbl.length > 0){
            this.animalYPos = []
            for ( var i = 0 ; i < this.animalTbl.length; i ++){
                var animal = this.animalTbl[i];

                if( !animal.moveCD || animal.moveCD == 0){// 没有移动或者已经移动过的动物，随机下一次移动CD
                    animal.moveCD = Math.random() * 10;

                    this.animalMove(animal);
                    //this.animalMove(animalScript.animalSprite);
                }

                this.animalYPos.push(animal.y)
                // 处理小动物层级
                
            }

            var result = this.animalTbl.sort(function(a, b){
                return b.y - a.y
            })

            for (var i = 0; i < this.animalTbl.length; i ++){
                this.animalTbl[i].zIndex = i + 1;
            }
        }      
    },

    onClickRuleBg : function(){
        this.ruleNode.active = false;
    },

});
