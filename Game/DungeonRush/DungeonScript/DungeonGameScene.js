cc.Class({
    extends: cc.Component,
    properties: {

    },

    // onLoad () {},

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove);
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchcancel);
    },

    startGame (){
        G_GameCen.initGame();

    },

    touchStart (event){

    },

    touchMove (event){
        let pos = event.getLocation();
    },

    touchEnd (event){

    },

    touchcancel (event){

    },
});
