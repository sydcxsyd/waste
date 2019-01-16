let WordCheck = require("WordCheck");
window.G_Fuc = {
    getGotDic (str) {
        let addDic = {};
        for(let i in G_User.userProper){
            let proper = G_User.userProper[i];
            let wordsList = WordCheck[proper];
            addDic[proper] = 0;
            for(let j = 0 ; j< wordsList.length ; j++){
                if(str.indexOf(wordsList[j]) != -1){
                    addDic[proper] = Math.random() > 0.5 ? 0 : 1;
                    break;
                }
            }

            addDic[proper] += Math.random() > G_Con.proAddRandom ? 0 : 1;
        }
        return addDic;
    },

};