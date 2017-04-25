/**
 * Created by heben on 2016/8/17.
 */
import React from 'react'
import { render } from 'react-dom'
import {Router,Route,browserHistory} from 'react-router'

const routes = {
    path: 'test',
    indexRoute:{
        getComponent: (location, cb) => {
            console.log("test indexRoute getComponent");
            return require.ensure([], (require) => {
                console.log("ensure test indexRoute");
                cb(null, require('./route/test0'))
            })
        }
    },
    getChildRoutes(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./route/test1/index'),
                require('./route/test2/index')
            ])
        })
    },
    getComponent(nextState, cb) {
        console.log("test getComponent");
        require.ensure([], (require) => {
            console.log("ensure test getComponent");
            cb(null, require('./components/test'))
        })
    }
};

render(
    <Router history={browserHistory} routes={routes}/>,document.getElementById("code-splitting")
);

