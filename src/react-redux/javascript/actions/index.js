/**
 * Created by heben on 2017/4/23.
 */

import {ADD_DATA,GET_DATA} from '../constants/ActionTypes'


// export function get(){
//     return {
//         type:GET_DATA,
//         data:[]
//     }
// }

// export function get(){
//     let args = arguments;
//     console.log("get",args);
//     fetch("/api/getData")
//         .then(response => response.json())
//         .then(json => {
//             console.log('json',json);
//             return {
//                 type:GET_DATA,
//                 data:json.data
//             }
//         })
// }

export function get(){
    return dispatch => {
        return fetch("/api/getData")
            .then(response => response.json())
            .then(json => {
                console.log('json',json);
                dispatch({
                    type:GET_DATA,
                    data:json.data
                })
            })
    }
}

/**
 * @param {string} value
 * @return {object}
 */

export function add(value){
    return {
        type:ADD_DATA,
        data:value
    }
}