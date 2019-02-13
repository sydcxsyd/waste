
cc.Class({
    extends: cc.Component,
    properties: {
        cellData : {
            default : 0,
            visible : false,
        },
    },

    // onLoad () {},

    start () {

    },

    init (cellData){
        this.cellData = cellData;
    },
});
