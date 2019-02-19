window.G_GameCen = {
    len : 0,
    gameDic : null,
    pointData : {
        type : 0,
    },
    initGame : function(len){
        this.len = len;
        this.gameDic = this._getDic(false);
        return this.gameDic;
    },

    _getDic (isEmpty){
        let gameDic = {};
        for(let x = 0 ; x < this.len ; x++){
            gameDic[x] = {};
            for(let y = 0 ; y < this.len ; y++){
                if(isEmpty){
                    gameDic[x][y] = 0;
                }else{
                    gameDic[x][y] = this.createRandomPoint();
                }

            }
        }
        return gameDic;
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

    _getThreeList : function(){
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
        let dicList = [];
        let tDic = null;
        let allDic = this._getDic(true);
        for(let i = 0 ; i < threeList.length ; i++){
            let list = threeList[i];
            if(!this._checkThreeInDic(allDic,list)){
                tDic = {};
                dicList.push(tDic);
            }else{
                for(let j in dicList){
                    let dic = dicList[j];
                    if(){

                    }
                }
            }
            tDic[list[0].x][list[0].y] = tDic.[list[1].x][list[1].y] = tDic.[list[2].x][list[2].y] = 1;
        }

    },

    _checkThreeInDic (dic,threeList){
        return dic[threeList[0].x][threeList[0].y] || dic[threeList[1].x][threeList[1].y] || dic[threeList[2].x][threeList[2].y]
    },


};