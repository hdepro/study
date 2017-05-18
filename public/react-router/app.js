/**
 * Created by heben on 2017/5/6.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,Link} from '../../src/react-router'

class App extends React.Component{
    render(){
        return(
            <div>
                <div>App</div>
                <div style={{float:'left'}}>
                    <Link to="child1">child1</Link><br/>
                    <Link to="child2">child2</Link>
                </div>
                {this.props.children}
            </div>
        )
    }
}

class Child1 extends React.Component{
    render(){
        return(
            <div>
                <div>Child1</div>
            </div>
        )
    }
}

class Child2 extends React.Component{
    render(){
        return(
            <div>
                <div>Child2</div>
            </div>
        )
    }
}

class Child11 extends React.Component{
    render(){
        return(
            <div>
                <div>Child11</div>
            </div>
        )
    }
}

class Child12 extends React.Component{
    render(){
        return(
            <div>
                <div>Child12</div>
            </div>
        )
    }
}

let route = (
    <Router path="root">
        <Route path="" component={App}>
            <Route path="child1" component={Child1}>
                <Route path="child11" component={Child11}/>
                <Route path="child12" component={Child12}/>
            </Route>
            <Route path="child2" component={Child2}/>
        </Route>
        <Route path="root2" component={App}/>
    </Router>
)

ReactDOM.render(route,document.getElementById("react-router"));