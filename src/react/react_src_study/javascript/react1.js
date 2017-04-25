/**
 * Created by heben on 2017/3/25.
 */

var React={
    nextReactRootIndex:0,
    render:function(element,container){
        var componentInstance = instantiateReactComponent(element);
        var makeup = componentInstance.mountComponent(React.nextReactRootIndex++);
        container.innerHTML = makeup;
    }
};

function instantiateReactComponent(node){
    if(typeof node === 'string' || typeof node === 'number'){
        return new ReactDOMTextComponent(node);
    }
    if(typeof node === 'object' && typeof node.type === 'string'){
        return new ReactDOMComponent(node);
    }
    if(typeof node === 'object' && typeof node.type === 'function'){
        return new ReactCompositeComponent(node);
    }
}

function ReactDOMTextComponent(text){
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

React.createElement=function(type,config,children){
    var props={},propName;
    config = config || {};
    //检测有没有key，方便高效的更新
    var key = config.key || null;
    for(propName in config){
        if(config.hasOwnProperty(propName) && propName !== 'key'){
            props[propName] = config[propName];
        }
    }

    //处理children,全部挂载到props的children属性上
    //
    var childrenLength = arguments.length - 2;
    if(childrenLength === 1){
        props.children = Array.isArray(children)?children:[children];
    }else if(childrenLength > 1){
        var childArray = Array(childrenLength);
        for(var i=0;i<childrenLength;i++){
            childArray[i] = arguments[i+2];
        }
        props.children = childArray;
    }
    return new ReactElement(type,key,props)
};

function ReactElement(type,key,props){
    this.type=type;
    this.key=key;
    this.props=props;
}

function ReactDOMComponent(element){
    //存下当前element元素的引用
    this._currentElement = element;
    this._rootNodeID = null;
}

ReactDOMComponent.prototype.mountComponent=function(rootID){
    this._rootNodeID = rootID;
    var props = this._currentElement.props;
    var tagOpen = '<'+this._currentElement.type;
    var tagClose = '</'+this._currentElement.type+'>';
    tagOpen += ' data-reactid='+this._rootNodeID;
    console.log(props);
    //拼凑属性
    for(var propKey in props) {
        if (/^on[A-Za-z]/.test(propKey)) {
            var eventType = propKey.replace('on', '');
            EventHandles.delegate(document, "[data-reactid='"+this._rootNodeID + "']", eventType, props[propKey]);
        }
        if (props[propKey] && propKey !== 'children' && !/^on[A-Za-z]/.test(propKey)) {
            tagOpen += ' ' + propKey + '=' + props[propKey];
        }
    }

    //渲染子节点
    var content = '';
    var children = props.children || [];
    var childrenInstances = [];  //用于保存所有子节点的component实例
    var that = this;
    children.forEach(function(child,index){
        var childComponentInstance = instantiateReactComponent(child);
        childComponentInstance._mountIndex = index;
        childrenInstances.push(childComponentInstance);

        var curRootID = that._rootNodeID+'.'+index;
        var childMakeUp = childComponentInstance.mountComponent(curRootID);
        content += childMakeUp;
    });
    this._renderedChildren = childrenInstances;
    return tagOpen +'>'+content+tagClose;
};

ReactDOMComponent.prototype.receiveComponent=function(nextElement){
    var lastProps = this._currentElement.props;
    var nextProps = nextElement.props;
    this._currentElement = nextElement;
    this._updateDOMProperties(lastProps,nextProps);
    this._updateDOMChildren(nextProps.children);
};

ReactDOMComponent.prototype._updateDOMProperties=function(lastProps,nextProps){
    var propKey;
    console.log(lastProps,nextProps);
    for(propKey in lastProps){
        if(nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)){
            continue;
        }
        if(/^on[a-zA-Z]/.test(propKey)){
            var eventType = propKey.replace('on', '');
            EventHandles.undelegate(document, eventType,lastProps[propKey]);
        }
        document.querySelector("[data-reactid='"+this._rootNodeID+"']").removeAttribute(propKey);
    }
    for(propKey in nextProps){
        if(nextProps.hasOwnProperty(propKey) && nextProps[propKey]!=lastProps[propKey]){
            if(propKey === 'children') continue;
            if(/^on[a-zA-Z]/.test(propKey)){
                eventType=propKey.replace('on','');
                EventHandles.delegate(document, "[data-reactid='"+this._rootNodeID + "']", eventType, nextProps[propKey]);
            }else{
                document.querySelector("[data-reactid='"+this._rootNodeID+"']").setAttribute(propKey,nextProps[propKey]);
            }
        }
    }
};

//全局的更新深度标识
var updateDepth=0;
//全局的更新队列
var diffQueue=[];

ReactDOMComponent.prototype._updateDOMChildren=function(nextChildrenElements){
    updateDepth++;
    //_diff用来递归找出差别，放到更新队列diffQueue
    this._diff(diffQueue,nextChildrenElements);
    updateDepth--;
    if(updateDepth==0){
        //调用patch，执行真实的dom操作
        this._patch(diffQueue);
        diffQueue=[];
    }
};

ReactDOMComponent.prototype._diff=function(diffQueue,nextChildrenElements){
    var self=this;
    //拿到之前的子节点的 component类型对象的集合,这个是在刚开始渲染时赋值的，记不得的可以翻上面
    //_renderedChildren 本来是数组，我们搞成map
    var prevChildren = flattenChildren(self._renderedChildren);
    //生成新的子节点map
    var nextChildren = generateComponentChildren(prevChildren,nextChildrenElements);
    self._renderedChildren = [];
    Array.prototype.slice.call(Object.assign({},nextChildren,{length:Object.keys(nextChildren).length}),0).forEach(function(instance,index){
        self._renderedChildren.push(instance);
    });
    console.log("self = "+JSON.stringify(self._currentElement));
    console.log("prevChildren = "+JSON.stringify(prevChildren));
    console.log("nextChildren = "+JSON.stringify(nextChildren));

    var lastIndex=0;
    var nextIndex=0;
    for(var name in nextChildren){
        if(!nextChildren.hasOwnProperty(name)){
            continue;
        }
        var prevChild = prevChildren[name];
        var nextChild = nextChildren[name];
        if(prevChild === nextChild){
            prevChild._mountIndex > nextIndex && diffQueue.push({
                parentId:self._rootNodeID,
                parentNode:document.querySelector("[data-reactid='"+self._rootNodeID+"']"),
                type:UPDATE_TYPES.MOVE_EXISTING,
                fromIndex:prevChild._mountIndex,
                toIndex:nextIndex
            });
        }else{  //如果不相同，说明是新增加的节点
            if(prevChild){
                diffQueue.push({
                    parentId:self._rootNodeID,
                    parentNode:document.querySelector("[data-reactid='"+self._rootNodeID+"']"),
                    type:UPDATE_TYPES.REMOVE_NODE,
                    fromIndex:prevChild._mountIndex,
                    toIndex:null
                });
                console.log("prevChild._rootNodeID 1 = "+prevChild._rootNodeID);
                if(prevChild._rootNodeID!=undefined){
                    EventHandles.undelegate(prevChild,prevChild._currentElement.props);
                }
            }

            diffQueue.push({
                parentId:self._rootNodeID,
                parentNode:document.querySelector("[data-reactid='"+self._rootNodeID+"']"),
                type:UPDATE_TYPES.INSERT_MARKUP,
                fromIndex:null,
                toIndex:nextIndex,
                makeup:nextChild.mountComponent(self._rootNodeID+'.'+nextIndex)
            })
        }
        nextChild._mountIndex = nextIndex;
        nextIndex++;
    }

    for(var name in prevChildren){
        if(prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))){
            diffQueue.push({
                parentId:self._rootNodeID,
                parentNode:document.querySelector("[data-reactid='"+self._rootNodeID+"']"),
                type:UPDATE_TYPES.REMOVE_NODE,
                fromIndex:prevChild._mountIndex,
                toIndex:null
            });
            console.log("prevChild._rootNodeID 2 = "+prevChild._rootNodeID);
            if(prevChildren[name]._rootNodeID!=undefined){
                EventHandles.undelegate(prevChild,prevChild._currentElement.props);
            }
        }
    }
};

function updateNode(parentNode,node,index){
    var target = parentNode.childNodes.item(index);
    console.log(parentNode,node,index,target);
    target?parentNode.insertBefore(node,target):parentNode.appendChild(node);
}

ReactDOMComponent.prototype._patch=function(diffQueue){
    var update,len=diffQueue.length;
    var initialChildren = [];
    var deleteChildren = [];
    for(var i=0;i<len;i++){
        update = diffQueue[i];
        if(update.type === UPDATE_TYPES.MOVE_EXISTING || update.type === UPDATE_TYPES.REMOVE_NODE){
            var updateIndex = update.fromIndex;
            var updatedChild = update.parentNode.childNodes.item(updateIndex);
            initialChildren[update.parentId] = initialChildren[update.parentId] || [];
            initialChildren[update.parentId][updateIndex] = updatedChild;
            deleteChildren.push(updatedChild);
        }
    }
    deleteChildren.forEach(function(deleteChild){
        deleteChild.parentNode.removeChild(deleteChild);
    });
    for(var i=0;i<len;i++){
        update = diffQueue[i];
        switch(update.type){
            case UPDATE_TYPES.REMOVE_NODE:
                break;
            case UPDATE_TYPES.INSERT_MARKUP:
                var dom = document.createElement("div");
                dom.innerHTML = update.makeup;
                updateNode(update.parentNode,dom.childNodes[0],update.toIndex);
                break;
            case UPDATE_TYPES.MOVE_EXISTING:
                updateNode(update.parentNode,initialChildren[update.parentId][update.fromIndex],update.toIndex);
                break;
            default:
        }
    }
};

var UPDATE_TYPES={
    MOVE_EXISTING:1,
    REMOVE_NODE:2,
    INSERT_MARKUP:3
};

function flattenChildren(componentChildren){
    var child;
    var name;
    var childrenMap = {};
    for(var i=0;i<componentChildren.length;i++){
        child = componentChildren[i];
        name = child && child._currentElement && child._currentElement.key?child._currentElement.key:i.toString(36);
        childrenMap[name] = child;
    }
    return childrenMap;
}

function generateComponentChildren(prevChildren,nextChildrenElements){
    var nextChildren={};
    nextChildrenElements = nextChildrenElements || [];
    nextChildrenElements.forEach(function(element,index){
        var name=element.key?element.key:index;
        var prevChild = prevChildren && prevChildren[name];
        var prevElement = prevChild && prevChild._currentElement;
        var nextElement = element;
        if(_shouldUpdateReactComponent(prevElement,nextElement)){
            //更新的话直接调用子节点的receiveComponent即可
            prevChild.receiveComponent(nextElement);
            //继续使用老的节点
            nextChildren[name]=prevChild;
        }else{
            var nextChildrenInstance = instantiateReactComponent(nextElement);
            nextChildren[name] = nextChildrenInstance;
        }
    });
    return nextChildren;
}

var ReactClass = function(){};

ReactClass.prototype.render=function(){};

React.createClass=function(spec){
    var Constructor = function(props){
        this.props = props;
        this.state = this.getInitialState?this.getInitialState():null;
    };

    Constructor.prototype = new ReactClass();
    Constructor.prototype.constructor = Constructor;
    Object.assign(Constructor.prototype,spec);
    return Constructor;
};

function ReactCompositeComponent(element){
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

ReactClass.prototype.setState=function(newState){
    this._reactInternalInstance.receiveComponent(null,newState);
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

var _shouldUpdateReactComponent = function(prevElement,nextElement){
    if(prevElement!=null && nextElement!=null){
        var prevType = typeof prevElement;
        var nextType = typeof nextElement;
        if(prevType === 'string' || prevType === 'number'){
            return nextType === 'string' || nextType === 'number';
        }else{
            return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
        }
    }
    return false;
};