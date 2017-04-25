/**
 * Created by heben on 2017/4/23.
 */

const ActionTypes = {
    INIT: '@@redux/INIT'
};

export function createStore(reducer,initialState,enhance){
    if(typeof initialState === 'function' && typeof enhance === 'undefined'){
        enhance = initialState;
        initialState = undefined;
    }
    if(typeof enhance !== 'undefined'){
        if(typeof enhance !== 'function'){
            throw new Error('Expected the enhancer to be a function.');
        }
        return enhance(createStore)(reducer,initialState);
    }
    let state = initialState || {};
    let prevlistener = [];
    let currentlistener = prevlistener;
    function getState(){
        return state;
    }
    function subscribe(listener){
        currentlistener.push(listener);
        let isSubscribe = true;
        return function unsubscribe(){
            if(isSubscribe){
                isSubscribe = false;
                let index = listener.indexOf(listener);
                currentlistener.splice(index,1);
            }
        }
    }
    function dispatch(action){
        state = reducer(state,action);
        for(let listener of currentlistener){
            listener();
        }
    }
    dispatch(ActionTypes);
    return {
        getState,
        dispatch,
        subscribe
    }
}