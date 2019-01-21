// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


let AutoTabScrollTypeEnum = cc.Enum({
    horizantal : 1,
    vertical : 2
});

cc.Class({
    extends: cc.Component,
    


    properties: {
        bgSprite : cc.Sprite,
        selectSprite : cc.Sprite,
        unSelcetSprite : cc.Sprite,
        unSelcetNode : cc.Node,
        pagesNum : 0,

        tabOffset : 0,//两侧间距
        gap : 0,//间距

        innerX : 0,//tab偏移
        innerY : 0,//tab偏移

        scrollType : {
            default : AutoTabScrollTypeEnum.horizantal,
            type : AutoTabScrollTypeEnum,
        },

        curSelectIndex : {
            default : 0,
            type : Number,
            visible : false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.unSelcetSprite.node.active = false;
    },

    reloadPagesNum (num){
        this.pagesNum = num;
        if(num <= 1){
            this.node.active = false;
            
        }else{
            this.node.active = true;
            this.reloadBgSize();
            this.unSelcetNode.removeAllChildren();
            for(let i = 0 ; i < num ; i++){
                let tNode = new cc.Node();
                let tSprite = tNode.addComponent(cc.Sprite);
                tSprite.spriteFrame = this.unSelcetSprite.spriteFrame.clone();
                tNode.parent = this.unSelcetNode;
                tNode.position = this.getIndexPosition(i);
            }
        }
    },

    reloadBgSize : function(){
        if(this.scrollType == AutoTabScrollTypeEnum.horizantal){
            let unSWidth = this.unSelcetSprite.node.getContentSize().width;
            let width = (this.pagesNum * unSWidth) + ((this.pagesNum - 1) * this.gap) + this.tabOffset;
            this.bgSprite.node.width = width;
        }else{
            let unSHeight = this.unSelcetSprite.node.getContentSize().height;
            let height = (this.pagesNum * unSHeight) + ((this.pagesNum - 1) * this.gap) + this.tabOffset;
            this.bgSprite.node.height = height;
        }
    },

    getIndexPosition (index){
        let rePos = cc.v2(0,0);
        if(this.scrollType == AutoTabScrollTypeEnum.horizantal){
            let width = this.bgSprite.node.width - this.tabOffset;
            let x = width / (this.pagesNum - 1) * index;
            rePos = cc.v2(x - (width/2),0);
        }else{
            let height = this.bgSprite.node.height - this.tabOffset;
            let y = height / (this.pagesNum - 1) * index;
            rePos = cc.v2(0,y -  (height/2));
        }

        rePos.x += this.innerX;
        rePos.y += this.innerY
        return rePos;
    },  

    select (index){
        this.curSelectIndex = index;

        if(this.curSelectIndex < 0){
            this.curSelectIndex = 0;
        }else if(this.curSelectIndex >= this.pagesNum){
            this.curSelectIndex = this.pagesNum;
        }
        this.selectSprite.node.position = this.getIndexPosition(this.curSelectIndex);
    },

    prePage (){
        this.select(this.curSelectIndex - 1);
    },

    nextPage (){
        this.select(this.curSelectIndex + 1);
    },
});
