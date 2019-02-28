window.G_Common = {
    log (info,...more){
        this._log(info);
        if(more){
            for(let i in more){
                this._log(more[i]);
            }
        }
    },

    _log (info){
        if(typeof(info) == "object" || typeof(info) == "object"){
            cc.log(JSON.stringify(info));
        }else{
            cc.log(info);
        }
    },

    isInteger(obj){
        return typeof obj === 'number' && obj%1 === 0;      //是整数，则返回true，否则返回false
    },

    copyObj(obj){
        let newObj = {};
        for(let i in obj){
            newObj[i] = obj[i];
        }
        return newObj;
    },

};