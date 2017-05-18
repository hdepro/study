/**
 * Created by heben on 2017/4/23.
 */

import React from 'react'
//import {connect} from 'react-redux'
import {connect} from '../../../../src/react-redux/Connect'
//import {connect} from '../../../../src/src'

//import {bindActionCreators} from 'redux'
import {bindActionCreators} from '../../../../src/redux/BindActionCreators'
import {get,add} from '../actions/index'

class App extends React.Component{
    constructor(props){
        super(props);
        this.add=this.add.bind(this);
    }
    componentWillMount(){
        console.log("App componentWillMount");
        this.props.get();
    }
    componentDidMount(){
        console.log("App componentDidMount ",this.context.store,this.props,this.state);
    }
    add(){
        let value = this.refs.input.value;
        this.props.dispatch(add(value));
    }
    render(){
        let {c_list} = this.props;
        return(
            <div>
                <input ref="input"/>
                <button onClick={this.add}>添加</button>
                <ul>
                    {c_list.map(li=><li>{li}</li>)}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        c_list:state.r_list
    }
}

function mapDispatchToProps(dispatch){
    return{
        get:bindActionCreators(get,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)