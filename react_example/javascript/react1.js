/**
 * Created by heben on 2017/3/25.
 */

var React={
    nextReactRootIndex:0,
    render:function(element,container){
        var componentInstance = instantiateReactComponent(element);
        var makeup = componentInstance.mountComponent(React.nextReactRootIndex++);
        container.innerHTML = makeup;
    },
    createElement:function(type,config,children){
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
    }

};

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

function instantiateReactComponent(node){
    if(typeof node === 'string' || typeof node === 'number'){
        return new ReactDOMTextComponent(node);
    }
    if(typeof node === 'object' && typeof node.type === 'string'){
        return new ReactDOMComponent(node);
    }
}

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
    for(var propKey in props){
        if(/^on[A-Za-z]/.test(propKey)){
            var eventType = propKey.replace('on','');
            this._currentElement.addEventListener(eventType,props[propKey],false);
        }
        if(props[propKey] && propKey!=='children' && !/^on[A-Za-z]/.test(propKey)){
            tagOpen += ' '+propKey+'='+props[propKey];
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
    }
};
