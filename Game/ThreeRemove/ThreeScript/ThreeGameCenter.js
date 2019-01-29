window.G_GameCen = {
    len : 0,
    gameDic : null,

    pointData : {
        type : 0,
    },
    initGame : function(len){
        this.len = len;
        this.gameDic = this._getDic(true);
        return this.gameDic;
    },

    _getDic (notEmpty,containThree){
        let gameDic = {};
        for(let x = 0 ; x < this.len ; x++){
            gameDic[x] = {};
            for(let y = 0 ; y < this.len ; y++){
                if(!notEmpty){
                    gameDic[x][y] = 0;
                }else{
                    if(containThree){
                        gameDic[x][y] = this.createRandomPoint();
                    }else{
                        let abandonTypeList = [];
                        if(gameDic[x - 1] && gameDic[x - 2] && gameDic[x - 1][y] && gameDic[x - 2][y]){
                            if(gameDic[x - 1][y].type == gameDic[x - 2][y].type ){
                                abandonTypeList.push(gameDic[x - 1][y].type);
                            }
                        }
                        if(gameDic[x][y - 1] && gameDic[x][y - 2]){
                            if(gameDic[x][y - 1].type == gameDic[x][y - 2].type ){
                                abandonTypeList.push(gameDic[x][y - 1].type);
                            }
                        }
                        gameDic[x][y] = this.createRandomPoint(abandonTypeList);
                    }
                }

            }
        }
        return gameDic;
    },

    createRandomPoint : function(abandonTypeList){
        let pointData = Object.create(pointData);
        if(abandonTypeList.length > 0){

        }else{

        }
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
                if(this.gameDic[x - 1] && this.gameDic[x - 1][y]
                    && this.gameDic[x + 1] && this.gameDic[x + 1][y]
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
        let allDic = this._getDic();
        for(let i = 0 ; i < threeList.length ; i++){
            let list = threeList[i];
            if(!this._checkThreeInDic(allDic,list)){
                tDic = {};
                dicList.push(tDic);
            }else{
                for(let j in dicList){
                    let dic = dicList[j];
                    if(this._checkThreeInDic(dic,list)){
                        dic[list[0].x][list[0].y] = dic[list[1].x][list[1].y] = dic[list[2].x][list[2].y] = 1;
                        break;
                    }
                }
            }
            allDic[list[0].x][list[0].y] = allDic[list[1].x][list[1].y] = allDic[list[2].x][list[2].y] = 1;

        }
        return dicList;

    },

    getDicType (dic){
        let num = 0;
        let pointList = [];
        for(let i in dic){
            for(let j in dic[i]) {
                num++;
                pointList.push(cc.v2(parseInt(i),parseInt(j)));
            }
        }
        if(num == 3){
            return G_Con.delType.normal;
        }else if(num == 4){
            return G_Con.delType.four;
        }else if(num == 5){
            let xPoints,yPoints = 0;
            for(let i = 0 ; i < pointList.length; i++){
                xPoints += pointList[i].x;
                yPoints += pointList[i].y;
            }
            if(dic[xPoints / 5] && dic[xPoints / 5][yPoints / 5]){
                return G_Con.delType.five;
            }else{
                if(G_Common.isInteger(xPoints / 5) || G_Common.isInteger(yPoints / 5)){
                    return G_Con.delType.tType;
                }else{
                    return G_Con.delType.lType;
                }
            }
        }
        return G_Con.delType.error;
    },

    _checkThreeInDic (dic,listThree){
        return dic[listThree[0].x][listThree[0].y] || dic[listThree[1].x][listThree[1].y] || dic[listThree[2].x][listThree[2].y]
    },


};