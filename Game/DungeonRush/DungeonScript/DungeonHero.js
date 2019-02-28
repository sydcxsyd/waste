let DungeonSheet = require("DungeonSheet");
let Hero = {
    hp : 0, //当前生命值
    heal : 0,   //治愈比
    maxHp : 0,

    swardAck : 0, //攻击力
    baseAck : 0, //基础
    lifeSteal : 0,//生命偷取

    shield : 0, //防御力
    maxShield : 0,//最大防御力
    shieldDefense : 0,//单个盾的防御力
    shieldDurability : 0,//盾牌耐久性（防御后损坏可能性）

    shieldExp : 0,
    shieldExGot : 0,
    shieldLevel : 0, //防御力等级

    coin : 0,//当前coin
    coinExGot : 0,//coin获得比
    coinLevel : 0,//coin等级

    exp : 0,
    expExGot: 0,//经验获得比
    level : 0,

    skills : {},

    init (){

    },

    checkCoinLevel (){
        let levelData = DungeonSheet.heroLevelData[this.coinLevel];
        let needExp = levelData.coin;
        if(this.coin >= needExp){
            this.coinLevel++;
            G_EventManager.pushEvent(G_Con.eventName.HERO_COIN_UP);
            this.checkCoinLevel();
        }
    },

    checkExpLevel (){
        let levelData = DungeonSheet.heroLevelData[this.level];
        let needExp = levelData.exp;
        if(this.exp >= needExp){
            this.level++;
            G_EventManager.pushEvent(G_Con.eventName.HERO_LEVEL_UP);
            this.checkExpLevel();
        }
    },

    checkShieldLevel (){
        let levelData = DungeonSheet.heroLevelData[this.shieldLevel];
        let needExp = levelData.shield;
        if(this.shieldExp >= needExp){
            this.shieldLevel++;
            G_EventManager.pushEvent(G_Con.eventName.HERO_SHEILD_UP);
            this.checkShieldLevel();
        }
    },

    checkHp (){
        if(this.hp <= 0){
            G_EventManager.pushEvent(G_Con.eventName.HERO_DEAD);
        }
    },
};
module.exports = Hero;