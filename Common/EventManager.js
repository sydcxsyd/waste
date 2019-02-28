/**
 * Created by ht on 2016/9/6.
 */

window.G_EventManager = {
    listener : {
        target : null,      //监听者
        handle : null,      //句柄
        paraList : null,    //参数
    },
    events: new Map(),
    registerListener : function(eventName,Function,target,...paraList) {
        if(!this.events[eventName]){
            this.events.set(eventName,[]);
        }
        let newListener = Object.create(this.listener);
        newListener.target = target;
        newListener.handle = Function;
        newListener.paraList = paraList;
        this.events.get(eventName).push(newListener);
    },

    unRegisterListener : function(eventName,target) {
        if(this.events.get(eventName)) {
            while(1){
                var isDelete = false;
                let index = 0;
                for(let acter of this.events.get(eventName)){
                    if(acter.target == target){
                        this.events[eventName].splice(index,1)
                        isDelete = true;
                        break;
                    }
                    index++;
                }
                if(!isDelete){
                    return;
                }
            }

        }
    },

    unRegisterAllListenerByTarget : function(target){
        for(let eventList of this.events.values()){
            for(let i = 0; i < eventList.length ; i++){
                if(eventList[i].target == target){
                    eventList.splice(i,1);
                    i--;
                }
            }
        }
    },

    isRegisterListener : function(eventName){
        if(this.events.get(eventName)) {
            return true;
        }
        return false;
    },

    logListentener : function(){

    },

    pushEvent : function(eventName,...paramaterList/* array */){
        if(this.events.get(eventName)) {
            let list = [];
            for(let acter of this.events.get(eventName)){
                list.push(acter);
            }

            for(let acter of list){
                let fuc = acter.handle;
                let that = acter.target;
                //var callFunc = fuc.bind(that);
                if(acter.paraList && acter.paraList.length > 0){
                    fuc.apply(that,acter.paraList);
                }else{
                    fuc.apply(that,paramaterList);
                }

            }
        }
    },
};