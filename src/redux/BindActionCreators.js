/**
 * Created by heben on 2017/5/4.
 */

function bindActionCreator(actionCreators,dispatch){
    return (...args) => dispatch(actionCreators(...args));
}

export function bindActionCreators(actionCreators,dispatch){
    if(typeof actionCreators === "function"){
        return bindActionCreator(actionCreators,dispatch);
    }
    if(typeof actionCreators !== "object" || actionCreators === null){
        throw new Error("bindActionCreators need a argument is function or object");
    }
    let keys = Object.keys(actionCreators);
    let len = keys.length,key;
    let actionCreatorResult = {};
    for(let i=0;i<len;i++){
        key = keys[i];
        if(typeof actionCreators[key] === "function") actionCreatorResult[key] = bindActionCreator(actionCreators[key],dispatch);
    }
    return actionCreatorResult;
}