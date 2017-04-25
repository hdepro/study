/**
 * Created by heben on 2017/4/24.
 */
import {compose} from './Compose'

export function applyMiddleware(...middlewares){
    return createStore => (reducer,initialState) => {
        let store = createStore(reducer,initialState);
        let middlewareApi = {
            getState:store.getState,
            dispatch:(action) => store.dispatch(action)
        };
        let chain = middlewares.map(middleware => middleware(middlewareApi));
        let dispatch = compose(...chain)(store.dispatch);
        return {
            ...store,
            dispatch
        }
    }
}