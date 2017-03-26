/**
 * Created by heben on 2017/3/26.
 */

var EventHandles={};
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
    function delegated(event){
        var target = element.querySelector(selector);
        console.log(target.contains(event.target));
        if(event.target == target ||　target.contains(event.target)){
            callback(event);
        }
    }
    element.addEventListener(eventType,delegated);
};


var DOMHandles={};
DOMHandles.replaceWith=function(element,newElement){
    element.parentNode.replaceChild(element,newElement);
};
