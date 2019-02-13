cc.Class({
    extends: cc.Component,
    properties: {
        cellData : {
            default : 0,
            visible : false,
        },

        choosable : {
            default : false,
            visible : false,
        },

        beChoosed : {
            default : false,
            visible : false,
        },
    },

    // onLoad () {},

    start () {

    },

    init (cellData){
        this.cellData = cellData;
        this.choosable = true;
        this.beChoosed = false;
        this.reload()
    },

    reload (){

    },

    cellDownAction (startVec,endVec){
        let startPos = G_Fuc.getPosByVec(startVec);
        let endPos = G_Fuc.getPosByVec(endVec);
        this.node.position = startPos;
        this.node.runAction(cc.moveTo(endPos,1));
    },

    turnToDark (isTurnTo){
        if(isTurnTo){
            this.node.color = cc.color(100,100,100);
        }else{
            this.node.color = cc.color(255,255,255);
        }
    },



});
