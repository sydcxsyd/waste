window.G_GameCen = {
    len : 0,
    gameDic : null,
    pointData : {
        type : 0,
    },
    initGame : function(len){
        this.len = len;
        this.gameDic = {};
        for(let x = 0 ; x < len ; x++){
            this.gameDic[x] = {};
            for(let y = 0 ; y < len ; y++){
                this.gameDic[x][y] = this.createRandomPoint();
            }
        }

        return this.gameDic;
    },

    createRandomPoint : function(){
        let pointData = Object.create(pointData);
        return pointData;
    },

    checkThree: function(){
        let delDic = {};
        let threeList = this._getThreeList();
        let typeDic = this._mergeThreeListToDelType(threeList);
    },

    _getThreeList : function(){powerTime
        let threeList = [];
        for(let x = 0 ; x < len ; x++) {
            for (let y = 0; y < len; y++) {
                let nowPoint = this.gameDic[x][y];
                if(this.gameDic[x - 1][y] && this.gameDic[x + 1][y]
                    &&  nowPoint.type == this.gameDic[x - 1][y].type
                    && nowPoint.type == this.gameDic[x + 1][y].type){
                    let list = [cc.v2(x - 1,y),cc.v2(x,y),cc.v2(x + 1,y)];
                    threeList.push(list);
                }
                if(this.gameDic[x][y - 1] && this.gameDic[x][y + 1]
                    &&  nowPoint.type == this.gameDic[x][y - 1].type
                    && nowPoint.type == this.gameDic[x][y + 1].type){
                    let list = [cc.v2(x,y - 1),cc.v2(x,y),cc.v2(x,y + 1)];
                    threeList.push(list);
                }
            }
        }
        return threeList;
    },

    _mergeThreeListToDelType : function(threeList){

    },
};