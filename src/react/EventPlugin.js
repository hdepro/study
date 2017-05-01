/**
 * Created by heben on 2017/3/26.
 */

export var EventHandles={};
EventHandles.bindEvent = function(element,eventType,callback){
    if(element.addEventListener){
        element.addEventListener(eventType,callback);
    }else if(element.attachEvent){
        element.attachEvent('on'+eventType,callback);
    }else{
        element['on'+eventType]=callback;
    }
};

EventHandles.delegate = function(element,selector,eventType,callback){     //element是真实节点
    console.log("delegate eventType = "+eventType);
    function delegated(event){
        var target = element.querySelector(selector);
        console.log(target.contains(event.target));
        if(event.target == target ||　target.contains(event.target)){
            callback(event);
        }
    }
    element.addEventListener(eventType,delegated);
};

EventHandles.undelegate = function(element,eventType,callback,props){     //element是真实节点
    console.log("undelegate eventType = "+eventType);
    if(props){
        Object.keys(props).forEach((propKey) => {
            if(/^on[a-zA-Z]/.test(propKey)){
                element.removeEventListener(propKey,props[propKey]);
            }
        })
    }else{
        element.removeEventListener(eventType,callback);
    }
};


var DOMHandles={};
DOMHandles.replaceWith=function(element,newElement){
    element.parentNode.replaceChild(element,newElement);
};
