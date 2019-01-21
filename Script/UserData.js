let User = {
    brilliant : 0,  //智商
    strong : 0,     //打架能力
    talk : 0,       //bb能力 骂娘能力 喷人能力
    speed : 0,      //逃跑速度
    big : 0 ,       //容量
};


window.G_User = {
    user : null,
    _user_save : "_user_save",

    wasteDic : {},
    _wasteDic_save : "_wasteDic_save",

    userProper : ["brilliant","strong","talk","speed","big"],
    init () {
        if(G_Local.load("isNewer")){
            this.user = G_Local.loadObj(this._user_save);
            this.wasteDic = G_Local.loadObj(this._wasteDic_save);
        }else{
            this.user = Object.create(User);
        }
    },

    addProper : function(properName,addNum){
        let nowPoper = this.userProper[addNum];
        this.changeProper(properName,nowPoper + addNum);
    },

    changeProper : function(properName,changeToNum){
        this.userProper[addNum] = changeToNum;
        G_Local.saveObj(this._user_save,this.user);
    },

    getFightNum (){
        return (this.user.brilliant + this.user.strong + this.user.talk + this.user.speed + this.user.big ) * 10
    },

    newWaste (wasteWords){
        let date = G_Common.getWXNowDate();
        if(!this.wasteDic[date.toLocaleDateString()]){
            this.wasteDic[date.toLocaleDateString()] = [];
        }
        let dayList = this.wasteDic[date.toLocaleDateString()];
        dayList.push(wasteWords);
        G_Local.saveObj(this._wasteDic_save,this.wasteDic);
    },

};