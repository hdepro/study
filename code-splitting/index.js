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
            return require.ensure([], (require) => {
                cb(null, require('./components/test'))
            })
        }
    },
    getChildRoutes(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./route/test1'),
                require('./route/test2')
            ])
        })
    },
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/test'))
        })
    }
};

render(
    <Router history={browserHistory} routes={routes}/>,document.getElementById("code-splitting")
);

