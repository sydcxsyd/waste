window.G_Fuc = {
    getCenterPosByVec (vec){
        let pos = cc.v2(0,0);
        pos.x = (vec.x + 0.5) * G_Data.cellSize.width;
        pos.y = (vec.y + 0.5) * G_Data.cellSize.height;
        return pos;
    },

    getVecByPos (pos){
        let vec = cc.v2(0,0);
        vec.x = Math.floor(pos.x / G_Data.cellSize.width);
        vec.y = Math.floor(pos.y / G_Data.cellSize.height);
        return vec;
    },

    checkCellEnableConnect (cellData1,cellData2){
        if(cellData1.type == cellData2.type){
            return true;
        }else if((cellData1.type == G_Con.cellType.sword || cellData1.type == G_Con.cellType.sword)
            && (cellData2.type == G_Con.cellType.sword || cellData2.type == G_Con.cellType.sword)){
            return true;
        }
        return false;
    },
}