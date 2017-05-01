/**
 * Created by heben on 2017/4/23.
 */
import 'babel-polyfill'
import React from'react'
import ReactDOM from'react-dom'
//import {createStore} from 'redux'
//import {Provider} from 'react-redux'
//import {applyMiddleware} from 'redux'

import {createStore} from '../../../src/redux/CreateStore'
import {applyMiddleware} from '../../../src/redux/ApplyMiddleware'
import {Provider} from '../../../src/react-redux/Provider'

import rootReducer from './reducers/index'

import App from './components/App'
import {logger,logger2,logger3} from './constants/Logger'
import {reduxThunk} from '../../../src/redux/ReduxThunk'

const store = createStore(rootReducer,applyMiddleware(logger,logger2,logger3,reduxThunk));
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById("react-redux")
);