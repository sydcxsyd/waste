window.G_Local = {
    saveObj (key,obj) {
        let jsonStr = JSON.stringify(obj);
        cc.sys.localStorage.setItem(key,jsonStr);
    },

    loadObj (key) {
        let jsonStr = cc.sys.localStorage.getItem(key);
        try{
            let jsonObj = JSON.parse(jsonStr);
            return jsonObj
        }
        catch (e) {
            return null;
        }
    },

    save (key,value){
        cc.sys.localStorage.setItem(key,value);
    },

    load (key){
        return cc.sys.localStorage.getItem(key);
    },

};