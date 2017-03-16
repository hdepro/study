/**
 * Created by heben on 2016/8/17.
 */


import React,{Component} from 'react'
import {Link} from 'react-router'

class Test extends Component{
    render(){
        return(
            <div>
                <h3>test</h3>
                <div>
                    <Link to="/commander/home/test/test1">test1</Link>
                    <Link to="/commander/home/test/test2">test2</Link>
                </div><br/>
                {this.props.children}
            </div>
        )
    }
}


module.exports =  Test;