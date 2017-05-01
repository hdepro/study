/**
 * Created by heben on 2017/5/1.
 */

import {_shouldUpdateReactComponent} from './ShouldComponentUpdate'
import {instantiateReactComponent} from './React'

export function ReactCompositeComponent(element){
    this._currentElement = element;
    this._rootNodeID = null;
    this._instance = null;
}

ReactCompositeComponent.prototype.mountComponent=function(rootID){
    this._rootNodeID = rootID;
    var element = this._currentElement;
    var reactClass = element.type;
    var reactClassInstance = new reactClass(element.props);
    reactClassInstance._reactInternalInstance = this;
    this._instance = reactClassInstance;
    if(reactClassInstance.componentWillMount){
        reactClassInstance.componentWillMount();
    }
    var reactElement = reactClassInstance.render();

    var componentInstance = instantiateReactComponent(reactElement);
    this._renderedComponent = componentInstance;
    var makeup = componentInstance.mountComponent(this._rootNodeID);

    if(reactClassInstance.componentDidMount){
        document.addEventListener("DOMContentLoaded",reactClassInstance.componentDidMount);
    }
    return makeup;
};

ReactCompositeComponent.prototype.receiveComponent=function(nextElement,newState){
    this._currentElement = nextElement || this._currentElement;
    var inst = this._instance;
    var nextState = Object.assign(inst.state,newState);
    var nextProps = this._currentElement.props;
    inst.state = nextState;
    if(inst.shouldComponentUpdate && inst.shouldComponentUpdate(nextProps,nextState) === false) return;
    if(inst.componentWillUpdate) inst.componentWillUpdate(nextProps,nextState);
    var prevComponentInstance = this._renderedComponent;
    var prevRenderedElement = prevComponentInstance._currentElement;
    var nextRenderedElement = this._instance.render();

    if(_shouldUpdateReactComponent(prevRenderedElement,nextRenderedElement)){
        prevComponentInstance.receiveComponent(nextRenderedElement);
        inst.componentDidUpdate && inst.componentDidUpdate();
    }else{
        var thisID = this._rootNodeID;
        this._renderedComponent = instantiateReactComponent(nextRenderedElement);
        var nextMakeUp = this._renderedComponent.mountComponent(thisID);
        document.querySelector('[data-reactid="'+thisID+'"]').outerHTML = nextMakeUp;
    }
};