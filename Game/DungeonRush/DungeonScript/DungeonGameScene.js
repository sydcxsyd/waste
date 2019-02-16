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

    },

    onLoad () {
        this.gameDefineProperty()
    },

    gameDefineProperty () {
        Object.defineProperty(this, "sceneType", {
            get: () => this.____sceneType,
            set: this.changeSceneType.bind(this),
        })

        this.allCellDic = null;
        this.chooseCellsList = [];
    },

    getCellByVec (vec){
        return this.allCellDic[vec.x][vec.y];
    },

    start () {
        this.mapNode.on(cc.Node.EventType.TOUCH_START,this.touchStart);
        this.mapNode.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove);
        this.mapNode.on(cc.Node.EventType.TOUCH_END,this.touchEnd);
        this.mapNode.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel);
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
        if(this.sceneType != SceneType.playerFreeMove){
            return false;
        }
        let pos = event.getLocation();
        let vec = G_Fuc.getVecByPos(pos);
        let cell = this.getCellByVec(vec);
        if(cell.isTouchAvalible()){
            this.addChooseCell(cell);
        }
    },

    touchMove (event){
        let pos = event.getLocation();

        if(pos.y <= -40 || pos.y >= this.mapNode.getContentSize().height + 40){
            this.clearChooseCell();
        }else{
            let vec = G_Fuc.getVecByPos(pos);
            let cell = this.getCellByVec(vec);
            if(cell.isTouchAvalible()){
                this.addChooseCell(cell);
            }else if(cell.beChoosed && cell == this.chooseCellsList[this.chooseCellsList.length - 2]){
                this.delLastChooseCell();
            }
        }
    },

    touchEnd (event){
        if(this.chooseCellsList.length > G_Con.leastChooseNum){
            this.sceneType = SceneType.playerMove;
        }
    },

    touchCancel (event){
        if(this.chooseCellsList.length > G_Con.leastChooseNum){
            this.sceneType = SceneType.playerMove;
        }
    },

    addChooseCell (cell){
        if(this.chooseCellsList.length == 0){
            this.showChooseAvalible(cell);
        }
        this.chooseCellsList.push(cell);
        cell.chooseCell(true);
        this.reloadChooseShow();
    },

    delLastChooseCell (){
        let cell = this.chooseCellsList.pop();
        cell.chooseCell(false);
        this.reloadChooseShow();
    },

    clearChooseCell (){
        this.chooseCellsList.length = 0;
        this.allCellsDo(cell => {
            cell.backToNoChoose();
        })
    },

    reloadChooseShow (){
        if(this.chooseCellsList.length == 1){
            return;
        }

    },

    allCellsDo (fuc){
        this.allCellDic.forEach((element, index, array) => {
            element.forEach(fuc)
        });
    },

    showChooseAvalible (cell){
        this.allCellsDo(tCell => tCell.setChooseEnable(G_Fuc.checkCellEnableConnect(cell.cellData,tCell.cellData)));
    },

    changeSceneType (value){
        cc.log("changeSceneType to : " + value);
        this.____sceneType = value;
    },

    update(dt){
        this.updateSceneType();
    },

    updateSceneType (){
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
