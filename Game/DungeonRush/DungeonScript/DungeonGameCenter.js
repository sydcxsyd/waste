let User = ("DungeonUser");
let Hero = ("DungeonHero");
window.G_GameCen = {
    cellData : {
        type : -1,
        vec : null,
        exData : null,
    },

    rewardData : {
        hpChanged : 0,
        coinChange : 0,
        expChange : 0,
        shieldChange : 0,
        sheildExpChange : 0,
        costCellList : null,
        allCellList : null,
        atk : 0,            //攻击
        totalDmg : 0,       //造成总伤害
        beHurt : 0,         //被伤害
    },

    monsterData : {
        hp : 0,
        maxHp : 0,
        atk : 0,
        exp : 0,
        liveTurns : 0,
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
        let cellData = G_Common.copyObj(this.cellData);
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

    dealReward (reward){
        if(reward.costCellList){
            this.delPoints(reward.costCellList);
        }

        Hero.hp += reward.hpChanged;
        Hero.coin += reward.coinChange;
        Hero.exp += reward.expChange;
        Hero.shield += reward.shieldChange;
        Hero.shieldExp += reward.sheildExpChange;
        if(reward.costCellList.length != reward.allCellList.length){
            for(let cellData of reward.allCellList){
                if(cellData.type == G_Con.cellType.monster){
                    cellData.exData.hp -= reward.atk;
                }
            }
        }

        Hero.checkCoinLevel();
        Hero.checkExpLevel();
        Hero.checkShieldLevel();
        Hero.checkHp();
    },

    monsterMove (){
        let monsterList = this.getListByType(G_Con.cellType.monster);
        let atk = 0;
        let atkMonsterList = [];
        for(let cellData of monsterList){
            if(cellData.exData.liveTurns > 0){
                atk += cellData.exData.atk;
                atkMonsterList.push(cellData);
            }
        }
        let rewardObj = this._getRewardObj();
        let hpDel = -(atk - (Hero.shield * Hero.shieldDefense));
        hpDel = Math.max(0,hpDel);

        let usedShieldNum = Math.min(Math.ceil(atk / Hero.shieldDefense),Hero.shield);
        let costShieldNum = 0;
        while(usedShieldNum > 0){
            if(Math.random() > Hero.shieldDurability){
                costShieldNum -= 1;
            }
            usedShieldNum--;
        }

        rewardObj.hpChanged = hpDel;
        rewardObj.shieldChange = costShieldNum;
        rewardObj.beHurt = atk;
        rewardObj.allCellList = atkMonsterList;

        return rewardObj;
    },

    getListByType (type){
        let list = [];
        for(let cellArr of this.gameDic){
            for(let cellData of cellArr){
                if(cellData.type == type){
                    list.push(cellData);
                }
            }
        }
        return list;
    },

    //return obj : this.rewardData
    caculateReward (cellDataList){
        if(cellList.length == 0){
            return null;
        }
        switch (cellDataList[0].type) {
            case G_Con.cellType.coin:
                return this.caculateCoins(cellDataList);
            case G_Con.cellType.shield:
                return this.caculateShield(cellDataList);
            case G_Con.cellType.monster:
            case G_Con.cellType.sword:
                return this.caculateDamage(cellDataList);
            case G_Con.cellType.heal:
                return this.caculateHealth(cellDataList);
        }
    },

    _getRewardObj (){
        return Object.create(this.rewardData);
    },

    caculateDamage (cellDataList){
        let swordList = [];
        let monsterList = [];
        let costCellList = [];
        for(let value of cellDataList){
            if(value.type == G_Con.cellType.sword){
                swordList.push(value);
                costCellList.push(value);
            }else if(value.type == G_Con.cellType.monster){
                monsterList.push(value);
            }
        }

        let rewardObj = this._getRewardObj();
        let exp = 0;
        let atk = swordList.length * Hero.swardAck + Hero.baseAck;
        let totalDmg = 0;
        for(let value of monsterList){
            if(this._checkKilled(atk,value)){
                exp += value.exData.exp;
                costCellList.push(value);
            }
            totalDmg += this._getDamage(atk,value);
        }

        exp = parseInt(exp * Hero.expExGot);

        let hp = parseInt(Hero.lifeSteal * totalDmg);

        rewardObj.costCellList = costCellList;
        rewardObj.expChange = exp;
        rewardObj.atk = atk;
        rewardObj.totalDmg = totalDmg;
        rewardObj.allCellList = cellDataList;

        rewardObj.hpChanged = hp;
        return rewardObj;
    },

    _checkKilled (atk,cellData){
        if(atk >= cellData.exData.hp){
            return true;
        }
        return false;
    },

    _getDamage (atk,cellData){
        if(atk >= cellData.exData.hp){
            return cellData.exData.hp;
        }else{
            return atk;
        }
    },

    caculateHealth (cellDataList){
        let hp = cellDataList.length * Hero.heal;
        hp = Hero.maxHp - Hero.hp >= heal ? heal : Hero.maxHp - Hero.hp;
        let rewardObj = this._getRewardObj();
        rewardObj.hpChanged = hp;

        rewardObj.costCellList = [];
        for(let value of cellDataList){
            rewardObj.costCellList.push(value);
        }

        rewardObj.allCellList = cellDataList;

        return rewardObj;
    },

    caculateCoins (cellDataList){
        let coins = cellDataList.length * Hero.coinExGot;
        let rewardObj = this._getRewardObj();
        rewardObj.coinChange = coins;

        rewardObj.costCellList = [];
        for(let value of cellDataList){
            rewardObj.costCellList.push(value);
        }

        rewardObj.allCellList = cellDataList;

        return rewardObj;
    },

    caculateShield (cellDataList){
        let shieldGot = cellDataList.length * Hero.shieldExGot;
        let shieldExpGot = shieldGot * 1;//todo exp
        shieldGot = Hero.maxShield - Hero.shield >= shieldGot ? shieldGot : Hero.maxShield - Hero.shield;
        let rewardObj = this._getRewardObj();
        rewardObj.shieldChange = shieldGot;
        rewardObj.sheildExpChange = shieldExpGot;

        rewardObj.costCellList = [];
        for(let value of cellDataList){
            rewardObj.costCellList.push(value);
        }

        rewardObj.allCellList = cellDataList;

        return rewardObj;
    },

    saveGame (){

    },

    saveUserData(key){
        if(this[key]){
            let jsonStr = JSON.stringify(this[key]);
            cc.sys.localStorage.setItem(key, jsonStr);
        }
    },
};