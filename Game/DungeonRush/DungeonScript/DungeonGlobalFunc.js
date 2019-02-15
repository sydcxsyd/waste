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

    
}