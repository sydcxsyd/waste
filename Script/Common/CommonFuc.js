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

    shareToWx (){

    },

};