/**
 * Created by heben on 2017/4/25.
 */

export const reduxThunk = state => next => action =>{
    if(typeof action === 'function'){
        action(next,state);
    }else{
        next(action);
    }
};