// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var gameConfig = require("GameConfig")
var userData = require("userData")
var http = require("HTTP")
cc.Class({
    extends: cc.Component,

    properties: {
        loadIngLabel: cc.Label,
        loadFinished:false,
        btn_Start: cc.Node,
        loadingBar : cc.ProgressBar,
        loadNode : cc.Node,
        toastPrefab :cc.Prefab,
        getAllInvitee:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.isInit = true;
        cc.director.preloadScene("StartScene",function(){
            this.startSceneIsLoaded = true;
            this._tryTurnToStartScene();
        }.bind(this));
        this.loadConfig();
        var self = this;
        gameConfig.loadConfig();
        this.loadNode.active = false;

        this.loadIngLabel.node.runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(0.5),
            cc.callFunc(function(){
                self.loadIngLabel.string = "加载中.";
            }),
            cc.delayTime(0.5),
            cc.callFunc(function(){
                self.loadIngLabel.string = "加载中..";
            }),
            cc.delayTime(0.5),
            cc.callFunc(function(){
                self.loadIngLabel.string = "加载中...";
            }),
            cc.delayTime(0.5),
            cc.callFunc(function(){
                self.loadIngLabel.string = "加载中";
            })
        )))

        // this.scheduleOnce(function(){
        //     SoundManager.playBgm(SoundManager.loginSceneBgm);
        // })
        
        
        
        // let button = wx.createUserInfoButton({
        //     type: 'text',
        //     text: '获取用户信息',
        //     style: {
        //         left: 10,
        //         top: 76,
        //         width: 200,
        //         height: 40,
        //         lineHeight: 40,
        //         backgroundColor: '#ff0000',
        //         color: '#ffffff',
        //         textAlign: 'center',
        //         fontSize: 16,
        //         borderRadius: 4
        //     }
        // })

        // button.onTap((res) => {
        //     console.log(res)
        //     window.avatarUrl = res.userInfo.avatarUrl;
        // })


        // wx.authorize({
        //     scope:"scope.userInfo",
        //     success: function(res){
        //         wx.getUserInfo({
        //             success: function(res) {
        //                 var userInfo = res.userInfo
        //                 var nickName = userInfo.nickName
        //                 var avatarUrl = userInfo.avatarUrl
        //                 var gender = userInfo.gender //性别 0：未知、1：男、2：女
        //                 var province = userInfo.province
        //                 var city = userInfo.city
        //                 var country = userInfo.country
        //                 
        //                 console.log(res, "res")
        //             }
        //         })
        //     }
        // })
    },

    // 加载数据表
    loadConfig: function(){
        this.loadConfigCount = 0;
        var self = this;
        if(!window.AnimalConfig){
            // 动物表
            cc.loader.loadRes("AnimalConfig", function(error, info){
                window.AnimalConfig = info.json;
                self.loadConfigCount++;
            })
        }
        

        if(!window.AreaConfig){
            // 区域表
            cc.loader.loadRes("AreaConfig", function(error, info){
                window.AreaConfig = info.json;
                self.loadConfigCount++;
            })
        }
        
        if(!window.HouseConfig){
            // 地块表
            cc.loader.loadRes("HouseConfig", function(error, info){
                window.HouseConfig = info.json;
                self.loadConfigCount++;
            })
        }
        
        if(!window.TrainConfig){
            // 火车表
            cc.loader.loadRes("TrainConfig", function(error, info){
                window.TrainConfig = info.json;
                self.loadConfigCount++;
            })
        }

        if(!window.BoxConfig){
            // 娃娃机抽奖表
            cc.loader.loadRes("BoxConfig", function(error, info){
                window.BoxConfig = info.json;
                self.loadConfigCount++;
            })
        }
    },

    onClickLoadScene: function(){
        // SoundManager.playEffect(SoundManager.buttonClick);
        if(this.loadScene && !CC_WECHATGAME){
            this.turnToStartScene();
        }
        
    },

    turnToStartScene (){
        this.willTurnToStart = true;
        this.startLoading();
        this._tryTurnToStartScene();
    },

    startLoading (){

        if( this.loadNode != null ){
            if(this.loadNode.active == true){
                return;
            }
            this.loadNode.active = true;
        }

        this.node.getChildByName("button").active = false;
        this.node.getChildByName("New Button").active = false;
        this.loadingBar.progress = 0;
        let random1 = parseInt(Math.random() * 0.4 * 100 + 1);
        let random2 = parseInt(Math.random() * 0.4 * 100 + 1) + 40;
        let final = 95;
        let waitTime = 0;
        this.schedule(function(dt){
            if(waitTime > 0){
                waitTime -= dt;
                return;
            }
            this.loadingBar.progress += 0.01;
            if(parseInt(this.loadingBar.progress * 100) == random1 || parseInt(this.loadingBar.progress * 100)== random2){
                waitTime += 1;
            }
            if(parseInt(this.loadingBar.progress * 100) == final){
                waitTime += 100;
            }
        },0.05);

    },

    _tryTurnToStartScene (){
        if(this.willTurnToStart && this.startSceneIsLoaded){
            cc.director.loadScene("StartScene");
        }
    },

    start () {

    },


    WeChartLogin(){
        var url = http.URL;
        if (CC_WECHATGAME) {
            var self = this;
            //判断玩家是否登陆过了isLogined1 
            if (cc.sys.localStorage.getItem("isLogined1") == 1) {
                //玩家曾经登陆过
                console.log("玩家登陆过");
                // //取出本地存储的id和passtoken
                // var userId = cc.sys.localStorage.getItem("userId");
                // var passToken = cc.sys.localStorage.getItem("passToken");
                http.sendRequest("/getJoyZooUserInfo",
                    {
                        id: userData.info.userId,
                        passToken: userData.info.passToken,
                        version: userData.info.version,
                    },
                    function (data) {
                        //var self = this;
                        console.log("玩家登陆过==更新信息", data);
                        if (data.code == 10000) {
                            // cc.vv.userData.bestScore = data.res.maxScore;
                            // cc.vv.userData.checkFlag = data.res.checkFlag;
                            
                            // if (cc.vv.userData.maxNum >= 10) {
                            //     cc.vv.userData.isUnlockedSkin1 = 1;
                            // }
                            //console.log("cc.vv.userData.maxScore", cc.vv.userData.maxScore, "cc.vv.userData.maxNum", cc.vv.userData.maxNum);
                        } else {
                            //登陆信息过期 玩家点击重新登陆
                            console.log("玩家登陆信息过期，重新登陆");
                            self.Login();
                        }

                    });
            } else 
            {
                //玩家首次登陆
                console.log("玩家首次登陆");
                this.Login();
            }
            // wx.showShareMenu();
            //本地测试
        } else {
            console.log("本地测试");
            userData.info.userId = 7132522;
            userData.info.passToken = "8ee9226402bb3d93208a6ea7b0ce12b7";
            http.sendRequest("/getJoyZooUserInfo",
                {
                    id: userData.info.userId,
                    passToken: userData.info.passToken
                },
                function (data) {

                    // console.log("本地测试==更新用户信息", data);
                    // cc.vv.userData.maxScore = data.res.maxScore;
                    // cc.vv.userData.maxNum = data.res.maxNum;
                    // cc.vv.userData.skinType = data.res.skinType;
                    // if (cc.vv.userData.maxNum >= 10) {
                    //     cc.vv.userData.isUnlockedSkin1 = 1;
                    // }
                    // console.log("cc.vv.userData.maxScore", cc.vv.userData.maxScore, "cc.vv.userData.maxNum", cc.vv.userData.maxNum);
                });
        }
    },

    Login() {
        console.log("~~~~~~~~login");
        var url = http.url;
        var self = this;
        //获取code
        if (CC_WECHATGAME) {
            wx.login({
                success: function (res) {
                    console.log("loginres", res);


                    //把code发给服务器 换id和passtoken
                    wx.request({
                        url: http.LoginURL + "/wxgame",
                        data: {
                            code: res.code
                        },
                        success: function (res) {
                            if (res.data.res != null) {
                                console.log("请求的id和passtoken===id=", res.data.res.id, "===passToken=", res.data.res.passToken);
                                console.log("返回的微信信息：", res.data);
                                //请求到的id 和  passToken  存本地
                                cc.sys.localStorage.setItem("userId", res.data.res.id);
                                cc.sys.localStorage.setItem("passToken", res.data.res.passToken);
                                userData.info.userId = res.data.res.id;
                                userData.info.passToken = res.data.res.passToken;
                                userData.info.freshFlag = res.data.res.freshFlag;
                                userData.saveInfo();
                            } else {
                                //一般不会获取不到
                                console.log("没有获取到id和passToken");
                                self.WeChartLogin(); 

                            }
                            //获取到id 和 passtoken 更新玩家信息
                            http.sendRequest("/getJoyZooUserInfo",
                                
                                {
                                    id: userData.info.userId,
                                    passToken: userData.info.passToken,
                                    version: userData.info.version,
                                },
                                function (data) {
                                    //console.log("获得pass id更新玩家信息", data);
                                    //console.log("---------------", data.res.maxScore, data.res.skinType);
                                    // cc.vv.userData.checkFlag = data.res.checkFlag;
                                    // cc.vv.userData.bestScore = data.res.maxScore;
                                    // cc.vv.userData.curSkinInx = data.res.skinType;
                                });

                            self.getAllInviteeInfo();  
                              
                            //渠道信息
                            self.getLaunchOptionsSync(userData.info.userId, userData.info.passToken);
                            //绘制userinfobutton  这部分走不走无所谓 其实就是服务器能不能获取到当前玩家的微信信息
                            let btnSize = cc.size(self.btn_Start.width + 10, self.btn_Start.height + 10);
                            let frameSize = cc.view.getFrameSize();
                            console.log("frameSize: ", frameSize);
                            let winSize = cc.director.getWinSize();
                            console.log("winSize: ", winSize);
                            // 适配不同机型来创建微信授权按钮
                            let left = (winSize.width * 0.5 + self.btn_Start.x - btnSize.width * 0.5) / winSize.width * frameSize.width;
                            console.log("left: ", left);
                            let top = (winSize.height * 0.5 - self.btn_Start.y - btnSize.height * 0.5) / winSize.height * frameSize.height;
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
                            console.log("button.x = ",button.x ,"button.y = ",button.y);
                            //button点击事件
                            button.onTap((res) => {
                                console.log("点击用户授权button");
                                // button.show();
                                console.log("button.onTap", res);
                                //用户是否同意授权   userinfo是否为空
                                if (res.userInfo != null) {
                                    //用户同意授权了  res 不为空
                                    console.log("USerInfoRes", res);
                                    var url = http.LoginURL + "/getWXUserInfo";
                                    console.log("用户信息", res.userInfo);
                                    console.log("用户idpasstoken", userData.info.userId, userData.info.passToken);
                                    userData.info.avatarUrl = res.userInfo.avatarUrl;
                                    userData.info.nickName = res.userInfo.nickName;
                                    userData.saveInfo();
                                    self.startLoading();
                                    wx.request({
                                        url: url,
                                        data: {
                                            id: userData.info.userId,
                                            passToken: userData.info.passToken,
                                            avatarUrl: res.userInfo.avatarUrl,
                                            country: res.userInfo.country,
                                            province: res.userInfo.province,
                                            city: res.userInfo.city,
                                            gender: res.userInfo.gender,
                                            nickName: res.userInfo.nickName
                                        },

                                        success: function (res) {
                                            console.log("更新玩家微信信息", res);
                                            cc.sys.localStorage.setItem("isLogined1", 1);
                                            if(self.loadScene){
                                                self.turnToStartScene();
                                            }
                                        }
                                    });
                                    
                                } else {//用户没同意授权
                                    console.log("授权失败");
                                    if(self.loadScene){
                                        self.turnToStartScene();
                                    }
                                }
                                button.destroy();
                            });


                        },
                        fail: function (res) {
                            console.log("请求的id和passtoken失败", res);

                        }
                    });
                }
            });
        }
    },    

    //渠道
    getLaunchOptionsSync(id, passToken) {
        var LauRes = wx.getLaunchOptionsSync();
        console.log("LauRes", JSON.stringify(LauRes));
        // if (LauRes) {
        //     var url = http.LoginURL + "/updateUserChn?";
        //     url += "id" + "=" + id + "&" + "passToken" + "=" + passToken;
        //     if (LauRes.scene != null) {
        //         url += "&" + "scene" + "=" + LauRes.scene;
        //     }
        //     if (LauRes.query != null) {
        //         var data = LauRes.query;
        //         for (var k in data) {
        //             url += "&" + k + "=" + data[k];
        //         }
        //     }
        //     if (LauRes.referrerInfo != null) {
        //         var data = LauRes.referrerInfo;
        //         for (var k in data) {
        //             url += "&" + k + "=" + data[k];
        //         }
        //     }
        //     console.log("url----------", url);
        //     wx.request({
        //         url: url,
        //         success: function (res) {
        //             console.log("渠道", res);
        //         }
        //     });
        // }

        if (LauRes.query != null) {
            console.log("LauRes.query", LauRes.query);
            var type = null;
            if (userData.info.freshFlag == 1) {
                console.log("新用户");
                type = 1;
            } else if (userData.info.freshFlag == 0) {
                console.log("老用户");
                type = 2;
            }
            // var url = tools.GameConfig.MessageHttpConfig.InviteBind;
            // if (LauRes.query.inviteId != null) {
            //     var inviteId = LauRes.query.inviteId;
            //     if(inviteId == id){
            //         return;
            //     }
            //     var data = {
            //         id: inviteId,
            //         inviteeId: id,
            //         type: type,
            //         passToken: passToken,
            //     }

            //     cc.MessageHttp.sendXHRAB(tools.GameConfig.MessageHttpConfig.InviteBind, data, function (res) {
            //         console.log("5、玩家邀请（协助）关系绑定", res);
            //     })
            // }

            console.log("LauRes.query.inviteId =", LauRes.query.inviteId);
            if (LauRes.query.inviteId != null) {

                var strArr = LauRes.query.inviteId.split("_")
                var inviteId = strArr[0];
                console.log("LauRes.query.inviteId =", strArr[0]);
                var areaId = strArr[1];
                console.log("LauRes.query.areaId =", strArr[1]);
                var groundId = strArr[2];    
                console.log("LauRes.query.inviteId =", strArr[2]);   
                
                console.log("id =", id);  
                if(inviteId == id){
                    return;
                }

                wx.request({
                    url: http.url + "/saveInviteeInfo",
                    data: {
                        id: inviteId,
                        inviteeId: id,
                        areaId: areaId,
                        groundId: groundId,                        
                        type: type,
                        passToken: passToken,
                    },
                    
                    success: function (res) {
                        console.log("4、玩家邀请（协助）关系绑定", res);
                    },
                    fail: function (res) {
                        console.log("5、玩家邀请（协助）关系绑定失败", res);

                    }
                });
            }
        }
    },


    getAllInviteeInfo:function(){
        if (CC_WECHATGAME) {
            var sendData = {};
            sendData.id = userData.info.userId;
            sendData.passToken = userData.info.passToken;

            cc.MessageHttp.sendXHRAB(gameConfig.MessageHttpConfig.QueryAllInvite,sendData,(res)=>{                    
                let user_data_array = {};
                if (!CC_WECHATGAME) {

                    let data = JSON.parse(res);
                } else {
                    user_data_array = res.data.res;
                }
                console.log("user_InviteeInfo_array==",res.data.res);

                //zooInfoScript.setZooIdx(this.zooIdx, this.groundIdx, res.data.res);
            });
        }        

    },

    // initCompeteBtn: function(){

    //     var self = this;
    //     var sysInfo = wx.getSystemInfoSync();
    //     var screenWidth = sysInfo.screenWidth;
    //     var screenHeight = sysInfo.screenHeight;   

    //     var btnWidth = 328 * screenWidth / 720;
    //     var btnHeight = 91 * screenWidth / 720;
    //     console.log("=============createUserInfoButton: ", btnWidth, btnHeight, cc.winSize.width/2, cc.winSize.height/2);
    //     window.competeButton = wx.createUserInfoButton({
    //         type: 'image',
    //         image: 'res/raw-assets/resources/image/btn.png',
    //         style: {
    //             left: screenWidth/2 - btnWidth/2,
    //             top: screenHeight/2 + btnHeight/2 + 10,
    //             width: btnWidth,
    //             height: btnHeight,
    //             lineHeight: 40,
    //             backgroundColor: '#ff0000',
    //             color: '#ffffff',
    //             textAlign: 'center',
    //             fontSize: 16,
    //             borderRadius: 4
    //         }
    //     });
    //     competeButton.onTap((res) => {
    //         // competeButton.hide();
    //         console.log(res);
    //         cc.log("++++++++++++++++++++++++++++=userInfo", res.userInfo)
    //         if(!self.game.avatarUrl){
    //             self.game.avatarUrl=res.userInfo.avatarUrl;
    //             self.game.nickName=res.userInfo.nickName;
    //             self.game.onLoginSelfLogic();
    //         }
    //         // }else{
    //         //     // if(self.game.competeRoomId){

    //         //     // }else{

    //         //     // }
    //         //     this.addCompeteDetailUI();
    //         // }
    //         this.game.addCompeteDetailUI();

            
    //     });
    //     // competeButton.hide();


    // },    


    // 添加提示文本
    addToastUI(label, callback){
        var toast = cc.instantiate(this.toastPrefab);
        var toastScript = toast.getComponent("Toast");
        toastScript.game = this;
        this.node.addChild(toast);

        toastScript.setToast(label, callback)
    },


    refreshData:function(){
        if(this.loadScene){
            userData.initUserData(true);
            this.addToastUI("数据已清理完成 点击微信登陆!");
            //this.turnToStartScene();
        }
    },

    update (dt) {
        if(!this.loadScene && this.loadConfigCount && this.loadConfigCount == 5 && gameConfig.loadConfigCount == 14 && 
            (CC_WECHATGAME || this.getAllInvitee)){
            userData.initUserData(false);
            userData.newInStart = true;
            this.loadScene = true;
            this.loadIngLabel.node.stopAllActions();
            this.loadIngLabel.string = "开始游戏";
            //this.WeChartLogin();
            this.Login();
            this.loadIngLabel.node.runAction(cc.repeatForever(cc.sequence(
                cc.fadeIn(0.5),
                cc.delayTime(1),
                cc.fadeOut(0.5)
            )))
        }
    },
});
