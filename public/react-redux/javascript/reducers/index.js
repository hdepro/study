/**
 * Created by heben on 2017/4/23.
 */

//import {combineReducers} from 'redux'
import {combineReducers} from '../../../../src/redux/CombineReducers'
import {ADD_DATA,GET_DATA} from '../constants/ActionTypes'

function reducer(state=[],action){
    switch(action.type){
        case GET_DATA:
            return action.data;
        case ADD_DATA:
            return [...state,action.data];
        default :
            return state;
    }
}

export default combineReducers({
    r_list:reducer
})

