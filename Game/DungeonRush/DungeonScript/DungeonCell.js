
cc.Class({
    extends: cc.Component,
    properties: {
        type : {
            default : 0,
            visible : false,
        },
    },

    // onLoad () {},

    start () {

    },

    init (type){
        this.type = type;
    },
});
