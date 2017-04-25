/**
 * Created by heben on 2017/4/23.
 */

export function combineReducers(reducer){
    let reducerKey = Object.keys(reducer);
    return function combine(state={},action){
        let nextState = {};
        let hasChanged = false;
        for(let key of reducerKey) {
            let func = reducer[key];
            let prevPartState = state[key];
            let nextPartState = func(prevPartState, action);
            nextState[key] = nextPartState;
            hasChanged = hasChanged || nextPartState !== prevPartState;
        }
        return hasChanged?nextState:state;
    }
}