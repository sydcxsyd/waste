let User = {
    brilliant : 0,  //智商
    strong : 0,     //打架能力
    talk : 0,       //bb能力 骂娘能力 喷人能力
    speed : 0,      //逃跑速度
    big : 0 ,       //容量
};


window.G_User = {
    user : null,
    userProper : ["brilliant","strong","talk","speed","big"],
    init () {
        if(G_Local.load("isNewer")){
            this.user = G_Local.loadObj("user");
        }else{
            this.user = Object.create(User);
        }
    },

    addProper : function(proper,addNum){

    },

    changeProper : function(proper,changeToNum){

    },



};