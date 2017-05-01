/**
 * Created by heben on 2017/5/1.
 */

import {createClass} from './ReactClass';
import {createElement} from './ReactElement';
import {ReactDOMTextComponent} from './ReactTextComponent';
import {ReactDOMComponent} from './ReactDOMComponent';
import {ReactCompositeComponent} from './ReactCompositeComponent';

export var React={
    nextReactRootIndex:0,
    render:function(element,container){
        var componentInstance = instantiateReactComponent(element);
        var makeup = componentInstance.mountComponent(React.nextReactRootIndex++);
        container.innerHTML = makeup;
    }
};

export function instantiateReactComponent(node) {
    if (typeof node === 'string' || typeof node === 'number') {
        return new ReactDOMTextComponent(node);
    }
    if (typeof node === 'object' && typeof node.type === 'string') {
        return new ReactDOMComponent(node);
    }
    if (typeof node === 'object' && typeof node.type === 'function') {
        return new ReactCompositeComponent(node);
    }
}


Object.assign(React,{createClass,createElement});