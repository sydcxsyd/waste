let User = ("DungeonUser");
let Hero = ("DungeonHero");
window.G_GameCen = {
    cellData : {
        type : -1,
        vec : null,
    },
    len : 0,
    gameDic : null,

    initGame (length){
        this.len = length;
        this.gameDic = this._getDic(false);
    },

    getCellDataByVec (vec){
        return this.gameDic[vec.x][vec.y];
    },

    _getDic (isMonster){
        let dic = [];
        for(let i = 0 ; i < this.len ;i++){
            dic[i] = [];
            for(let j = 0 ; j < this.len ;j++){
                let abandonList = isMonster ? null : [G_Con.cellType.monster];
                dic[i][j] = this.createRandomPoint(abandonList,cc.v2(i,j));
            }
        }
        return dic;
    },

    createRandomPoint : function(abandonTypeList,vec){
        let cellData = Object.create(this.cellData);
        abandonTypeList = abandonTypeList || [];
        let typeList = [];
        for(let i in G_Con.cellType){
            typeList.push(G_Con.cellType[i]);
            for(let j = 0; j < abandonTypeList.length; j++){
                if(abandonTypeList[i] == G_Con.cellType[i]){
                    typeList.pop();
                    break;
                }
            }
        }

        cellData.type = typeList[Math.floor(typeList.length * Math.random())];
        cellData.vec = vec;
        return cellData;
    },

    delPoints (points){
        for(let value of points){
            this.delPoint(value);
        }
    },

    delPoint (point){
        this.gameDic[point.x][point.y] = null;
    },

    fillDic (){
        let moveList = [];
        let moveObj = {
            from : null,
            to : null,
        };
        this.gameDic.forEach((arr,indexX)=> arr.forEach((cellData,indexY)=> {
            if(!cellData){
                for(let i = indexY; i < this.len; i++){
                    if(this.gameDic[indexX][i]){
                        let tMoveObj = Object.create(moveObj);
                        tMoveObj.from = cc.v2(indexX,indexY);
                        tMoveObj.to = cc.v2(indexX,i);
                        moveList.push(tMoveObj);
                        this.gameDic[indexX][indexY] = this.gameDic[indexX][i];
                        this.gameDic[indexX][i] = null;
                    }
                }
            }
        }))

        for(let value of moveList){
            this.gameDic[i][j] = this.createRandomPoint(null,value.from);
            let tMoveObj = Object.create(moveObj);
            tMoveObj.to = value.from;
            moveList.push(tMoveObj);
        }

        return moveList;
    },

    caculateResult (cellList){
        if(cellList.length == 0){
            return;
        }
        switch (cellList[0].type) {
            case G_Con.cellType.coin:
                this.caculateCoins(cellList);
                break;
            case G_Con.cellType.shield:
                this.caculateShield(cellList);
                break;
            case G_Con.cellType.monster:
            case G_Con.cellType.sword:
                this.caculateDamage(cellList);
                break;
            case G_Con.cellType.heal:
                this.caculateHealth(cellList);
                break;
        }
    },

    caculateDamage (cellList){

    },

    caculateHealth (cellList){

    },

    caculateCoins (cellList){

    },

    caculateShield (cellList){

    },

};