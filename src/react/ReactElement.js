/**
 * Created by heben on 2017/5/1.
 */


export function createElement(type,config,children){
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