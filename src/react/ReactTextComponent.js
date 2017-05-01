/**
 * Created by heben on 2017/5/1.
 */


export function ReactDOMTextComponent(text){
    //存下当前的字符串
    this._currentElement = ''+text;
    //用来表示当前的component
    this._rootNodeID = null;
}

ReactDOMTextComponent.prototype.mountComponent=function(rootID){
    this._rootNodeID = rootID;
    return '<span data-reactid="' + rootID +'">' + this._currentElement+'</span>';
};

ReactDOMTextComponent.prototype.receiveComponent=function(nextText){
    var nextStringText = ''+nextText;
    if(nextStringText!=this._currentElement){
        this._currentElement=nextStringText;
        document.querySelector("[data-reactid='"+this._rootNodeID+"']").innerHTML = this._currentElement;
    }
};