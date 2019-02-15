let User = ("DungeonUser");
let Hero = ("DungeonHero");
let SceneType = {
    init : 1,
    start : 2,
    startTurn : 3,
    playerFreeMove : 4,
    playerMove : 5,
    monsterMove : 6,
    endTurn : 7,
};
cc.Class({
    extends: cc.Component,
    properties: {
        // ============================== component ==============================
        mapNode : cc.Node,
        // ============================== scene property ==============================
        sceneType : {
            visible : false,
            default : 0,
        },

    },

    onLoad () {
        this.gameDefineProperty()
    },

    gameDefineProperty () {
        Object.defineProperty(this, "sceneType", {
            get: () => this.____sceneType,
            set: this.changeSceneType.bind(this),
        })

        this.cellDic = null;
    },

    getCellByVec (vec){
        return this.cellDic[vec.x][vec.y];
    },

    start () {
        this.mapNode.on(cc.Node.EventType.TOUCH_START,this.touchStart);
        this.mapNode.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove);
        this.mapNode.on(cc.Node.EventType.TOUCH_END,this.touchEnd);
        this.mapNode.on(cc.Node.EventType.TOUCH_CANCEL,this.touchcancel);
    },

    reloadHero (){

    },

    startGame (){
        G_GameCen.initGame();
        this.gameInit();
    },

    gameInit (){

    },

    touchStart (event){
        let pos = event.getLocation();
        let vec = G_Fuc.getVecByPos(pos);
        let cell = this.getCellByVec(vec);
        if(cell.isTouchAvalible()){
            this.playChooseCell(cell);
        }
    },

    touchMove (event){
        let pos = event.getLocation();
    },

    touchEnd (event){

    },

    touchcancel (event){

    },

    playChooseCell (cell){

    },

    update(dt){
        this.updateType();
    },

    changeSceneType (value){
        cc.log("changeSceneType to : " + value);
        this.____sceneType = value;
    },

    updateType (){
        switch (this.sceneType) {
            case SceneType.init :
                break;
            case SceneType.start :
                break;
            case SceneType.startTurn :
                break;
            case SceneType.playerFreeMove :
                break;
            case SceneType.playerMove :
                this.caculatePlayerMove();
                break;
            case SceneType.monsterMove :
                this.monsterMove();
                break;
            case SceneType.endTurn :
                this.endTurn();
                break;
        }
    },

    caculatePlayerMove (){

    },

    monsterMove (){

    },

    endTurn (){

    },

});
