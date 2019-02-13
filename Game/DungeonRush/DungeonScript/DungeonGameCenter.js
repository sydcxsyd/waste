let User = ("DungeonUser");
let Hero = ("DungeonHero");
window.G_GameCen = {
    cellData : {
        type : -1,
        pos : null,
    },
    len : 0,
    gameDic : null,

    initGame (length){
        this.len = length;
        this.gameDic = this._getDic(false);
    },

    _getDic (isMonster){
        let dic = {};
        for(let i = 0 ; i < this.len ;i++){
            dic[i] = [];
            for(let j = 0 ; j < this.len ;j++){
                let abandonList = isMonster ? null : [G_Con.cellType.monster];
                dic[i][j] = this.createRandomPoint(abandonList);
                dic[i][j].pos = cc.v2(i,j);
            }
        }
        return dic;
    },

    createRandomPoint : function(abandonTypeList){
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
        return cellData;
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